extern crate alloc;

use stylus_sdk::{
    alloy_primitives::{Address, U256, U8},
    msg, block,
    prelude::*,
};

// Define the contract storage using the Solidity ABI.
// `FlowVault` will be the entrypoint.
sol_storage! {
    #[entrypoint]
    pub struct FlowVault {
        address owner;
        bool paused;
        uint256 next_invoice_id;
        mapping(uint256 => Invoice) invoices;
        uint256 platform_balance;
        uint256 insurance_pool;
        uint256 total_volume;
        uint256 total_invoices;
        uint256 total_defaults;
    }

    pub struct Invoice {
        address business;
        address debtor;
        uint256 amount;
        uint256 due_date;
        uint8 status; // 0: Pending, 1: Factored, 2: Paid
        address investor;
        uint256 collateral_amount;
        uint256 insurance_amount;
    }
}

#[public]
impl FlowVault {
    pub fn init(&mut self) {
        self.owner.set(msg::sender());
        self.paused.set(false);
        self.next_invoice_id.set(U256::from(1));
        self.platform_balance.set(U256::from(0));
        self.insurance_pool.set(U256::from(0));
        self.total_volume.set(U256::from(0));
        self.total_invoices.set(U256::from(0));
        self.total_defaults.set(U256::from(0));
    }

    pub fn create_invoice(
        &mut self,
        debtor: Address,
        amount: U256,
        due_date: U256,
    ) -> U256 {
        assert!(!self.paused.get(), "Contract paused");
        assert!(amount > U256::ZERO, "Invalid amount");
        assert!(due_date > U256::from(block::timestamp()), "Invalid due date");

        let invoice_id = self.next_invoice_id.get();
        let mut invoice = self.invoices.setter(invoice_id);
        
        invoice.business.set(msg::sender());
        invoice.debtor.set(debtor);
        invoice.amount.set(amount);
        invoice.due_date.set(due_date);
        invoice.status.set(U8::from(0));
        invoice.investor.set(Address::ZERO);
        invoice.collateral_amount.set(U256::from(0));
        invoice.insurance_amount.set(U256::from(0));

        self.next_invoice_id.set(invoice_id + U256::from(1));
        self.total_invoices.set(self.total_invoices.get() + U256::from(1));

        invoice_id
    }

    #[payable]
    pub fn deposit_collateral(&mut self, invoice_id: U256) {
        assert!(!self.paused.get(), "Contract paused");
        
        let invoice = self.invoices.get(invoice_id);
        assert!(!invoice.business.get().is_zero(), "Invoice not found");
        assert!(invoice.business.get() == msg::sender(), "Unauthorized");

        let required_collateral = (invoice.amount.get() * U256::from(40)) / U256::from(100); // 40%
        assert!(msg::value() >= required_collateral, "Insufficient collateral");

        let mut invoice_mut = self.invoices.setter(invoice_id);
        invoice_mut.collateral_amount.set(msg::value());
    }

    #[payable]
    pub fn factor_invoice(&mut self, invoice_id: U256, with_insurance: bool) {
        assert!(!self.paused.get(), "Contract paused");

        let invoice = self.invoices.get(invoice_id);
        assert!(!invoice.business.get().is_zero(), "Invoice not found");
        assert!(invoice.status.get() == U8::from(0), "Invoice already factored");

        let required_collateral = (invoice.amount.get() * U256::from(40)) / U256::from(100);
        assert!(invoice.collateral_amount.get() >= required_collateral, "Collateral not deposited");
        assert!(U256::from(block::timestamp()) <= invoice.due_date.get(), "Invoice expired");

        let factor_rate = U256::from(95); // 95%
        let factor_amount = (invoice.amount.get() * factor_rate) / U256::from(100);
        let platform_fee = (factor_amount * U256::from(1)) / U256::from(100); // 1%
        let insurance_fee = if with_insurance {
            (factor_amount * U256::from(5)) / U256::from(1000) // 0.5%
        } else {
            U256::from(0)
        };

        let total_required = factor_amount + platform_fee + insurance_fee;
        assert!(msg::value() >= total_required, "Insufficient funds");

        let mut invoice_mut = self.invoices.setter(invoice_id);
        invoice_mut.investor.set(msg::sender());
        invoice_mut.status.set(U8::from(1)); // Factored
        if with_insurance {
            invoice_mut.insurance_amount.set(insurance_fee);
        }

        self.platform_balance.set(self.platform_balance.get() + platform_fee);
        if with_insurance {
            self.insurance_pool.set(self.insurance_pool.get() + insurance_fee);
        }
        self.total_volume.set(self.total_volume.get() + factor_amount);
    }

    #[payable]
    pub fn pay_invoice(&mut self, invoice_id: U256) {
        assert!(!self.paused.get(), "Contract paused");

        let invoice = self.invoices.get(invoice_id);
        assert!(!invoice.business.get().is_zero(), "Invoice not found");
        assert!(invoice.status.get() != U8::from(2), "Invoice already paid");
        assert!(msg::value() >= invoice.amount.get(), "Insufficient funds");

        let mut invoice_mut = self.invoices.setter(invoice_id);
        invoice_mut.status.set(U8::from(2)); // Paid
    }

    pub fn get_invoice(&self, invoice_id: U256) -> (Address, Address, U256, U256, U8, Address, U256, U256) {
        let invoice = self.invoices.get(invoice_id);
        assert!(!invoice.business.get().is_zero(), "Invoice not found");

        (
            invoice.business.get(),
            invoice.debtor.get(),
            invoice.amount.get(),
            invoice.due_date.get(),
            invoice.status.get(),
            invoice.investor.get(),
            invoice.collateral_amount.get(),
            invoice.insurance_amount.get(),
        )
    }

    pub fn get_platform_stats(&self) -> (U256, U256, U256, U256, U256) {
        (
            self.platform_balance.get(),
            self.insurance_pool.get(),
            self.total_volume.get(),
            self.total_invoices.get(),
            self.total_defaults.get(),
        )
    }

    pub fn pause(&mut self) {
        assert!(msg::sender() == self.owner.get(), "Unauthorized");
        self.paused.set(true);
    }

    pub fn unpause(&mut self) {
        assert!(msg::sender() == self.owner.get(), "Unauthorized");
        self.paused.set(false);
    }
}

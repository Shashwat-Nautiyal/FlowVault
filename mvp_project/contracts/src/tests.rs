#[cfg(test)]
mod tests {
    use super::*;
    use stylus_sdk::msg;
    
    #[test]
    fn test_fee_calculations() {
        let amount = U256::from(1000); // $1000 invoice
        
        // Test factor amount calculation (95%)
        let factor_amount = (amount * U256::from(9500)) / U256::from(10000);
        assert_eq!(factor_amount, U256::from(950));
        
        // Test platform fee calculation (1%)
        let platform_fee = (amount * U256::from(100)) / U256::from(10000);
        assert_eq!(platform_fee, U256::from(10));
        
        // Test insurance fee calculation (0.5%)
        let insurance_fee = (amount * U256::from(50)) / U256::from(10000);
        assert_eq!(insurance_fee, U256::from(5));
        
        // Test collateral calculation (40%)
        let collateral = (amount * U256::from(4000)) / U256::from(10000);
        assert_eq!(collateral, U256::from(400));
        
        // Test investor profit calculation (4.2%)
        let investor_profit = (amount * U256::from(420)) / U256::from(10000);
        assert_eq!(investor_profit, U256::from(42));
    }
    
    #[test]
    fn test_invoice_status_enum() {
        assert_eq!(InvoiceStatus::Pending as u8, 0);
        assert_eq!(InvoiceStatus::Factored as u8, 1);
        assert_eq!(InvoiceStatus::Paid as u8, 2);
        assert_eq!(InvoiceStatus::Defaulted as u8, 3);
        
        // Test conversion from u8
        assert_eq!(InvoiceStatus::from(0), InvoiceStatus::Pending);
        assert_eq!(InvoiceStatus::from(1), InvoiceStatus::Factored);
        assert_eq!(InvoiceStatus::from(2), InvoiceStatus::Paid);
        assert_eq!(InvoiceStatus::from(3), InvoiceStatus::Defaulted);
    }
    
    #[test]
    fn test_total_investor_return() {
        let invoice_amount = U256::from(1000);
        let factor_amount = (invoice_amount * U256::from(9500)) / U256::from(10000); // $950
        let investor_profit = (invoice_amount * U256::from(420)) / U256::from(10000); // $42
        let insurance_fee = (invoice_amount * U256::from(50)) / U256::from(10000); // $5
        
        let total_return = factor_amount + investor_profit - insurance_fee;
        assert_eq!(total_return, U256::from(987)); // $987 total return
        
        // ROI calculation: (987 - 950) / 950 = 3.89%
        let roi = ((total_return - factor_amount) * U256::from(10000)) / factor_amount;
        assert_eq!(roi, U256::from(389)); // 3.89% in basis points
    }
    
    #[test]
    fn test_edge_cases() {
        // Test minimum amounts
        let min_amount = U256::from(1);
        let factor_amount = (min_amount * U256::from(9500)) / U256::from(10000);
        assert_eq!(factor_amount, U256::from(0)); // Rounds down to 0
        
        // Test large amounts
        let large_amount = U256::from(1_000_000); // $1M
        let factor_amount = (large_amount * U256::from(9500)) / U256::from(10000);
        assert_eq!(factor_amount, U256::from(950_000));
        
        // Test collateral requirement
        let collateral = (large_amount * U256::from(4000)) / U256::from(10000);
        assert_eq!(collateral, U256::from(400_000));
    }
}

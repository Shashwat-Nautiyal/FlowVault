// FlowVault Contract Address (will be updated after deployment)
export const FLOWVAULT_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

// FlowVault Contract ABI
export const FLOWVAULT_ABI = [
  {
    "type": "function",
    "name": "init",
    "inputs": [
      { "name": "platform_fee", "type": "uint256" },
      { "name": "insurance_fee", "type": "uint256" },
      { "name": "collateral_rate", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "create_invoice",
    "inputs": [
      { "name": "debtor", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "due_date", "type": "uint256" }
    ],
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deposit_collateral",
    "inputs": [{ "name": "invoice_id", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "factor_invoice",
    "inputs": [{ "name": "invoice_id", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "pay_invoice",
    "inputs": [{ "name": "invoice_id", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "handle_default",
    "inputs": [{ "name": "invoice_id", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "get_invoice",
    "inputs": [{ "name": "invoice_id", "type": "uint256" }],
    "outputs": [
      { "type": "address" },
      { "type": "address" },
      { "type": "uint256" },
      { "type": "uint256" },
      { "type": "uint256" },
      { "type": "address" },
      { "type": "uint256" },
      { "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "get_platform_stats",
    "inputs": [],
    "outputs": [
      { "type": "uint256" },
      { "type": "uint256" },
      { "type": "uint256" },
      { "type": "uint256" },
      { "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "get_business_invoices",
    "inputs": [{ "name": "business", "type": "address" }],
    "outputs": [{ "type": "uint256[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "get_investor_invoices",
    "inputs": [{ "name": "investor", "type": "address" }],
    "outputs": [{ "type": "uint256[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw_platform_fees",
    "inputs": [{ "name": "amount", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "pause",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "unpause",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "set_credit_score",
    "inputs": [
      { "name": "business", "type": "address" },
      { "name": "score", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "get_credit_score",
    "inputs": [{ "name": "business", "type": "address" }],
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "InvoiceCreated",
    "inputs": [
      { "name": "invoice_id", "type": "uint256", "indexed": true },
      { "name": "business", "type": "address", "indexed": true },
      { "name": "amount", "type": "uint256", "indexed": false },
      { "name": "due_date", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "InvoiceFactored",
    "inputs": [
      { "name": "invoice_id", "type": "uint256", "indexed": true },
      { "name": "investor", "type": "address", "indexed": true },
      { "name": "factor_amount", "type": "uint256", "indexed": false },
      { "name": "collateral_amount", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "InvoicePaid",
    "inputs": [
      { "name": "invoice_id", "type": "uint256", "indexed": true },
      { "name": "amount", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "CollateralDeposited",
    "inputs": [
      { "name": "invoice_id", "type": "uint256", "indexed": true },
      { "name": "business", "type": "address", "indexed": true },
      { "name": "amount", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "CollateralWithdrawn",
    "inputs": [
      { "name": "invoice_id", "type": "uint256", "indexed": true },
      { "name": "business", "type": "address", "indexed": true },
      { "name": "amount", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "InsuranceClaim",
    "inputs": [
      { "name": "invoice_id", "type": "uint256", "indexed": true },
      { "name": "investor", "type": "address", "indexed": true },
      { "name": "amount", "type": "uint256", "indexed": false }
    ]
  }
] as const;

// Types
export interface Invoice {
  id: bigint;
  business: string;
  debtor: string;
  amount: bigint;
  dueDate: bigint;
  status: InvoiceStatus;
  investor: string;
  factorAmount: bigint;
  collateralAmount: bigint;
  createdAt: bigint;
}

export const InvoiceStatus = {
  Pending: 0,
  Factored: 1,
  Paid: 2,
  Defaulted: 3,
} as const;

export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];

export interface PlatformStats {
  invoiceCounter: bigint;
  insurancePool: bigint;
  platformFeeRate: bigint;
  insuranceFeeRate: bigint;
  collateralRate: bigint;
}

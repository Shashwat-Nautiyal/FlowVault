# FlowVault Smart Contract

A decentralized invoice factoring platform built with Arbitrum Stylus.

## Overview

FlowVault enables businesses to get immediate cash flow by selling their invoices to investors, with built-in insurance protection and collateral management.

## Features

- **Invoice Creation**: Businesses can create invoices with customer details and due dates
- **Collateral Management**: Secure 40% collateral deposit system
- **Invoice Factoring**: Investors can purchase invoices at 95% value
- **Insurance Pool**: 0.5% insurance fee provides protection against defaults
- **Automatic Payments**: Smart contract handles all payment distributions
- **Default Handling**: Automatic compensation for investors using insurance pool and collateral

## Contract Architecture

### Core Functions

- `init()` - Initialize contract with fee parameters
- `create_invoice()` - Create a new invoice
- `deposit_collateral()` - Deposit required collateral (40% of invoice value)
- `factor_invoice()` - Investor purchases invoice
- `pay_invoice()` - Customer pays the invoice
- `handle_default()` - Handle defaulted invoices (owner only)

### Fee Structure

- **Platform Fee**: 1% (100 basis points)
- **Insurance Fee**: 0.5% (50 basis points)
- **Factor Rate**: 95% (businesses receive 95% of invoice value)
- **Collateral Rate**: 40% (businesses must deposit 40% as collateral)

### Example Flow

1. Business creates $1000 invoice due in 60 days
2. Business deposits $400 collateral (40%)
3. Investor pays $975 ($950 factor + $25 insurance) to purchase invoice
4. Business receives $950 immediately
5. When customer pays $1000:
   - Investor gets $985 ($950 principal + $40 profit - $5 insurance)
   - Platform gets $10 (1% fee)
   - Insurance pool gets $5 (0.5%)
   - Business gets $400 collateral back

## Deployment

### Prerequisites

1. Install Rust and Cargo
2. Install Stylus CLI:
   ```bash
   cargo install --force cargo-stylus
   ```

3. Create `.env` file:
   ```
   PRIVATE_KEY=your_private_key_here
   RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
   ```

### Deploy to Arbitrum Sepolia

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy contract
./scripts/deploy.sh
```

### Manual Deployment

```bash
# Build contract
cargo build --release

# Deploy with Stylus
cargo stylus deploy \
  --private-key=$PRIVATE_KEY \
  --endpoint=https://sepolia-rollup.arbitrum.io/rpc
```

## Testing

```bash
# Run unit tests
cargo test

# Run integration tests (requires local node)
cargo test --features integration
```

## Contract Verification

After deployment, verify the contract on Arbitrum block explorer:

1. Go to https://sepolia.arbiscan.io/
2. Search for your contract address
3. Click "Verify and Publish"
4. Upload the source code and compilation artifacts

## Security Features

- **Access Control**: Owner-only functions for emergency operations
- **Pause Mechanism**: Emergency pause functionality
- **Overflow Protection**: Safe math operations
- **Reentrancy Guards**: Protected against reentrancy attacks
- **Input Validation**: Comprehensive input validation

## Error Handling

The contract includes comprehensive error handling:

- `Unauthorized`: Access denied
- `InvoiceNotFound`: Invoice doesn't exist
- `InvoiceAlreadyFactored`: Invoice already purchased
- `InsufficientCollateral`: Not enough collateral deposited
- `InvoiceExpired`: Invoice past due date
- `InvalidAmount`: Invalid payment amount
- `TransferFailed`: ETH transfer failed

## Events

The contract emits the following events:

- `InvoiceCreated`: New invoice created
- `InvoiceFactored`: Invoice purchased by investor
- `InvoicePaid`: Invoice paid by customer
- `CollateralDeposited`: Collateral deposited
- `InsuranceClaim`: Insurance claim processed

## Gas Optimization

The contract is optimized for gas efficiency:

- Packed structs to minimize storage slots
- Efficient mapping usage
- Optimized calculation functions
- Minimal external calls

## Upgradeability

The contract is designed to be immutable for security, but includes:

- Owner functions for emergency management
- Fee adjustment capabilities (owner only)
- Pause/unpause functionality

## Integration

### Frontend Integration

Update the contract address in `src/config/contract.ts`:

```typescript
export const FLOWVAULT_CONTRACT_ADDRESS = "0xYourDeployedAddress";
```

### Web3 Libraries

The contract is compatible with:

- ethers.js
- web3.js
- viem
- wagmi

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation wiki

## Roadmap

- [ ] Multi-token support (USDC, USDT)
- [ ] Credit scoring integration
- [ ] Yield farming for collateral
- [ ] Cross-chain support
- [ ] Mobile app integration

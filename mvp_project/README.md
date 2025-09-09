# FlowVault - Invoice Factoring Platform MVP

**Tagline:** "Unlock your cash flow, vault your future"

FlowVault is a blockchain-based invoice factoring platform that connects small businesses needing quick cash with investors looking for short-term returns. Built for the Arbitrum hackathon using Stylus SDK.

## 🚀 Features

### For Businesses
- **Instant Cash Flow**: Get 95% of your invoice value immediately instead of waiting 30-90 days
- **Earn While You Wait**: Your collateral earns yield through DeFi protocols while securing the investment
- **Simple Process**: Upload invoice, deposit collateral, get funded

### For Investors
- **Attractive Returns**: Earn 3.7% return in 30-90 days with minimal risk
- **Triple Protection**: Insurance pool, collateral requirements, and smart contracts
- **Diversified Opportunities**: Browse and invest in various invoice opportunities

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Smart Contracts**: Rust + Stylus SDK for Arbitrum
- **Blockchain**: Arbitrum testnet deployment
- **Wallet Integration**: RainbowKit + Wagmi
- **Integrations**: AAVE/Compound for yield generation on collateral

## 💰 How It Works

1. **Business uploads invoice** - Submit invoice details and lock 40% as collateral
2. **Investor funds invoice** - Pay 95% of invoice value plus 0.5% insurance fee  
3. **Insurance protection activated** - Platform automatically creates shared safety pool
4. **Collateral earns yield** - Business collateral generates returns in DeFi protocols
5. **Customer pays invoice** - Payment triggers automatic distribution to all parties
6. **Everyone gets paid**:
   - Investor gets 3.7% return (invoice amount + profit - insurance fee)
   - Platform gets 1% fee
   - Insurance pool gets 0.5% for protection
   - Business gets collateral back + any DeFi earnings

## 🔒 Security Features

- **Insurance Pool**: Protects investors against non-payment defaults
- **Collateral Requirements**: 40% of invoice value locked as security
- **Smart Contract Automation**: Trustless execution and distribution
- **Yield Generation**: Collateral earns returns while providing security

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+
- Rust + Cargo
- Git

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install Stylus SDK (for smart contracts):
```bash
cd contracts
cargo build
```

3. Start development server:
```bash
npm run dev
```

### Smart Contract Development

The smart contracts are written in Rust using the Stylus SDK:

```bash
cd contracts
cargo build --release
```

## 📚 Project Structure

```
mvp_project/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── config/            # Wagmi/wallet configuration
│   └── assets/            # Static assets
├── contracts/             # Stylus smart contracts
│   ├── src/               # Rust contract source
│   └── Cargo.toml         # Rust dependencies
├── public/                # Static public files
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Arbitrum Testnet Deployment

1. Configure your wallet for Arbitrum testnet
2. Get testnet ETH from faucet
3. Deploy smart contracts using Stylus
4. Update contract addresses in frontend config
5. Deploy frontend to hosting platform

## 📈 Financial Model

### Example Transaction ($1000 invoice):
- **Business receives immediately**: $950 (95% of invoice)
- **Business deposits collateral**: $400 (40% of invoice)  
- **Investor pays**: $955 (funding + insurance fee)
- **When customer pays $1000**:
  - Investor receives: $985 (3.7% return)
  - Platform fee: $10 (1%)
  - Insurance pool: $5 (0.5%)
  - Business gets: $400 collateral + DeFi yield

## 🚦 MVP Status

- [x] Frontend UI/UX implementation
- [x] Smart contract architecture (Stylus SDK)
- [x] Wallet integration (RainbowKit)
- [x] Invoice creation and management
- [x] Investment dashboard
- [ ] Smart contract deployment
- [ ] DeFi yield integration
- [ ] Arbitrum testnet deployment
- [ ] End-to-end testing

## 🤝 Contributing

This is an MVP for the Arbitrum hackathon. Future enhancements:

- Integration with actual yield farming protocols
- Advanced risk assessment algorithms  
- Mobile application
- KYC/credit scoring integration
- Multi-chain support

## 📄 License

MIT License - see LICENSE file for details.

## 🏆 Hackathon Submission

Built for the Arbitrum hackathon showcasing:
- Stylus SDK smart contract development
- DeFi integration possibilities
- Real-world financial use case
- User-friendly blockchain application

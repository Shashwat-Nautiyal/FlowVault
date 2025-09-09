#!/bin/bash

# FlowVault Contract Deployment Script for Arbitrum Stylus

echo "🚀 FlowVault Contract Deployment"
echo "================================"

# Check if Stylus CLI is installed
if ! command -v cargo-stylus &> /dev/null; then
    echo "❌ cargo-stylus could not be found"
    echo "📦 Please install it with: cargo install --force cargo-stylus"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "📝 Please create a .env file with:"
    echo "   PRIVATE_KEY=your_private_key_here"
    echo "   RPC_URL=https://sepolia-rollup.arbitrum.io/rpc"
    exit 1
fi

# Source environment variables
source .env

# Validate environment variables
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ PRIVATE_KEY not set in .env file"
    exit 1
fi

# Set default RPC URL if not provided
if [ -z "$RPC_URL" ]; then
    export RPC_URL="https://sepolia-rollup.arbitrum.io/rpc"
fi

echo "🔧 Building contract..."
cd contracts
cargo build --release

echo "🧪 Running tests..."
cargo test

echo "📋 Contract Info:"
echo "   Platform Fee: 1% (100 basis points)"
echo "   Insurance Fee: 0.5% (50 basis points)"
echo "   Collateral Rate: 40% (4000 basis points)"

echo "🌐 Deploying to Arbitrum Sepolia..."
echo "   RPC URL: $RPC_URL"

# Deploy the contract using Stylus
cargo stylus deploy \
  --private-key=$PRIVATE_KEY \
  --endpoint=$RPC_URL

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "📝 Please update the contract address in:"
    echo "   - src/config/contract.ts"
    echo "   - Update FLOWVAULT_CONTRACT_ADDRESS with the deployed address"
else
    echo "❌ Deployment failed!"
    exit 1
fi

echo "🎉 FlowVault deployment complete!"

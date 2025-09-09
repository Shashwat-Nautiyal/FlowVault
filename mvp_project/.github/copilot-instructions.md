# FlowVault - Invoice Factoring Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
FlowVault is an invoice factoring platform MVP built for the Arbitrum hackathon. The platform connects small businesses needing quick cash with investors looking for short-term returns.

## Key Requirements
- All smart contracts must be written using the Stylus SDK for Arbitrum
- Code should be clean, understandable with proper error handling and logging
- Final deployment target is Arbitrum testnet
- MVP should demonstrate core invoice factoring workflow

## Architecture
- **Frontend**: React + TypeScript + Vite
- **Smart Contracts**: Rust + Stylus SDK for Arbitrum
- **Blockchain**: Arbitrum testnet deployment
- **Integrations**: AAVE/Compound for yield generation on collateral

## Core Features
1. Invoice upload and management for businesses
2. Investment opportunities browsing for investors
3. Automated collateral management with yield generation
4. Insurance pool for investor protection
5. Payment processing and distribution

## Code Standards
- Use TypeScript for type safety
- Implement comprehensive error handling
- Add proper logging throughout the application
- Follow React best practices with hooks and context
- Ensure smart contracts are secure and well-tested

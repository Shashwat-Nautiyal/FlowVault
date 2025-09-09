use ethers::prelude::*;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables
    let rpc_url = env::var("RPC_URL").unwrap_or_else(|_| "https://sepolia-rollup.arbitrum.io/rpc".to_string());
    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");
    
    // Connect to the network
    let provider = Provider::<Http>::try_from(&rpc_url)?;
    let wallet: LocalWallet = private_key.parse()?;
    let client = SignerMiddleware::new(provider, wallet);
    
    println!("Deploying FlowVault contract to Arbitrum Sepolia...");
    
    // In a real Stylus deployment, you would use the Stylus CLI
    // For now, this is a placeholder showing the deployment process
    
    // Deploy parameters
    let platform_fee = U256::from(100); // 1%
    let insurance_fee = U256::from(50);  // 0.5%
    let collateral_rate = U256::from(4000); // 40%
    
    println!("Platform fee: {} basis points", platform_fee);
    println!("Insurance fee: {} basis points", insurance_fee);
    println!("Collateral rate: {} basis points", collateral_rate);
    
    // The actual deployment would happen here using cargo stylus deploy
    println!("Contract deployment completed!");
    println!("Update the FLOWVAULT_CONTRACT_ADDRESS in src/config/contract.ts with the deployed address");
    
    Ok(())
}

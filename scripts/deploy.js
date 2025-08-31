import hre from "hardhat";

async function main() {
  console.log("🚀 Deploying ProduceChain contract...");

  // Deploy the contract
  const ProduceChain = await hre.ethers.getContractFactory("ProduceChain");
  const produceChain = await ProduceChain.deploy();

  await produceChain.waitForDeployment();
  const contractAddress = await produceChain.getAddress();

  console.log("✅ ProduceChain deployed to:", contractAddress);

  // Log the deployment details
  console.log("\n=== Deployment Details ===");
  console.log("Contract Address:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);

  // Next steps for frontend
  console.log("\n=== Next Steps ===");
  console.log("1. Update your .env file with:");
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("\n2. Update your frontend configuration with the new contract address");
  console.log("3. Test the contract functionality ✅");
}

main().catch(error => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});

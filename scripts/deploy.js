const hre = require("hardhat");

async function main() {
  console.log("Deploying ProduceChain contract...");

  // Deploy the contract
  const ProduceChain = await hre.ethers.getContractFactory("ProduceChain");
  const produceChain = await ProduceChain.deploy();

  await produceChain.deployed();

  console.log("ProduceChain deployed to:", produceChain.address);

  // Log the deployment details
  console.log("\n=== Deployment Details ===");
  console.log("Contract Address:", produceChain.address);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);

  // Update .env file with the contract address
  console.log("\n=== Next Steps ===");
  console.log("1. Update your .env file with the contract address:");
  console.log(`CONTRACT_ADDRESS=${produceChain.address}`);
  console.log("NEXT_PUBLIC_CONTRACT_ADDRESS=" + produceChain.address);
  console.log("\n2. Update your frontend configuration with the new contract address");
  console.log("\n3. Test the contract functionality");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

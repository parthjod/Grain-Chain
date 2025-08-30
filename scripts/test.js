const { ethers } = require("hardhat");

async function main() {
  console.log("Testing ProduceChain contract...");

  // Get the contract address from environment or use a default
  const contractAddress = process.env.CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
  
  if (contractAddress === "0x0000000000000000000000000000000000000000") {
    console.log("❌ Please set CONTRACT_ADDRESS in your .env file");
    return;
  }

  // Connect to the deployed contract
  const ProduceChain = await ethers.getContractFactory("ProduceChain");
  const produceChain = await ProduceChain.attach(contractAddress);

  console.log("✅ Connected to contract at:", contractAddress);

  // Test data
  const testProduceId = "TEST-001";
  const testFarmer = (await ethers.getSigners())[0].address;
  const testDistributor = (await ethers.getSigners())[0].address;
  const testRetailer = (await ethers.getSigners())[0].address;
  const testTimestamp = Math.floor(Date.now() / 1000);
  const testHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test produce data"));
  const testPrice = ethers.utils.parseEther("0.01");

  try {
    console.log("\n📝 Testing produce registration...");
    
    // Register produce
    const registerTx = await produceChain.registerProduce(
      testProduceId,
      testFarmer,
      testTimestamp,
      testHash
    );
    
    await registerTx.wait();
    console.log("✅ Produce registered successfully");
    console.log("Transaction hash:", registerTx.hash);

    // Get produce details
    const produce = await produceChain.getProduce(testProduceId);
    console.log("\n📋 Produce Details:");
    console.log("ID:", produce.produceId);
    console.log("Farmer:", produce.farmer);
    console.log("Status:", produce.status);
    console.log("Current Holder:", produce.currentHolder);

    console.log("\n🚚 Testing status update...");
    
    // Update status
    const updateTx = await produceChain.updateStatus(
      testProduceId,
      testDistributor,
      testTimestamp,
      "In Transit"
    );
    
    await updateTx.wait();
    console.log("✅ Status updated successfully");
    console.log("Transaction hash:", updateTx.hash);

    // Get updated produce details
    const updatedProduce = await produceChain.getProduce(testProduceId);
    console.log("\n📋 Updated Produce Details:");
    console.log("ID:", updatedProduce.produceId);
    console.log("Status:", updatedProduce.status);
    console.log("Current Holder:", updatedProduce.currentHolder);

    console.log("\n🏪 Testing retail entry...");
    
    // Create retail entry
    const retailTx = await produceChain.retailEntry(
      testProduceId,
      testRetailer,
      testPrice,
      testTimestamp
    );
    
    await retailTx.wait();
    console.log("✅ Retail entry created successfully");
    console.log("Transaction hash:", retailTx.hash);

    // Get final produce details
    const finalProduce = await produceChain.getProduce(testProduceId);
    console.log("\n📋 Final Produce Details:");
    console.log("ID:", finalProduce.produceId);
    console.log("Status:", finalProduce.status);
    console.log("Current Holder:", finalProduce.currentHolder);
    console.log("Price:", ethers.utils.formatEther(finalProduce.price), "ETH");
    console.log("Is Sold:", finalProduce.isSold);

    console.log("\n📜 Getting produce history...");
    
    // Get history
    const history = await produceChain.getHistory(testProduceId);
    console.log("History entries:", history.length);
    
    history.forEach((entry, index) => {
      console.log(`\nEntry ${index + 1}:`);
      console.log("  Action:", entry.action);
      console.log("  Actor:", entry.actor);
      console.log("  Timestamp:", new Date(entry.timestamp * 1000).toLocaleString());
      console.log("  Details:", entry.details);
    });

    console.log("\n🎉 All tests completed successfully!");

  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
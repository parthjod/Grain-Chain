import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  console.log("🧪 Testing ProduceChain contract...");

  // Load contract address from env
  const contractAddress = process.env.CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

  if (contractAddress === "0x0000000000000000000000000000000000000000") {
    console.log("❌ Please set CONTRACT_ADDRESS in your .env file");
    return;
  }

  // Connect to deployed contract
  const ProduceChain = await ethers.getContractFactory("ProduceChain");
  const produceChain = await ProduceChain.attach(contractAddress);

  console.log("✅ Connected to contract at:", contractAddress);

  // Test data
  const testProduceIdString = "TEST-001";
  const testProduceId = ethers.encodeBytes32String(testProduceIdString);
  const [farmer, distributor, retailer] = await ethers.getSigners();
  const testTimestamp = Math.floor(Date.now() / 1000);
  const testHash = ethers.keccak256(ethers.toUtf8Bytes("test produce data"));
  const testPrice = ethers.parseEther("0.01");

  try {
    console.log("\n📝 Registering produce...");
    const registerTx = await produceChain.registerProduce(testProduceId, farmer.address, testTimestamp, testHash);
    await registerTx.wait();
    console.log("✅ Produce registered. TX:", registerTx.hash);

    const produce = await produceChain.getProduce(testProduceId);
    console.log("\n📋 Produce Details:", produce);

    console.log("\n🚚 Updating status...");
    const updateTx = await produceChain.updateStatus(testProduceId, distributor.address, testTimestamp, "In Transit");
    await updateTx.wait();
    console.log("✅ Status updated. TX:", updateTx.hash);

    const updatedProduce = await produceChain.getProduce(testProduceId);
    console.log("\n📋 Updated Produce Details:", updatedProduce);

    console.log("\n🏪 Creating retail entry...");
    const retailTx = await produceChain.retailEntry(testProduceId, retailer.address, testPrice, testTimestamp);
    await retailTx.wait();
    console.log("✅ Retail entry created. TX:", retailTx.hash);

    const finalProduce = await produceChain.getProduce(testProduceId);
    console.log("\n📋 Final Produce Details:", finalProduce);

    console.log("\n📜 Fetching history...");
    const history = await produceChain.getHistory(testProduceId);

    history.forEach((entry, idx) => {
      console.log(`\nEntry ${idx + 1}:`, {
        action: entry.action,
        actor: entry.actor,
        timestamp: new Date(Number(entry.timestamp) * 1000).toLocaleString(),
        details: entry.details,
      });
    });

    console.log("\n🎉 All tests completed successfully!");
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

const fetch = require("node-fetch");

async function testAPI() {
  console.log("Testing GrainChain API endpoints...\n");

  // Test 1: Register produce
  console.log("1. Testing produce registration...");
  try {
    const registerResponse = await fetch("http://localhost:3000/api/produce/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produceId: "TEST-001",
        farmer: "0x1234567890123456789012345678901234567890",
        farmerName: "John Farmer",
        produceType: "wheat",
        quantity: "100",
        unit: "kg",
        origin: "Farm Address, Country",
        harvestDate: "2024-01-15",
        walletAddress: "0x1234567890123456789012345678901234567890",
      }),
    });

    const registerData = await registerResponse.json();
    console.log("Register Response:", registerResponse.status, registerData);

    if (registerResponse.ok) {
      // Test 2: Update status
      console.log("\n2. Testing status update...");
      const updateResponse = await fetch("http://localhost:3000/api/produce/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produceId: "TEST-001",
          distributor: "0x0987654321098765432109876543210987654321",
          distributorName: "ABC Distribution",
          status: "In Transit",
          location: "Distribution Center",
          walletAddress: "0x0987654321098765432109876543210987654321",
        }),
      });

      const updateData = await updateResponse.json();
      console.log("Update Response:", updateResponse.status, updateData);

      // Test 3: Get produce details
      console.log("\n3. Testing get produce details...");
      const getResponse = await fetch("http://localhost:3000/api/produce/TEST-001");
      const getData = await getResponse.json();
      console.log("Get Response:", getResponse.status, getData);
    }
  } catch (error) {
    console.error("Error testing API:", error);
  }
}

testAPI();

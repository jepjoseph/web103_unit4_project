const API_URL = "http://localhost:3000/api/custom-items";

async function testReadCustomItems() {
  try {
    // Test 1: Retrieve all configurations
    const allResponse = await fetch(API_URL);
    const allData = await allResponse.json();

    console.log("\nTEST 1: Get all configurations");
    console.log("HTTP status:", allResponse.status);
    console.log("Response:", JSON.stringify(allData, null, 2));

    // Test 2: Retrieve the saved configuration with ID 2
    const itemResponse = await fetch(`${API_URL}/2`);
    const itemData = await itemResponse.json();

    console.log("\nTEST 2: Get configuration by ID");
    console.log("HTTP status:", itemResponse.status);
    console.log("Response:", JSON.stringify(itemData, null, 2));

    // Test 3: Request a nonexistent configuration
    const missingResponse = await fetch(`${API_URL}/999999`);
    const missingData = await missingResponse.json();

    console.log("\nTEST 3: Get nonexistent configuration");
    console.log("HTTP status:", missingResponse.status);
    console.log("Response:", JSON.stringify(missingData, null, 2));

    // Test 4: Request an invalid ID
    const invalidResponse = await fetch(`${API_URL}/abc`);
    const invalidData = await invalidResponse.json();

    console.log("\nTEST 4: Get invalid ID");
    console.log("HTTP status:", invalidResponse.status);
    console.log("Response:", JSON.stringify(invalidData, null, 2));
  } catch (error) {
    console.error("Read API test failed:", error.message);
    process.exitCode = 1;
  }
}

testReadCustomItems();

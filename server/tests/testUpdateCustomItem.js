import assert from "node:assert/strict";

const API_URL = "http://localhost:3000/api/custom-items";
const ITEM_ID = 2;

async function sendUpdate(id, config) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

async function testUpdateCustomItem() {
  try {
    // Test 1: Update an existing configuration.
    const validConfig = {
      name: "Updated Living Room Switch",
      finish: "Black",
      channels: 2,
      connectivity: "Wi-Fi",
      energy_monitoring: false,
    };

    const validResult = await sendUpdate(ITEM_ID, validConfig);

    assert.equal(validResult.status, 200);
    assert.equal(validResult.data.item.id, ITEM_ID);
    assert.equal(validResult.data.item.name, validConfig.name);
    assert.equal(validResult.data.item.finish, "Black");
    assert.equal(validResult.data.item.channels, 2);
    assert.equal(Number(validResult.data.item.total_price), 39.99);

    console.log("PASS: Existing switch updated successfully.");
    console.log("Updated item:", validResult.data.item);

    // Test 2: Reject an incompatible configuration.
    const invalidConfig = {
      name: "Invalid Updated Switch",
      finish: "Black",
      channels: 8,
      connectivity: "Bluetooth",
      energy_monitoring: true,
    };

    const invalidResult = await sendUpdate(ITEM_ID, invalidConfig);

    assert.equal(invalidResult.status, 400);
    assert.equal(invalidResult.data.success, false);
    assert.equal(invalidResult.data.errors.length, 2);

    console.log("PASS: Incompatible configuration rejected.");

    // Test 3: Reject an invalid ID.
    const invalidIdResult = await sendUpdate("abc", validConfig);

    assert.equal(invalidIdResult.status, 400);

    console.log("PASS: Invalid item ID rejected.");

    // Test 4: Return 404 for a nonexistent item.
    const missingResult = await sendUpdate(999999, validConfig);

    assert.equal(missingResult.status, 404);

    console.log("PASS: Nonexistent item returned 404.");

    // Test 5: Verify the saved item was not changed by the rejected update.
    const readResponse = await fetch(`${API_URL}/${ITEM_ID}`);
    const readData = await readResponse.json();

    assert.equal(readResponse.status, 200);
    assert.equal(readData.item.name, validConfig.name);
    assert.equal(readData.item.channels, 2);
    assert.equal(Number(readData.item.total_price), 39.99);

    console.log("PASS: Database retains the valid updated configuration.");
  } catch (error) {
    console.error("FAIL:", error.message);
    process.exitCode = 1;
  }
}

testUpdateCustomItem();

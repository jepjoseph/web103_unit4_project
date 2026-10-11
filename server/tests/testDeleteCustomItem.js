import assert from "node:assert/strict";

const API_URL = "http://localhost:3000/api/custom-items";
const ITEM_ID = 3;

async function deleteItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

async function testDeleteCustomItem() {
  try {
    // Test 1: Delete existing item ID 3.
    const result = await deleteItem(ITEM_ID);

    assert.equal(result.status, 200);
    assert.equal(result.data.success, true);
    assert.equal(result.data.item.id, ITEM_ID);

    console.log("PASS: Existing switch deleted successfully.");
    console.log("Deleted item:", result.data.item);

    // Test 2: Verify deleted item cannot be retrieved.
    const readResponse = await fetch(`${API_URL}/${ITEM_ID}`);

    assert.equal(readResponse.status, 404);

    console.log("PASS: Deleted switch is no longer retrievable.");

    // Test 3: Attempt to delete the same item again.
    const missingResult = await deleteItem(ITEM_ID);

    assert.equal(missingResult.status, 404);

    console.log("PASS: Deleting nonexistent item returns 404.");

    // Test 4: Reject invalid item ID.
    const invalidResult = await deleteItem("abc");

    assert.equal(invalidResult.status, 400);

    console.log("PASS: Invalid item ID rejected.");

    // Test 5: Verify item ID 2 remains in PostgreSQL.
    const remainingResponse = await fetch(`${API_URL}/2`);
    const remainingData = await remainingResponse.json();

    assert.equal(remainingResponse.status, 200);
    assert.equal(remainingData.item.id, 2);
    assert.equal(remainingData.item.name, "Updated Living Room Switch");

    console.log("PASS: Item ID 2 remains unchanged.");
  } catch (error) {
    console.error("FAIL:", error.message);
    process.exitCode = 1;
  }
}

testDeleteCustomItem();

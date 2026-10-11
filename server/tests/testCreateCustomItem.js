const API_URL = "http://localhost:3000/api/custom-items";

async function testCreateCustomItem() {
  const validConfig = {
    name: "Living Room Switch",
    finish: "Gold",
    channels: 4,
    connectivity: "Zigbee",
    energy_monitoring: true,
  };

  const invalidConfig = {
    name: "Invalid Test Switch",
    finish: "Black",
    channels: 8,
    connectivity: "Bluetooth",
    energy_monitoring: true,
  };

  for (const config of [validConfig, invalidConfig]) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      console.log("\nConfiguration:", config.name);
      console.log("HTTP status:", response.status);
      console.log("Response:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Request failed:", error.message);
      process.exitCode = 1;
    }
  }
}

testCreateCustomItem();

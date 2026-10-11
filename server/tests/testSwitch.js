import {
  calculateSwitchPrice,
  validateSwitchConfig,
} from "../utils/switchConfig.js";

const config = {
  name: "Living Room Switch",
  finish: "Gold",
  channels: 4,
  connectivity: "Zigbee",
  energy_monitoring: true,
};

console.log("Validation:", validateSwitchConfig(config));
console.log("Price:", calculateSwitchPrice(config));

// Test an incompatible configuration
const invalidConfig = {
  name: "Invalid Test Switch",
  finish: "Black",
  channels: 8,
  connectivity: "Bluetooth",
  energy_monitoring: true,
};

console.log("Invalid configuration:", validateSwitchConfig(invalidConfig));

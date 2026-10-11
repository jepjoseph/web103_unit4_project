export const FINISHES = [
  "Black",
  "White",
  "Silver",
  "Blue",
  "Amber",
  "Clear Glass",
  "Gold",
  "Dark Gray",
];

export const CHANNELS = [1, 2, 4, 6, 8];

export const CONNECTIVITY = ["Wi-Fi", "Zigbee", "Bluetooth", "Ethernet"];

const BASE_PRICE = 29.99;

const FINISH_PRICES = {
  Black: 0,
  White: 0,
  Silver: 5,
  Blue: 5,
  Amber: 5,
  "Clear Glass": 15,
  Gold: 20,
  "Dark Gray": 5,
};

const CHANNEL_PRICES = {
  1: 0,
  2: 10,
  4: 25,
  6: 40,
  8: 55,
};

const CONNECTIVITY_PRICES = {
  "Wi-Fi": 0,
  Zigbee: 5,
  Bluetooth: 0,
  Ethernet: 15,
};

export function calculatePreviewPrice(config) {
  const total =
    BASE_PRICE +
    FINISH_PRICES[config.finish] +
    CHANNEL_PRICES[config.channels] +
    CONNECTIVITY_PRICES[config.connectivity] +
    (config.energy_monitoring ? 12 : 0);

  return Number(total.toFixed(2));
}

export function getCompatibilityErrors(config) {
  const errors = [];

  if (config.channels === 8 && config.connectivity === "Bluetooth") {
    errors.push(
      "The 8-channel switch does not support Bluetooth in this product catalog.",
    );
  }

  if (config.energy_monitoring && config.connectivity === "Bluetooth") {
    errors.push(
      "Energy monitoring is not available with Bluetooth in this product catalog.",
    );
  }

  return errors;
}

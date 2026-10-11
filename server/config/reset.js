import dotenv from "dotenv";
import { pool } from "./database.js";

dotenv.config({ path: "./server/.env" });

async function createTable() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS custom_items (
            id SERIAL PRIMARY KEY,

            name VARCHAR(100) NOT NULL,
            device_type VARCHAR(50) NOT NULL DEFAULT 'smart_switch',
            finish VARCHAR(30) NOT NULL,
            channels INTEGER NOT NULL,
            connectivity VARCHAR(20) NOT NULL,
            energy_monitoring BOOLEAN NOT NULL DEFAULT FALSE,
            total_price NUMERIC(10,2) NOT NULL,

            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT chk_device_type
            CHECK (device_type = 'smart_switch'),

            CONSTRAINT chk_finish
            CHECK (finish IN (
                'Black', 'White', 'Silver', 'Blue',
                'Amber', 'Clear Glass', 'Gold', 'Dark Gray'
            )),

            CONSTRAINT chk_channels
            CHECK (channels IN (1, 2, 4, 6, 8)),

            CONSTRAINT chk_connectivity
            CHECK (connectivity IN (
                'Wi-Fi', 'Zigbee', 'Bluetooth', 'Ethernet'
            )),

            CONSTRAINT chk_total_price
            CHECK (total_price >= 0),

            CONSTRAINT chk_name_not_blank
            CHECK (LENGTH(TRIM(name)) > 0),

            CONSTRAINT chk_channels_bluetooth
            CHECK (NOT (
                channels = 8 AND connectivity = 'Bluetooth'
            )),

            CONSTRAINT chk_energy_bluetooth
            CHECK (NOT (
                energy_monitoring = TRUE AND connectivity = 'Bluetooth'
            ))
        );
    `);

    console.log("custom_items table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

createTable();

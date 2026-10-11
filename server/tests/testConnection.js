import "dotenv/config";
import dotenv from "dotenv";
import { pool } from "../config/database.js";

// Load environment variables from server/.env
dotenv.config({ path: "./server/.env" });

async function testConnection() {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database_name, CURRENT_TIMESTAMP AS server_time",
    );

    console.log("PostgreSQL connection successful!");
    console.log("Database:", result.rows[0].database_name);
    console.log("Server time:", result.rows[0].server_time);
  } catch (error) {
    console.error("PostgreSQL connection failed!");
    console.error("Error:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testConnection();

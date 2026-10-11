import { pool } from "../config/database.js";

import {
  calculateSwitchPrice,
  validateSwitchConfig,
} from "../utils/switchConfig.js";

export async function createCustomItem(req, res) {
  try {
    const config = req.body;

    // Validate the customer's selections.
    const validation = validateSwitchConfig(config);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    // Calculate the price on the server, not the frontend.
    const totalPrice = calculateSwitchPrice(config);

    const query = `
            INSERT INTO custom_items (
                name,
                device_type,
                finish,
                channels,
                connectivity,
                energy_monitoring,
                total_price
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

    const values = [
      config.name.trim(),
      "smart_switch",
      config.finish,
      config.channels,
      config.connectivity,
      config.energy_monitoring,
      totalPrice,
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Smart switch created successfully.",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Create custom item error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create the smart switch.",
    });
  }
}

export async function getAllCustomItems(req, res) {
  try {
    const result = await pool.query(`
            SELECT *
            FROM custom_items
            ORDER BY created_at DESC, id DESC
        `);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      items: result.rows,
    });
  } catch (error) {
    console.error("Get all custom items error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve custom items.",
    });
  }
}

export async function getCustomItemById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const result = await pool.query(
      "SELECT * FROM custom_items WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Custom item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Get custom item error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve the custom item.",
    });
  }
}

export async function updateCustomItem(req, res) {
  try {
    const id = Number(req.params.id);

    // Validate the item ID.
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const config = req.body;

    // Ensure the request contains a configuration object.
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      return res.status(400).json({
        success: false,
        errors: ["A JSON configuration object is required."],
      });
    }

    // Validate the selected features.
    const validation = validateSwitchConfig(config);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    // Calculate the price on the server.
    const totalPrice = calculateSwitchPrice(config);

    const query = `
            UPDATE custom_items
            SET
                name = $1,
                finish = $2,
                channels = $3,
                connectivity = $4,
                energy_monitoring = $5,
                total_price = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *
        `;

    const values = [
      config.name.trim(),
      config.finish,
      config.channels,
      config.connectivity,
      config.energy_monitoring,
      totalPrice,
      id,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Custom item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Smart switch updated successfully.",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Update custom item error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update the smart switch.",
    });
  }
}

export async function deleteCustomItem(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const result = await pool.query(
      "DELETE FROM custom_items WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Custom item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Smart switch deleted successfully.",
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Delete custom item error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to delete the smart switch.",
    });
  }
}

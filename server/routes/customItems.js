import express from "express";
import {
  createCustomItem,
  getAllCustomItems,
  getCustomItemById,
  updateCustomItem,
  deleteCustomItem,
} from "../controllers/customItemsController.js";

const router = express.Router();

router.post("/", createCustomItem);
router.get("/", getAllCustomItems);
router.get("/:id", getCustomItemById);
router.put("/:id", updateCustomItem);
router.delete("/:id", deleteCustomItem);

export default router;

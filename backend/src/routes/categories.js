import express from "express";
import { auth } from "../middleware/auth.js";
import {
	getCategories,
	addCategory,
	renameCategory,
	deleteCategory,
} from "../controllers/categoriesController.js";

const router = express.Router();

// GET /categories
router.get("/", auth, getCategories);
// POST /categories
router.post("/", auth, addCategory);
// PUT /categories/:name
router.put("/:name", auth, renameCategory);
// DELETE /categories/:name
router.delete("/:name", auth, deleteCategory);

export default router;

import express from "express";
import { auth } from "../middleware/auth.js";
import {
	getBudgets,
	addBudget,
	updateBudget,
	deleteBudget,
} from "../controllers/budgetsController.js";

const router = express.Router();

// GET /budgets
router.get("/", auth, getBudgets);
// POST /budgets
router.post("/", auth, addBudget);
// PUT /budgets/:id
router.put("/:id", auth, updateBudget);
// DELETE /budgets/:id
router.delete("/:id", auth, deleteBudget);

export default router;

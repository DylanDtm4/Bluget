import express from "express";
import { auth } from "../middleware/auth.js";
import {
	createTransaction,
	deleteTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
} from "../controllers/transactionsController.js";
const router = express.Router();

// POST /transactions
router.post("/", auth, createTransaction);
// GET /transactions
router.get("/", auth, getTransactions);
// GET /transactions/:id
router.get("/:id", auth, getTransaction);
// PUT /transactions/:id
router.put("/:id", auth, updateTransaction);
// DELETE /transactions/:id
router.delete("/:id", auth, deleteTransaction);

export default router;

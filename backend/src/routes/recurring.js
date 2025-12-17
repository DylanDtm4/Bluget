import express from "express";
import { auth } from "../middleware/auth.js";
import {
	createRecurringTransaction,
	getRecurringTransactions,
	updateRecurringTransaction,
} from "../controllers/recurringTransactionsController.js";
const router = express.Router();

// POST /recurring
router.post("/", auth, createRecurringTransaction);
// GET /recurring
router.get("/", auth, getRecurringTransactions);
// PUT /recurring/:id
router.put("/:id", auth, updateRecurringTransaction);
export default router;

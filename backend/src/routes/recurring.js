import express from "express";
import { auth } from "../middleware/auth.js";
import { createRecurringTransaction } from "../controllers/recurringTransactionsController.js";
const router = express.Router();

// POST /recurring
router.post("/", auth, createRecurringTransaction);

export default router;

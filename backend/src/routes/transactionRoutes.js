import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  listTransactions,
  updateTransaction,
} from "../controllers/transactionController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// all routes require auth
router.use(authMiddleware);

/**
 * Transactions nested under months
 */
// GET /api/transactions/:monthId → list all transactions in that month
router.get("/:monthId", listTransactions);

// POST /api/transactions/:monthId → create a transaction in that month
router.post("/:monthId", createTransaction);

/**
 * Single transaction operations
 */
// GET /api/transactions/:transactionId → get one transaction
router.get("/transactions/:transactionId", getTransaction);

// PATCH /api/transactions/:transactionId → update transaction
router.patch("/transactions/:transactionId", updateTransaction);

// DELETE /api/transactions/:transactionId → delete transaction
router.delete("/transactions/:transactionId", deleteTransaction);

export default router;

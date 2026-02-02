const auth = require("../middleware/auth");
const {
	createTransaction,
	createTransactions,
	deleteTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
	clearTransactions,
} = require("../controllers/transactionsController");
const express = require("express");
const router = express.Router();

// POST /transactions/bulk
router.post("/bulk", auth, createTransactions);
// GET /transactions
router.get("/", auth, getTransactions);
// DELETE /transactions
router.delete("/", auth, clearTransactions);

// POST /transactions
router.post("/", auth, createTransaction);
// GET /transactions/:id
router.get("/:id", auth, getTransaction);
// PUT /transactions/:id
router.put("/:id", auth, updateTransaction);
// DELETE /transactions/:id
router.delete("/:id", auth, deleteTransaction);

module.exports = router;

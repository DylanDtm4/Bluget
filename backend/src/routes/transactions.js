const auth = require("../middleware/auth");
const {
	createTransaction,
	deleteTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
} = require("../controllers/transactionsController");
const express = require("express");
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

module.exports = router;

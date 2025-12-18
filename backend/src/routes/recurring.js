const auth = require("../middleware/auth");
const {
	createRecurringTransaction,
	getRecurringTransactions,
	updateRecurringTransaction,
	deleteRecurringTransaction,
} = require("../controllers/recurringTransactionsController.js");
const express = require("express");
const router = express.Router();

// POST /recurring
router.post("/", auth, createRecurringTransaction);
// GET /recurring
router.get("/", auth, getRecurringTransactions);
// PUT /recurring/:id
router.put("/:id", auth, updateRecurringTransaction);
// DEL /recurring/:id
router.delete("/:id", auth, deleteRecurringTransaction);

module.exports = router;

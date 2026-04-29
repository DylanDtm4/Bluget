const auth = require("../middleware/auth");
const {
	createRecurringTransaction,
	createRecurringTransactions,
	getRecurringTransactions,
	getRecurringTransaction,
	updateRecurringTransaction,
	deleteRecurringTransaction,
	clearRecurringTransactions,
} = require("../controllers/recurringTransactionsController.js");
const express = require("express");
const router = express.Router();

// POST /recurring/bulk
router.post("/bulk", auth, createRecurringTransactions);
// GET /recurring
router.get("/", auth, getRecurringTransactions);
// DELETE /recurring
router.delete("/", auth, clearRecurringTransactions);

// POST /recurring
router.post("/", auth, createRecurringTransaction);
// GET /recurring/:id
router.get("/:id", auth, getRecurringTransaction);
// PUT /recurring/:id
router.put("/:id", auth, updateRecurringTransaction);
// DELETE /recurring/:id
router.delete("/:id", auth, deleteRecurringTransaction);

module.exports = router;

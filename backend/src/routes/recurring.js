const auth = require("../middleware/auth");
const {
	createRecurringTransaction,
	createRecurringTransactions,
	getRecurringTransactions,
	updateRecurringTransaction,
	deleteRecurringTransaction,
	clearRecurringTransactions,
} = require("../controllers/recurringTransactionsController.js");
const express = require("express");
const router = express.Router();

// POST /recurring
router.post("/", auth, createRecurringTransaction);
// POST /recurring/bulk
router.post("/bulk", auth, createRecurringTransactions);
// GET /recurring
router.get("/", auth, getRecurringTransactions);
// PUT /recurring/:id
router.put("/:id", auth, updateRecurringTransaction);
// DEL /recurring/:id
router.delete("/:id", auth, deleteRecurringTransaction);
// DEL /recurring
router.delete("/", auth, clearRecurringTransactions);

module.exports = router;

const auth = require("../middleware/auth");
const {
	getBudgets,
	addBudget,
	updateBudget,
	deleteBudget,
} = require("../controllers/budgetsController");
const express = require("express");
const router = express.Router();

// GET /budgets
router.get("/", auth, getBudgets);
// POST /budgets
router.post("/", auth, addBudget);
// PUT /budgets/:id
router.put("/:id", auth, updateBudget);
// DELETE /budgets/:id
router.delete("/:id", auth, deleteBudget);

module.exports = router;

const auth = require("../middleware/auth");
const {
	getBudgets,
	getBudget,
	getBudgetsForMonth,
	addBudget,
	addBudgets,
	updateBudget,
	deleteBudget,
	clearBudgets,
} = require("../controllers/budgetsController");
const express = require("express");
const router = express.Router();

// GET /budgets
router.get("/", auth, getBudgets);
// GET /budgets/for-month?month=X&year=Y  (must be before /:id)
router.get("/for-month", auth, getBudgetsForMonth);
// POST /budgets/bulk
router.post("/bulk", auth, addBudgets);
// POST /budgets
router.post("/", auth, addBudget);
// DELETE /budgets
router.delete("/", auth, clearBudgets);
// GET /budgets/:id
router.get("/:id", auth, getBudget);
// PUT /budgets/:id
router.put("/:id", auth, updateBudget);
// DELETE /budgets/:id
router.delete("/:id", auth, deleteBudget);

module.exports = router;

const mongoose = require("mongoose");

const BudgetsSchema = new mongoose.Schema({
	userId: String,
	category: String,
	amount: Number,
	month: Number,
	year: Number,
});

module.exports = mongoose.model("Budgets", BudgetsSchema);

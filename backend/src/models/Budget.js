const mongoose = require("mongoose");

const BudgetsSchema = new mongoose.Schema({
	userId: String,
	category: String,
	amount: Number,
	month: Number,   // null when recurring
	year: Number,    // null when recurring
	note: String,
	recurring: { type: Boolean, default: false },
});

module.exports = mongoose.model("Budgets", BudgetsSchema);

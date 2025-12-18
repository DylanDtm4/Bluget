const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	type: { type: String, enum: ["expense", "income", "investment", "savings"] },
	category: String,
	date: Date,
	note: String,
});
module.exports = mongoose.model("Transaction", TransactionSchema);

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	mainCategory: {
		type: String,
		enum: ["expense", "income", "investment", "savings"],
	},
	secondaryCategory: String,
	date: Date,
	note: String,
});
module.exports = mongoose.model("Transaction", TransactionSchema);

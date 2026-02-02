const mongoose = require("mongoose");

const RecurringTransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	transactionType: {
		type: String,
		enum: ["expense", "income", "investment", "savings"],
	},
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	note: String,
	frequency: { type: String, enum: ["daily", "weekly", "monthly"] },
	nextRun: Date, // when the next transaction should be generated
	startDate: Date,
	endDate: Date,
});

module.exports = mongoose.model(
	"RecurringTransaction",
	RecurringTransactionSchema,
);

import mongoose from "mongoose";

const RecurringTransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	type: { type: String, enum: ["expense", "income", "investment", "savings"] },
	category: String,
	note: String,
	frequency: { type: String, enum: ["daily", "weekly", "monthly"] },
	nextRun: Date, // when the next transaction should be generated
});

export default mongoose.model(
	"RecurringTransaction",
	RecurringTransactionSchema
);

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	type: { type: String, enum: ["expense", "income", "investment", "savings"] },
	category: String,
	date: Date,
	note: String,
});
export default mongoose.model("Transaction", TransactionSchema);

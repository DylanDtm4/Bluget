import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	category: String,
	date: Date,
	notes: String,
});

export default mongoose.model("Transaction", TransactionSchema);

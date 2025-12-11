import mongoose from "mongoose";

const BudgetsSchema = new mongoose.Schema({
	userId: String,
	category: String,
	amount: Number,
	month: Number,
	year: Number,
});

export default mongoose.model("Budgets", BudgetsSchema);

import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
	income: { type: Number, default: 0 },
	expenses: { type: Number, default: 0 },
	savings: { type: Number, default: 0 },
	investments: { type: Number, default: 0 },
});

const monthSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		month: { type: String, required: true },
		summary: { type: summarySchema, default: () => ({}) },
		transactions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Transaction",
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("Month", monthSchema);

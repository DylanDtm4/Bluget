import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
	source: { type: String, required: true },
	amount: { type: Number, required: true, min: 0 },
	date: { type: Date, required: true },
});

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			match: /.+\@.+\..+/,
		},
		passwordHash: { type: String, required: true },
		netValue: { type: Number, required: true, default: 0 },
		income: { type: [entrySchema], default: [] },
		expenses: { type: [entrySchema], default: [] },
		savings: { type: [entrySchema], default: [] },
		investments: { type: [entrySchema], default: [] },
		budgets: [{ type: Number, required: true, default: 0 }],
		role: { type: String, enum: ["user", "admin"], default: "user" },
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);

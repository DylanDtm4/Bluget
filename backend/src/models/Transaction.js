import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    monthId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Month",
      required: true,
    },
    value: { type: Number, required: true },
    categoryType: [
      {
        type: String,
        enum: ["income", "expenses", "savings", "investments"],
        required: true,
      },
    ],
    category: [
      {
        type: String,
        enum: ["paycheck 1", "paycheck 2"], // need to figure out this
        required: true,
      },
    ],
    date: { type: Date, required: true },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

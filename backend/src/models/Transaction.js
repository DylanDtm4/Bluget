import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    monthId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Month",
      required: true,
    },
    value: {
      type: Number, // double/decimal
      required: true,
    },
    categoryType: {
      type: String,
      enum: ["income", "expenses", "savings", "investments"], // restrict to these
      required: true,
    },
    category: {
      type: [String], // array of strings
      required: true,
    },
    date: {
      type: String, // string format date (e.g. "2025-08-30")
      required: true,
    },
    note: {
      type: String,
      default: "", // optional
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

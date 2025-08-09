import mongoose from "mongoose";

const monthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: { type: String, required: true },
    netValue: { type: Number, required: true },
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

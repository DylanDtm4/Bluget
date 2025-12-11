import mongoose from "mongoose";

const MonthSchema = new mongoose.Schema({
	userId: String,
	month: Number,
	year: Number,
});

export default mongoose.model("Month", MonthSchema);

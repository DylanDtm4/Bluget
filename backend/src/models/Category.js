import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	userId: String,
	category: String,
	custom: { type: Boolean, default: false },
});

export default mongoose.model("Category", CategorySchema);

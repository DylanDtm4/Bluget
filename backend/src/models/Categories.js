import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
	userId: String,
	categories: [String],
});

export default mongoose.model("Categories", CategoriesSchema);

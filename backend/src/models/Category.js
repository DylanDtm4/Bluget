const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
	userId: String,
	category: String,
	color: String,
});

module.exports = mongoose.model("Category", CategorySchema);

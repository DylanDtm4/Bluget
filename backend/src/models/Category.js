const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
	userId: String,
	category: String,
	color: String,
	icon: String,
});

module.exports = mongoose.model("Category", CategorySchema);

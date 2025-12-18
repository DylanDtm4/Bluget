const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
	userId: String,
	category: String,
	custom: { type: Boolean, default: false },
});

module.exports = mongoose.model("Category", CategorySchema);

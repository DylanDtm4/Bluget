const mongoose = require("mongoose");

const MonthSchema = new mongoose.Schema({
	userId: String,
	month: Number,
	year: Number,
});

module.exports = mongoose.model("Month", MonthSchema);

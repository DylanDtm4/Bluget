const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	currency: String,
	timezone: String,
	theme: { type: String, default: "light" },
});

module.exports = mongoose.model("User", UserSchema);

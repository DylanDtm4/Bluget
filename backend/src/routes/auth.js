import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hashed });

		res.json({ message: "User created", user });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Registration failed" });
	}
});

// login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ error: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.json({ token, user });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Login failed" });
	}
});

export default router;

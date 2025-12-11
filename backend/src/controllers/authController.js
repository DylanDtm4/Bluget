import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password)
			return res.status(400).json({ error: "All fields are required" });

		// Check if email already exists
		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ error: "Email already in use" });

		// Hash password
		const hashed = await bcrypt.hash(password, 10);

		// Create user
		const user = await User.create({
			name,
			email,
			password: hashed,
		});

		// Hide password in returned user object
		const { password: _, ...safeUser } = user.toObject();

		return res.status(201).json({ message: "User created", user: safeUser });
	} catch (err) {
		console.error("REGISTER ERROR:", err);
		return res.status(500).json({ error: "Registration failed" });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({ error: "Email and password required" });

		// Find user
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });

		// Check password
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ error: "Invalid credentials" });

		// Create JWT
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		// Remove password before returning
		const { password: _, ...safeUser } = user.toObject();

		return res.status(200).json({
			message: "Login successful",
			token,
			user: safeUser,
		});
	} catch (err) {
		console.error("LOGIN ERROR:", err);
		return res.status(500).json({ error: "Login failed" });
	}
};

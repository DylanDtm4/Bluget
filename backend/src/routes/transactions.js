import express from "express";
import Transaction from "../models/Transaction.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// middleware: require auth
function auth(req, res, next) {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "No token" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.id;
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
}

// create
router.post("/", auth, async (req, res) => {
	const tx = await Transaction.create({ ...req.body, userId: req.user });
	res.json(tx);
});

// read all
router.get("/", auth, async (req, res) => {
	const tx = await Transaction.find({ userId: req.user });
	res.json(tx);
});

// update
router.put("/:id", auth, async (req, res) => {
	const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.json(tx);
});

// delete
router.delete("/:id", auth, async (req, res) => {
	await Transaction.findByIdAndDelete(req.params.id);
	res.json({ message: "Deleted" });
});

export default router;

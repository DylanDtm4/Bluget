const Budgets = require("../models/Budgets.js");

const getBudgets = async (req, res) => {
	let doc = await Budgets.findOne({ userId: req.user.id });
	if (!doc) {
		doc = await Budgets.create({ userId: req.user.id, budgets: [] });
	}
	res.json(doc.budgets);
};

const addBudget = async (req, res) => {
	const { name } = req.body;
	let doc = await Budgets.findOne({ userId: req.user.id });
	if (!doc) doc = await Budgets.create({ userId: req.user.id, budgets: [] });
	if (doc.budgets.includes(name)) {
		return res.status(400).json({ error: "Budget already exists" });
	}
	doc.budgets.push(name);
	await doc.save();
	res.json(doc.budgets);
};

const updateBudget = async (req, res) => {
	const updatedTx = await Budgets.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);
	if (!updatedTx) return res.status(404).send("Budget not found");
	res.json(updatedTx);
};

const deleteBudget = async (req, res) => {
	const name = req.params.name;
	const doc = await Budgets.findOne({ userId: req.user.id });
	if (!doc) return res.status(404).json({ error: "No budgets found" });
	doc.budgets = doc.budgets.filter((c) => c !== name);
	await doc.save();
	res.json(doc.budgets);
};

module.exports = {
	getBudgets,
	addBudget,
	updateBudget,
	deleteBudget,
};

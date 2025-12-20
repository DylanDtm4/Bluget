const Budgets = require("../models/Budgets.js");

const getBudgets = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, custom, sort, page = 1, limit = 10 } = req.query;
		if (page < 1 || limit < 1) {
			return res
				.status(400)
				.json({ error: "Page and limit must be positive integers" });
		}

		const query = { userId };

		// search=food or search=foo
		if (search) {
			query.note = { $regex: search, $options: "i" };
		}

		// custom=true or custom=false
		if (custom === "true" || custom === "false") {
			query.custom = custom === "true";
		}

		// sort=amount or sort=-amount
		const sortObj = {};
		if (sort) {
			const field = sort.startsWith("-") ? sort.slice(1) : sort;
			sortObj[field] = sort.startsWith("-") ? -1 : 1;
		}

		const budgets = await Budget.find(query)
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await Budget.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		res.json({
			budgets,
			page,
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
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

const addBudgets = async (req, res) => {
	const { names } = req.body;
	if (!Array.isArray(names) || names.length === 0) {
		return res.status(400).json({ error: "Provide an array of budget names" });
	}
	let doc = await Budgets.findOne({ userId: req.user.id });
	if (!doc) doc = await Budgets.create({ userId: req.user.id, budgets: [] });
	const newBudgets = names.filter((name) => !doc.budgets.includes(name));
	if (newBudgets.length === 0) {
		return res.status(400).json({ error: "All budgets already exist" });
	}
	doc.budgets.push(...newBudgets);
	await doc.save();
	res.json({ added: newBudgets, allBudgets: doc.budgets });
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
	addBudgets,
	updateBudget,
	deleteBudget,
};

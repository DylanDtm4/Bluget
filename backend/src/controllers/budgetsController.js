const Budgets = require("../models/Budget.js");

const getBudgets = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, sort, page = 1, limit = 10 } = req.query;
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
	const { category, month, year } = req.body;

	if (!category || !month || !year) {
		return res
			.status(400)
			.json({ error: "category, month, and year are required" });
	}

	// Check if a budget already exists for this user + category + month + year
	const existing = await Budget.findOne({
		userId: req.user.id,
		category,
		month,
		year,
	});

	if (existing) {
		return res
			.status(400)
			.json({ error: "Budget already exists for this category and month" });
	}

	// Create new budget
	const budget = await Budget.create({
		userId: req.user.id,
		...req.body,
	});

	res.json(budget);
};

const addBudgets = async (req, res) => {
	const budgets = req.body;

	if (!Array.isArray(budgets) || Budget.length === 0) {
		return res.status(400).json({ error: "Provide an json of budget objects" });
	}

	const added = [];
	const skipped = [];

	for (const b of budgets) {
		const { category, month, year } = b;
		if (!category || !month || !year) {
			skipped.push({ ...b, reason: "Missing category, month, or year" });
			continue;
		}

		// Check for duplicate
		const exists = await Budget.findOne({
			userId: req.user.id,
			category,
			month,
			year,
		});

		if (exists) {
			skipped.push({ ...b, reason: "Duplicate budget" });
			continue;
		}

		// Create new budget
		const newBudget = await Budget.create({ userId: req.user.id, ...b });
		added.push(newBudget);
	}
	res.json({ added, skipped });
};

const updateBudget = async (req, res) => {
	const { category, month, year } = req.body;

	// Check if the update would create a duplicate
	const existing = await Budget.findOne({
		userId: req.user.id,
		category,
		month,
		year,
		_id: { $ne: req.params.id }, // <-- ignore the budget we are updating
	});

	if (existing) {
		return res
			.status(400)
			.json({ error: "A budget for this category and month already exists" });
	}

	// Perform the update
	const updatedBudget = await Budget.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);

	if (!updatedBudget)
		return res.status(404).json({ error: "Budget not found" });

	res.json(updatedBudget);
};

const deleteBudget = async (req, res) => {
	const deleted = await Budget.findOneAndDelete({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!deleted) return res.status(404).send("Budget not found");
	res.json({ message: "Budget deleted" });
};

const clearBudgets = async (req, res) => {
	await Budget.deleteMany({ userId: req.user.id });
	res.json({ message: "All your budgets have been cleared" });
};

module.exports = {
	getBudgets,
	addBudget,
	addBudgets,
	updateBudget,
	deleteBudget,
	clearBudgets,
};

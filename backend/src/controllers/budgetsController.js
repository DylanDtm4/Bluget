const Budget = require("../models/Budget.js");

const getBudgets = async (req, res) => {
	try {
		const userId = req.user.id;
		const { search, sort, page = 1, limit = 10 } = req.query;

		if (page < 1 || limit < 1)
			return res.status(400).json({ error: "Page and limit must be positive integers" });

		const query = { userId };
		if (search) query.category = { $regex: search, $options: "i" };

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

		res.json({ budgets, page: Number(page), totalCount, totalPages: Math.ceil(totalCount / limit) });
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const getBudget = async (req, res) => {
	try {
		const budget = await Budget.findOne({ _id: req.params.id, userId: req.user.id });
		if (!budget) return res.status(404).json({ error: "Budget not found" });
		res.json(budget);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

// Returns all budgets effective for a given month/year:
// month-specific budgets + recurring budgets that have no month-specific override for that category.
const getBudgetsForMonth = async (req, res) => {
	try {
		const userId = req.user.id;
		const { month, year } = req.query;
		if (!month || !year)
			return res.status(400).json({ error: "month and year are required" });

		const monthNum = Number(month);
		const yearNum = Number(year);

		// All budgets for this user
		const all = await Budget.find({ userId });

		// Month-specific ones for this month
		const specific = all.filter((b) => !b.recurring && b.month === monthNum && b.year === yearNum);
		const specificCategories = new Set(specific.map((b) => b.category));

		// Recurring ones that aren't overridden this month
		const recurringFallback = all.filter(
			(b) => b.recurring && !specificCategories.has(b.category)
		);

		res.json({ budgets: [...specific, ...recurringFallback] });
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const addBudget = async (req, res) => {
	try {
		const { category, month, year, recurring } = req.body;

		if (!category) return res.status(400).json({ error: "category is required" });
		if (!recurring && (!month || !year))
			return res.status(400).json({ error: "month and year are required for non-recurring budgets" });

		// Duplicate check
		const dupQuery = { userId: req.user.id, category };
		if (recurring) {
			dupQuery.recurring = true;
		} else {
			dupQuery.month = month;
			dupQuery.year = year;
			dupQuery.recurring = { $ne: true };
		}
		const existing = await Budget.findOne(dupQuery);
		if (existing)
			return res.status(400).json({ error: "A budget for this category already exists for that period" });

		const budget = await Budget.create({
			userId: req.user.id,
			category,
			amount: req.body.amount,
			month: recurring ? null : month,
			year: recurring ? null : year,
			note: req.body.note,
			recurring: !!recurring,
		});

		res.json(budget);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const addBudgets = async (req, res) => {
	const budgets = req.body;
	if (!Array.isArray(budgets) || budgets.length === 0)
		return res.status(400).json({ error: "Provide an array of budget objects" });

	const added = [];
	const skipped = [];

	for (const b of budgets) {
		const { category, month, year, recurring } = b;
		if (!category || (!recurring && (!month || !year))) {
			skipped.push({ ...b, reason: "Missing required fields" });
			continue;
		}
		const dupQuery = { userId: req.user.id, category };
		if (recurring) { dupQuery.recurring = true; }
		else { dupQuery.month = month; dupQuery.year = year; dupQuery.recurring = { $ne: true }; }
		const exists = await Budget.findOne(dupQuery);
		if (exists) { skipped.push({ ...b, reason: "Duplicate budget" }); continue; }
		const newBudget = await Budget.create({
			userId: req.user.id,
			category,
			amount: b.amount,
			month: recurring ? null : month,
			year: recurring ? null : year,
			note: b.note,
			recurring: !!recurring,
		});
		added.push(newBudget);
	}
	res.json({ added, skipped });
};

const updateBudget = async (req, res) => {
	try {
		const { category, month, year, recurring } = req.body;

		// Duplicate check (exclude self)
		const dupQuery = { userId: req.user.id, category, _id: { $ne: req.params.id } };
		if (recurring) { dupQuery.recurring = true; }
		else { dupQuery.month = month; dupQuery.year = year; dupQuery.recurring = { $ne: true }; }
		const existing = await Budget.findOne(dupQuery);
		if (existing)
			return res.status(400).json({ error: "A budget for this category already exists for that period" });

		const updatedBudget = await Budget.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			{
				category,
				amount: req.body.amount,
				month: recurring ? null : month,
				year: recurring ? null : year,
				note: req.body.note,
				recurring: !!recurring,
			},
			{ new: true }
		);

		if (!updatedBudget) return res.status(404).json({ error: "Budget not found" });
		res.json(updatedBudget);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteBudget = async (req, res) => {
	try {
		const deleted = await Budget.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
		if (!deleted) return res.status(404).send("Budget not found");
		res.json({ message: "Budget deleted" });
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const clearBudgets = async (req, res) => {
	try {
		await Budget.deleteMany({ userId: req.user.id });
		res.json({ message: "All your budgets have been cleared" });
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = { getBudgets, getBudget, getBudgetsForMonth, addBudget, addBudgets, updateBudget, deleteBudget, clearBudgets };

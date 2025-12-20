const RecurringTransaction = require("../models/RecurringTransaction");
const createRecurringTransaction = async (req, res) => {
	const tx = await RecurringTransaction.create({
		...req.body,
		userId: req.user.id,
	});
	res.json(tx);
};

// for testing purposes
const createRecurringTransactions = async (req, res) => {
	const recurringTransactionsWithUser = req.body.map((tx) => ({
		...tx,
		userId: req.user.id,
	}));

	const saved = await RecurringTransaction.insertMany(
		recurringTransactionsWithUser
	);
	res.json(saved);
};

const getRecurringTransactions = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, sort, type, frequency, page = 1, limit = 10 } = req.query;
		if (page < 1 || limit < 1) {
			return res
				.status(400)
				.json({ error: "Page and limit must be positive integers" });
		}

		const query = { userId };
		// type=income or type=expense
		if (type) {
			query.type = type;
		}

		// frequency=daily or frequency=weekly
		if (frequency) {
			query.frequency = frequency;
		}

		// search=rent or search=ren
		if (search) {
			query.note = { $regex: search, $options: "i" };
		}

		// sort=amount or sort=-amount
		const sortObj = {};
		if (sort) {
			const field = sort.startsWith("-") ? sort.slice(1) : sort;
			sortObj[field] = sort.startsWith("-") ? -1 : 1;
		}

		const recurringTransactions = await RecurringTransaction.find(query)
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await RecurringTransaction.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		res.json({
			recurringTransactions,
			page,
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const updateRecurringTransaction = async (req, res) => {
	const updatedTx = await RecurringTransaction.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);
	if (!updatedTx)
		return res.status(404).send("Recurring Transaction not found");
	res.json(updatedTx);
};

const deleteRecurringTransaction = async (req, res) => {
	const deleted = await RecurringTransaction.findOneAndDelete({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!deleted) return res.status(404).send("Recurring Transaction not found");
	res.json({ message: "Recurring Transaction deleted" });
};

const clearRecurringTransactions = async (req, res) => {
	await RecurringTransaction.deleteMany({ userId: req.user.id });
	res.json({ message: "All your recurring transactions have been cleared" });
};

module.exports = {
	createRecurringTransaction,
	createRecurringTransactions,
	getRecurringTransactions,
	updateRecurringTransaction,
	deleteRecurringTransaction,
	clearRecurringTransactions,
};

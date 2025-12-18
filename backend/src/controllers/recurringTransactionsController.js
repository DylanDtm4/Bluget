const RecurringTransaction = require("../models/RecurringTransaction");
const createRecurringTransaction = async (req, res) => {
	const tx = await RecurringTransaction.create({
		...req.body,
		userId: req.user.id,
	});
	res.json(tx);
};

const getRecurringTransactions = async (req, res) => {
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

		// search=rent or search=ren
		if (search) {
			query.title = { $regex: search, $options: "i" };
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

		res.json(recurringTransactions);
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

module.exports = {
	createRecurringTransaction,
	getRecurringTransactions,
	updateRecurringTransaction,
	deleteRecurringTransaction,
};

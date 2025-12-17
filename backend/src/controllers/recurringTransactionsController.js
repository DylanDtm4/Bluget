import RecurringTransaction from "../models/RecurringTransaction.js";

export const createRecurringTransaction = async (req, res) => {
	const tx = await RecurringTransaction.create({
		...req.body,
		userId: req.user.id,
	});
	res.json(tx);
};

export const getRecurringTransactions = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, sort, page = 1, limit = 10 } = req.query;

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

export const updateRecurringTransaction = async (req, res) => {
	const updatedTx = await RecurringTransaction.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);
	if (!updatedTx)
		return res.status(404).send("Recurring Transaction not found");
	res.json(updatedTx);
};

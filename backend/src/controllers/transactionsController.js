// Basic CRUD operations for transactions
const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
	const tx = await Transaction.create({ ...req.body, userId: req.user.id });
	res.json(tx);
};

// for testing purposes
const createTransactions = async (req, res) => {
	const transactionsWithUser = req.body.map((tx) => ({
		...tx,
		userId: req.user.id,
	}));

	const saved = await Transaction.insertMany(transactionsWithUser);
	res.json(saved);
};

const getTransactions = async (req, res) => {
	try {
		const userId = req.user.id;
		const {
			search,
			category,
			type,
			min = 0,
			max,
			startDate,
			endDate = new Date(),
			sort,
			page = 1,
			limit = 10,
		} = req.query;

		if (page < 1 || limit < 1) {
			return res
				.status(400)
				.json({ error: "Page and limit must be positive integers" });
		}

		if (min < 0 || max < min) {
			return res.status(400).json({
				error:
					"Min must be a positive number and max must be greater than or equal to min",
			});
		}

		if (startDate && new Date(startDate) > endDate) {
			return res
				.status(400)
				.json({ error: "Start date must be before or equal to end date" });
		}

		const query = { userId };

		// search=coffee or search=cof
		if (search) {
			query.note = { $regex: search, $options: "i" };
		}

		// category=Food&type=expense
		if (category) query.category = { $regex: category, $options: "i" };
		if (type) query.type = { $regex: type, $options: "i" };

		// min=10&max=100
		if (min || max) {
			query.amount = {};
			if (min) query.amount.$gte = Number(min);
			if (max) query.amount.$lte = Number(max);
		}

		// startDate=2025-01-01&endDate=2025-01-31
		if (startDate && endDate) {
			query.date = {};
			if (startDate) query.date.$gte = new Date(startDate);
			if (endDate) query.date.$lte = new Date(endDate);
		}

		// sort=-date or sort=date
		const sortObj = {};
		if (sort) {
			const field = sort.startsWith("-") ? sort.slice(1) : sort;
			sortObj[field] = sort.startsWith("-") ? -1 : 1;
		}

		const transactions = await Transaction.find(query)
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await Transaction.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		res.json({
			transactions,
			page,
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const getTransaction = async (req, res) => {
	const tx = await Transaction.findOne({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!tx) return res.status(404).send("Transaction not found");
	res.json(tx);
};

const updateTransaction = async (req, res) => {
	const updatedTx = await Transaction.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);
	if (!updatedTx) return res.status(404).send("Transaction not found");
	res.json(updatedTx);
};

const deleteTransaction = async (req, res) => {
	const deleted = await Transaction.findOneAndDelete({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!deleted) return res.status(404).send("Transaction not found");
	res.json({ message: "Transaction deleted" });
};

const clearTransactions = async (req, res) => {
	await Transaction.deleteMany({ userId: req.user.id });
	res.json({ message: "All your transactions have been cleared" });
};

module.exports = {
	createTransaction,
	createTransactions,
	getTransactions,
	getTransaction,
	updateTransaction,
	deleteTransaction,
	clearTransactions,
};

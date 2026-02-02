// Basic CRUD operations for transactions
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

const createTransaction = async (req, res) => {
	try {
		const { category, ...rest } = req.body;

		const categoryDoc = await Category.findOne({
			userId: req.user.id,
			name: category,
		});

		if (!categoryDoc) {
			return res.status(404).json({ error: "Category not found" });
		}

		const tx = await Transaction.create({
			...rest,
			userId: req.user.id,
			category: categoryDoc._id,
		});

		// Populate and format response
		await tx.populate("category");
		const formatted = {
			...tx.toObject(),
			category: tx.category?.name,
			categoryColor: tx.category?.color,
			categoryIcon: tx.category?.icon,
		};

		res.json(formatted);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// for testing purposes
const createTransactions = async (req, res) => {
	try {
		// Extract all unique category names from the batch
		const categoryNames = [...new Set(req.body.map((tx) => tx.category))];

		// Fetch all matching categories in one query
		const categories = await Category.find({
			userId: req.user.id,
			name: { $in: categoryNames },
		});

		// Create a map for quick lookup: categoryName -> categoryId
		const categoryMap = {};
		categories.forEach((cat) => {
			categoryMap[cat.name] = cat._id;
		});

		// Validate all categories exist
		const missingCategories = categoryNames.filter(
			(name) => !categoryMap[name],
		);
		if (missingCategories.length > 0) {
			return res.status(400).json({
				error: `Categories not found: ${missingCategories.join(", ")}`,
			});
		}

		// Transform transactions with userId and category references
		const transactionsWithUser = req.body.map((tx) => {
			const { category, ...rest } = tx;
			return {
				...rest,
				userId: req.user.id,
				category: categoryMap[category],
			};
		});

		const saved = await Transaction.insertMany(transactionsWithUser);
		res.json(saved);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
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

		// category filter - need to lookup by name
		if (category) {
			const categoryDoc = await Category.findOne({
				userId,
				name: { $regex: category, $options: "i" },
			});
			if (categoryDoc) {
				query.category = categoryDoc._id;
			} else {
				// No matching category, return empty results
				return res.json({
					transactions: [],
					page,
					totalCount: 0,
					totalPages: 0,
				});
			}
		}

		if (type) query.transactionType = type;

		// min=10&max=100
		if (min || max) {
			query.amount = {};
			if (min) query.amount.$gte = Number(min);
			if (max) query.amount.$lte = Number(max);
		}

		// startDate=2025-01-01&endDate=2025-01-31
		if (startDate || endDate) {
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
			.populate("category")
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await Transaction.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		// Format transactions for frontend
		const formatted = transactions.map((tx) => ({
			...tx.toObject(),
			category: tx.category?.name,
			categoryColor: tx.category?.color,
			categoryIcon: tx.category?.icon,
		}));

		res.json({
			transactions: formatted,
			page: Number(page),
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const getTransaction = async (req, res) => {
	try {
		const tx = await Transaction.findOne({
			_id: req.params.id,
			userId: req.user.id,
		}).populate("category");

		if (!tx) return res.status(404).send("Transaction not found");

		// Format for frontend
		const formatted = {
			...tx.toObject(),
			category: tx.category?.name,
			categoryColor: tx.category?.color,
			categoryIcon: tx.category?.icon,
		};

		res.json(formatted);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const updateTransaction = async (req, res) => {
	try {
		const { category, ...rest } = req.body;
		const updateData = { ...rest };

		// If category is being updated, lookup the category ID
		if (category) {
			const categoryDoc = await Category.findOne({
				userId: req.user.id,
				name: category,
			});
			if (!categoryDoc) {
				return res.status(404).json({ error: "Category not found" });
			}
			updateData.category = categoryDoc._id;
		}

		const updatedTx = await Transaction.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			updateData,
			{ new: true },
		).populate("category");

		if (!updatedTx) return res.status(404).send("Transaction not found");

		// Format for frontend
		const formatted = {
			...updatedTx.toObject(),
			category: updatedTx.category?.name,
			categoryColor: updatedTx.category?.color,
			categoryIcon: updatedTx.category?.icon,
		};

		res.json(formatted);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteTransaction = async (req, res) => {
	try {
		const deleted = await Transaction.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.id,
		});
		if (!deleted) return res.status(404).send("Transaction not found");
		res.json({ message: "Transaction deleted" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const clearTransactions = async (req, res) => {
	try {
		await Transaction.deleteMany({ userId: req.user.id });
		res.json({ message: "All your transactions have been cleared" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
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

const RecurringTransaction = require("../models/RecurringTransaction");
const Category = require("../models/Category");

const createRecurringTransaction = async (req, res) => {
	try {
		const { category, ...rest } = req.body;

		// Lookup category if provided
		let categoryId = null;
		if (category) {
			const categoryDoc = await Category.findOne({
				userId: req.user.id,
				name: category,
			});
			if (!categoryDoc) {
				return res.status(404).json({ error: "Category not found" });
			}
			categoryId = categoryDoc._id;
		}

		const tx = await RecurringTransaction.create({
			...rest,
			userId: req.user.id,
			category: categoryId,
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
const createRecurringTransactions = async (req, res) => {
	try {
		// Extract all unique category names from the batch
		const categoryNames = [
			...new Set(req.body.map((tx) => tx.category).filter(Boolean)),
		];

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
		const recurringTransactionsWithUser = req.body.map((tx) => {
			const { category, ...rest } = tx;
			return {
				...rest,
				userId: req.user.id,
				category: category ? categoryMap[category] : null,
			};
		});

		const saved = await RecurringTransaction.insertMany(
			recurringTransactionsWithUser,
		);
		res.json(saved);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getRecurringTransactions = async (req, res) => {
	try {
		const userId = req.user.id;
		const {
			search,
			sort,
			type,
			frequency,
			category,
			page = 1,
			limit = 10,
		} = req.query;

		if (page < 1 || limit < 1) {
			return res
				.status(400)
				.json({ error: "Page and limit must be positive integers" });
		}

		const query = { userId };

		// type=income or type=expense
		if (type) {
			query.transactionType = type;
		}

		// frequency=daily or frequency=weekly
		if (frequency) {
			query.frequency = frequency;
		}

		// category filter - lookup by name
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
					recurringTransactions: [],
					page: Number(page),
					totalCount: 0,
					totalPages: 0,
				});
			}
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
			.populate("category")
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await RecurringTransaction.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		// Format for frontend
		const formatted = recurringTransactions.map((tx) => ({
			...tx.toObject(),
			category: tx.category?.name,
			categoryColor: tx.category?.color,
			categoryIcon: tx.category?.icon,
		}));

		res.json({
			recurringTransactions: formatted,
			page: Number(page),
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const updateRecurringTransaction = async (req, res) => {
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

		const updatedTx = await RecurringTransaction.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			updateData,
			{ new: true },
		).populate("category");

		if (!updatedTx)
			return res.status(404).send("Recurring Transaction not found");

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

const deleteRecurringTransaction = async (req, res) => {
	try {
		const deleted = await RecurringTransaction.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.id,
		});
		if (!deleted)
			return res.status(404).send("Recurring Transaction not found");
		res.json({ message: "Recurring Transaction deleted" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const clearRecurringTransactions = async (req, res) => {
	try {
		await RecurringTransaction.deleteMany({ userId: req.user.id });
		res.json({ message: "All your recurring transactions have been cleared" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = {
	createRecurringTransaction,
	createRecurringTransactions,
	getRecurringTransactions,
	updateRecurringTransaction,
	deleteRecurringTransaction,
	clearRecurringTransactions,
};

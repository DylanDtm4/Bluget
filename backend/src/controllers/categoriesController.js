const Category = require("../models/Category");

const getCategories = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, color, sort, page = 1, limit = 10 } = req.query;
		if (page < 1 || limit < 1) {
			return res
				.status(400)
				.json({ error: "Page and limit must be positive integers" });
		}

		const query = { userId };

		// search=food or search=foo
		if (search) {
			query.title = { $regex: search, $options: "i" };
		}

		// color=red or color=blue or color=#ff0000
		if (color) {
			query.color = color;
		}

		// sort=desc or sort=asc
		const sortObj = {};
		if (sort) {
			sortObj[category] = sort.startsWith("desc") ? -1 : 1;
		}

		const categories = await Category.find(query)
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await Category.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		res.json({
			categories,
			page,
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const addCategory = async (req, res) => {
	const { category } = req.body;

	if (!category) {
		return res.status(400).json({ error: "category is required" });
	}

	// Check if a category already exists for this user
	const existing = await Category.findOne({
		userId: req.user.id,
		category,
	});

	if (existing) {
		return res
			.status(400)
			.json({ error: "Category already exists for this user" });
	}

	// Create new category
	const newCategory = await Category.create({
		userId: req.user.id,
		...req.body,
	});

	res.json(newCategory);
};

const addCategories = async (req, res) => {
	const categories = req.body;

	if (!Array.isArray(categories) || categories.length === 0) {
		return res
			.status(400)
			.json({ error: "Provide an json of category objects" });
	}

	const added = [];
	const skipped = [];

	for (const c of categories) {
		const { category } = c;
		if (!category) {
			skipped.push({ ...c, reason: "Missing category" });
			continue;
		}

		// Check for duplicate
		const exists = await Category.findOne({
			userId: req.user.id,
			category,
		});

		if (exists) {
			skipped.push({ ...c, reason: "Duplicate category" });
			continue;
		}

		// Create new category
		const newCategory = await Category.create({ userId: req.user.id, ...c });
		added.push(newCategory);
	}
	res.json({ added, skipped });
};

const updateCategory = async (req, res) => {
	const { category } = req.body;

	// Check if the update would create a duplicate
	const existing = await Category.findOne({
		userId: req.user.id,
		category,
		_id: { $ne: req.params.id }, // <-- ignore the category we are updating
	});

	if (existing) {
		return res
			.status(400)
			.json({ error: "A category with this name already exists" });
	}

	// Perform the update
	const updatedCategory = await Category.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);

	if (!updatedCategory)
		return res.status(404).json({ error: "Category not found" });

	res.json(updatedCategory);
};

const deleteCategory = async (req, res) => {
	const deleted = await Category.findOneAndDelete({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!deleted) return res.status(404).send("Category not found");
	res.json({ message: "Category deleted" });
};

const clearCategories = async (req, res) => {
	await Category.deleteMany({ userId: req.user.id });
	res.json({ message: "All your categories have been cleared" });
};

module.exports = {
	getCategories,
	addCategory,
	addCategories,
	updateCategory,
	deleteCategory,
	clearCategories,
};

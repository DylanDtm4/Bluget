const Category = require("../models/Category");

const getCategories = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, color, icon, sort, page = 1, limit = 10 } = req.query;

		if (page < 1 || limit < 1) {
			return res
				.status(400)
				.json({ error: "Page and limit must be positive integers" });
		}

		const query = { userId };

		// search=food or search=foo
		if (search) {
			query.name = { $regex: search, $options: "i" };
		}

		// color=red or color=blue or color=#ff0000
		if (color) {
			query.color = color;
		}

		// icon=shopping-cart
		if (icon) {
			query.icon = icon;
		}

		// sort=desc or sort=asc
		const sortObj = {};
		if (sort) {
			sortObj.name = sort.startsWith("desc") ? -1 : 1;
		}

		const categories = await Category.find(query)
			.sort(sortObj)
			.skip((page - 1) * limit)
			.limit(Number(limit));

		const totalCount = await Category.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		res.json({
			categories,
			page: Number(page),
			totalCount,
			totalPages,
		});
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

const addCategory = async (req, res) => {
	try {
		const { name, color, icon } = req.body;

		if (!name) {
			return res.status(400).json({ error: "name is required" });
		}

		// Check if a category already exists for this user
		const existing = await Category.findOne({
			userId: req.user.id,
			name,
		});

		if (existing) {
			return res
				.status(400)
				.json({ error: "Category already exists for this user" });
		}

		// Create new category
		const newCategory = await Category.create({
			userId: req.user.id,
			name,
			color,
			icon,
		});

		res.json(newCategory);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const addCategories = async (req, res) => {
	try {
		const categories = req.body;

		if (!Array.isArray(categories) || categories.length === 0) {
			return res
				.status(400)
				.json({ error: "Provide an array of category objects" });
		}

		const added = [];
		const skipped = [];

		for (const c of categories) {
			const { name, color, icon } = c;

			if (!name) {
				skipped.push({ ...c, reason: "Missing name" });
				continue;
			}

			// Check for duplicate
			const exists = await Category.findOne({
				userId: req.user.id,
				name,
			});

			if (exists) {
				skipped.push({ ...c, reason: "Duplicate category" });
				continue;
			}

			// Create new category
			const newCategory = await Category.create({
				userId: req.user.id,
				name,
				color,
				icon,
			});
			added.push(newCategory);
		}

		res.json({ added, skipped });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateCategory = async (req, res) => {
	try {
		const { name, color, icon } = req.body;

		// Check if the update would create a duplicate
		if (name) {
			const existing = await Category.findOne({
				userId: req.user.id,
				name,
				_id: { $ne: req.params.id },
			});

			if (existing) {
				return res
					.status(400)
					.json({ error: "A category with this name already exists" });
			}
		}

		// Build update object
		const updateData = {};
		if (name) updateData.name = name;
		if (color !== undefined) updateData.color = color;
		if (icon !== undefined) updateData.icon = icon;

		// Perform the update
		const updatedCategory = await Category.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			updateData,
			{ new: true },
		);

		if (!updatedCategory)
			return res.status(404).json({ error: "Category not found" });

		res.json(updatedCategory);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteCategory = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.id,
		});
		if (!deleted) return res.status(404).send("Category not found");
		res.json({ message: "Category deleted" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const clearCategories = async (req, res) => {
	try {
		await Category.deleteMany({ userId: req.user.id });
		res.json({ message: "All your categories have been cleared" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = {
	getCategories,
	addCategory,
	addCategories,
	updateCategory,
	deleteCategory,
	clearCategories,
};

const Category = require("../models/Category");

const getCategories = async (req, res) => {
	try {
		const userId = req.user.id;
		// page=2&limit=10
		const { search, custom, sort, page = 1, limit = 10 } = req.query;
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

		// custom=true or custom=false
		if (custom) query.custom = custom;

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
	const { name } = req.body;
	let doc = await Categories.findOne({ userId: req.user.id });
	if (!doc)
		doc = await Categories.create({ userId: req.user.id, categories: [] });
	if (doc.categories.includes(name)) {
		return res.status(400).json({ error: "Category already exists" });
	}
	doc.categories.push(name);
	await doc.save();
	res.json(doc.categories);
};

const renameCategory = async (req, res) => {
	const oldName = req.params.name;
	const { newName } = req.body;
	const doc = await Categories.findOne({ userId: req.user.id });
	if (!doc) return res.status(404).json({ error: "No categories found" });
	const index = doc.categories.indexOf(oldName);
	if (index === -1)
		return res.status(404).json({ error: "Category not found" });
	doc.categories[index] = newName;
	await doc.save();
	res.json(doc.categories);
};

const deleteCategory = async (req, res) => {
	const name = req.params.name;
	const doc = await Categories.findOne({ userId: req.user.id });
	if (!doc) return res.status(404).json({ error: "No categories found" });
	doc.categories = doc.categories.filter((c) => c !== name);
	await doc.save();
	res.json(doc.categories);
};

module.exports = {
	getCategories,
	addCategory,
	renameCategory,
	deleteCategory,
};

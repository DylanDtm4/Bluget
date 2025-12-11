import Categories from "../models/Categories.js";

export const getCategories = async (req, res) => {
	let doc = await Categories.findOne({ userId: req.user.id });
	if (!doc) {
		doc = await Categories.create({ userId: req.user.id, categories: [] });
	}
	res.json(doc.categories);
};

export const addCategory = async (req, res) => {
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

export const renameCategory = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
	const name = req.params.name;
	const doc = await Categories.findOne({ userId: req.user.id });
	if (!doc) return res.status(404).json({ error: "No categories found" });
	doc.categories = doc.categories.filter((c) => c !== name);
	await doc.save();
	res.json(doc.categories);
};

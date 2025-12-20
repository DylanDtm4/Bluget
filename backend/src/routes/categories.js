const auth = require("../middleware/auth");
const {
	getCategories,
	addCategory,
	addCategories,
	updateCategory,
	deleteCategory,
	clearCategories,
} = require("../controllers/categoriesController.js");
const express = require("express");
const router = express.Router();

// GET /categories
router.get("/", auth, getCategories);
// POST /categories
router.post("/", auth, addCategory);
// POST /categories/bulk
router.post("/bulk", auth, addCategories);
// PUT /categories/:name
router.put("/:name", auth, updateCategory);
// DELETE /categories/:name
router.delete("/:name", auth, deleteCategory);
// DELETE /categories
router.delete("/", auth, clearCategories);

module.exports = router;

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	userId: String,
	amount: Number,
	transactionType: {
		type: String,
		enum: ["expense", "income", "investment", "savings"],
	},
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	date: Date,
	note: String,
});
module.exports = mongoose.model("Transaction", TransactionSchema);

/* Example of populating category details:
const transaction = await Transaction.findById(id) 
  .populate('category');

// Access directly
const icon = transaction.category.icon;
const color = transaction.category.color;
*/

// NEED TO RENAME mainCategory -> transactionType and secondaryCategory -> category

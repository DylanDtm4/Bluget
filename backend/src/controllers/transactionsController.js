// Basic CRUD operations for transactions
import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
	const tx = await Transaction.create({ ...req.body, userId: req.user.id });
	res.json(tx);
};

export const getTransactions = async (req, res) => {
	const tx = await Transaction.find({ userId: req.user.id });
	res.json(tx);
};

export const getTransaction = async (req, res) => {
	const tx = await Transaction.findOne({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!tx) return res.status(404).send("Transaction not found");
	res.json(tx);
};

export const updateTransaction = async (req, res) => {
	const updatedTx = await Transaction.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ ...req.body },
		{ new: true }
	);
	if (!updatedTx) return res.status(404).send("Transaction not found");
	res.json(updatedTx);
};

export const deleteTransaction = async (req, res) => {
	const deleted = await Transaction.findOneAndDelete({
		_id: req.params.id,
		userId: req.user.id,
	});
	if (!deleted) return res.status(404).send("Transaction not found");
	res.json({ message: "Transaction deleted" });
};

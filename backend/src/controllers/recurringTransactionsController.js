import RecurringTransaction from "../models/RecurringTransaction.js";

export const createRecurringTransaction = async (req, res) => {
	const tx = await RecurringTransaction.create({
		...req.body,
		userId: req.user.id,
	});
	res.json(tx);
};

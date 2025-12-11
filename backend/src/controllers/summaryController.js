// GET /summary?month=2025-01
import Transaction from "../models/Transaction.js";

export const getMonthlySummary = async (req, res) => {
	try {
		const userId = req.user.id; // from JWT middleware
		const { month } = req.query; // "2025-01"

		if (!month) {
			return res
				.status(400)
				.json({ error: "Month is required (YYYY-MM format)" });
		}

		const [year, monthNum] = month.split("-").map(Number);

		// Get start and end dates of the month
		const startDate = new Date(year, monthNum - 1, 1);
		const endDate = new Date(year, monthNum, 1);

		const summary = await Transaction.aggregate([
			{
				$match: {
					userId,
					date: { $gte: startDate, $lt: endDate },
				},
			},

			{
				$facet: {
					totals: [
						{
							$group: {
								_id: "$type",
								total: { $sum: "$amount" },
							},
						},
					],
					categoryBreakdown: [
						{
							$group: {
								_id: "$category",
								total: { $sum: "$amount" },
							},
						},
					],
					biggestExpense: [
						{ $match: { type: "expense" } },
						{ $sort: { amount: -1 } },
						{ $limit: 1 },
					],
					topFiveExpenses: [
						{ $match: { type: "expense" } },
						{ $sort: { amount: -1 } },
						{ $limit: 5 },
					],
				},
			},
		]);

		const result = summary[0];

		// Convert totals array to income/expense/net
		let totalIncome = 0;
		let totalExpenses = 0;
		let totalInvestments = 0;
		let totalSavings = 0;

		result.totals.forEach((t) => {
			if (t._id === "income") totalIncome = t.total;
			else if (t._id === "expense") totalExpenses = t.total;
			else if (t._id === "investment") totalInvestments = t.total;
			else if (t._id === "saving") totalSavings = t.total;
		});

		res.json({
			month,
			totalIncome,
			totalExpenses,
			totalInvestments,
			totalSavings,
			net: totalIncome - totalExpenses - totalInvestments - totalSavings,
			categoryBreakdown: result.categoryBreakdown,
			biggestExpense: result.biggestExpense[0] || null,
			topFiveExpenses: result.topFiveExpenses,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate summary" });
	}
};

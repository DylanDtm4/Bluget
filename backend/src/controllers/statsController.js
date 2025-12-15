// GET /stats?year=2025
import Transaction from "../models/Transaction.js";

export const getYearlyStats = async (req, res) => {
	try {
		const userId = req.user.id; // from JWT middleware
		const { year } = req.query; // "2025"

		if (!year) {
			return res.status(400).json({ error: "Year is required (YYYY format)" });
		}

		const yearNum = Number(year);

		// Get start and end dates of the year
		const startDate = new Date(yearNum, 0, 1);
		const endDate = new Date(yearNum + 1, 0, 1);

		const stats = await Transaction.aggregate([
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
					biggestSpendingCategory: [
						{ $match: { type: "expense" } },
						{
							$group: {
								_id: "$category",
								total: { $sum: "$amount" },
							},
						},
						{ $sort: { total: -1 } },
						{ $limit: 1 },
					],
					categoryBreakdown: [
						{
							$group: {
								_id: "$category",
								total: { $sum: "$amount" },
							},
						},
					],
				},
			},
		]);

		const result = stats[0];

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

		const netTotal =
			totalIncome - totalExpenses - totalInvestments - totalSavings;
		res.json({
			year: yearNum,
			totals: {
				income: totalIncome,
				expenses: totalExpenses,
				investments: totalInvestments,
				savings: totalSavings,
			},
			netTotal,
			biggestSpendingCategory: result.biggestSpendingCategory[0] || null,
			categoryBreakdown: result.categoryBreakdown,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate summary" });
	}
};

export const getMonthlyTrends = async (req, res) => {
	try {
		const userId = req.user.id; // from JWT middleware
		const { year } = req.query; // "2025"
		if (!year) {
			return res.status(400).json({ error: "Year is required (YYYY format)" });
		}
		const yearNum = Number(year);
		const startDate = new Date(yearNum, 0, 1);
		const endDate = new Date(yearNum + 1, 0, 1);
		const trends = await Transaction.aggregate([
			{
				$match: {
					userId,
					date: { $gte: startDate, $lt: endDate },
				},
			},
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m", date: "$date" } },
					totalEarned: {
						$sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
					},
					totalSpent: {
						$sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
					},
					totalInvested: {
						$sum: { $cond: [{ $eq: ["$type", "investment"] }, "$amount", 0] },
					},
					totalSaved: {
						$sum: { $cond: [{ $eq: ["$type", "saving"] }, "$amount", 0] },
					},
				},
			},
			{
				$addFields: {
					totalOutflow: {
						$add: ["$totalSpent", "$totalInvested", "$totalSaved"],
					},
					additionalFunds: {
						$subtract: [
							"$totalEarned",
							{ $add: ["$totalSpent", "$totalInvested", "$totalSaved"] },
						],
					},
				},
			},
			{
				$addFields: {
					spentPct: {
						$cond: [
							{ $eq: ["$totalEarned", 0] },
							0,
							{
								$multiply: [{ $divide: ["$totalSpent", "$totalEarned"] }, 100],
							},
						],
					},
					investedPct: {
						$cond: [
							{ $eq: ["$totalEarned", 0] },
							0,
							{
								$multiply: [
									{ $divide: ["$totalInvested", "$totalEarned"] },
									100,
								],
							},
						],
					},
					savedPct: {
						$cond: [
							{ $eq: ["$totalEarned", 0] },
							0,
							{
								$multiply: [{ $divide: ["$totalSaved", "$totalEarned"] }, 100],
							},
						],
					},
					additionalPct: {
						$cond: [
							{ $eq: ["$totalEarned", 0] },
							0,
							{
								$multiply: [
									{ $divide: ["$additionalFunds", "$totalEarned"] },
									100,
								],
							},
						],
					},
				},
			},
			{ $sort: { _id: 1 } },
		]);

		res.json(trends);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate spending trends" });
	}
};

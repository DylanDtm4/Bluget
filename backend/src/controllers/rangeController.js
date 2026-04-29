const Transaction = require("../models/Transaction");

// GET /months/range?start=YYYY-MM&end=YYYY-MM
const getRangeSummary = async (req, res) => {
	try {
		const userId = req.user.id;
		const { start, end } = req.query;

		if (!start || !end)
			return res.status(400).json({ error: "start and end are required (YYYY-MM)" });

		const [startYear, startMonth] = start.split("-").map(Number);
		const [endYear, endMonth] = end.split("-").map(Number);

		const startDate = new Date(startYear, startMonth - 1, 1);
		const endDate = new Date(endYear, endMonth, 1);

		// Build the ordered list of months in range
		const monthKeys = [];
		let y = startYear, m = startMonth;
		while (y < endYear || (y === endYear && m <= endMonth)) {
			monthKeys.push(`${y}-${String(m).padStart(2, "0")}`);
			m++;
			if (m > 12) { m = 1; y++; }
		}

		const result = await Transaction.aggregate([
			{ $match: { userId, date: { $gte: startDate, $lt: endDate } } },
			{
				$facet: {
					byMonth: [
						{
							$group: {
								_id: {
									year: { $year: "$date" },
									month: { $month: "$date" },
									type: "$transactionType",
								},
								total: { $sum: "$amount" },
							},
						},
					],
					byCategory: [
						{ $match: { transactionType: { $in: ["expense", "investment", "savings"] } } },
						{ $group: { _id: "$category", total: { $sum: "$amount" } } },
						{
							$lookup: {
								from: "categories",
								localField: "_id",
								foreignField: "_id",
								as: "info",
							},
						},
						{ $unwind: { path: "$info", preserveNullAndEmptyArrays: true } },
						{
							$project: {
								total: 1,
								name: { $ifNull: ["$info.name", "Uncategorized"] },
								color: { $ifNull: ["$info.color", "#9CA3AF"] },
								icon: { $ifNull: ["$info.icon", "other"] },
							},
						},
					],
					byType: [
						{ $group: { _id: "$transactionType", total: { $sum: "$amount" } } },
					],
				},
			},
		]);

		const data = result[0];

		// Build per-month map
		const monthMap = {};
		for (const key of monthKeys) {
			monthMap[key] = { month: key, totalIncome: 0, totalExpenses: 0, totalInvestments: 0, totalSavings: 0, net: 0 };
		}
		for (const item of data.byMonth) {
			const key = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
			if (!monthMap[key]) continue;
			if (item._id.type === "income") monthMap[key].totalIncome = item.total;
			else if (item._id.type === "expense") monthMap[key].totalExpenses = item.total;
			else if (item._id.type === "investment") monthMap[key].totalInvestments = item.total;
			else if (item._id.type === "savings") monthMap[key].totalSavings = item.total;
		}
		for (const key of Object.keys(monthMap)) {
			const mo = monthMap[key];
			mo.net = mo.totalIncome - mo.totalExpenses - mo.totalInvestments - mo.totalSavings;
		}

		// Totals across the whole range
		let totalIncome = 0, totalExpenses = 0, totalInvestments = 0, totalSavings = 0;
		for (const item of data.byType) {
			if (item._id === "income") totalIncome = item.total;
			else if (item._id === "expense") totalExpenses = item.total;
			else if (item._id === "investment") totalInvestments = item.total;
			else if (item._id === "savings") totalSavings = item.total;
		}

		res.json({
			months: monthKeys.map((k) => monthMap[k]),
			categoryBreakdown: data.byCategory,
			totals: {
				totalIncome,
				totalExpenses,
				totalInvestments,
				totalSavings,
				net: totalIncome - totalExpenses - totalInvestments - totalSavings,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate range summary" });
	}
};

module.exports = getRangeSummary;

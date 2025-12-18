const cron = require("node-cron");
const RecurringTransaction = require("./models/RecurringTransaction");
const Transaction = require("./models/Transaction");

cron.schedule("0 0 * * *", async () => {
	console.log("Running recurring transaction job...");

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const recurrences = await RecurringTransaction.find({
		nextRun: { $lte: today },
	});

	for (const rule of recurrences) {
		// 1. Create real transaction
		await Transaction.create({
			userId: rule.userId,
			amount: rule.amount,
			type: rule.type,
			category: rule.category,
			note: rule.note,
			date: today,
		});

		// 2. Update nextRun
		let next = new Date(rule.nextRun);

		if (rule.frequency === "daily") next.setDate(next.getDate() + 1);
		if (rule.frequency === "weekly") next.setDate(next.getDate() + 7);
		if (rule.frequency === "monthly") next.setMonth(next.getMonth() + 1);

		rule.nextRun = next;
		await rule.save();
	}

	console.log("Recurring transactions processed");
});

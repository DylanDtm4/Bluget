"use client";

import Chart from "@/components/charts/Chart";
import SummaryCard from "@/components/ui/SummaryCard";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
	// Summary metrics
	const currentBalance = 3250.75;
	const monthlyIncome = 5000.0;
	const monthlyExpenses = 2800.0;
	const netIncome = monthlyIncome - monthlyExpenses;
	const savingsRate = ((netIncome / monthlyIncome) * 100).toFixed(1);

	// Chart data
	const spendingByCategory = [
		{ name: "Groceries", value: 450 },
		{ name: "Rent", value: 1200 },
		{ name: "Entertainment", value: 200 },
		{ name: "Transportation", value: 150 },
		{ name: "Utilities", value: 300 },
		{ name: "Other", value: 500 },
	];

	const monthlyTrend = [
		{ name: "Jan", income: 4800, expenses: 2600 },
		{ name: "Feb", income: 5000, expenses: 2400 },
		{ name: "Mar", income: 5200, expenses: 2800 },
		{ name: "Apr", income: 5000, expenses: 3100 },
		{ name: "May", income: 5000, expenses: 2700 },
		{ name: "Jun", income: 5000, expenses: 2800 },
	];

	const budgetProgress = [
		{ name: "Groceries", value: 450, max: 600, color: "#82ca9d" },
		{ name: "Rent", value: 1200, max: 1200, color: "#ff7c7c" },
		{ name: "Entertainment", value: 200, max: 300, color: "#ffc658" },
		{ name: "Transportation", value: 150, max: 200, color: "#8884d8" },
	];

	// Recent transactions
	const recentTransactions = [
		{
			id: "1",
			title: "Grocery Store",
			data: {
				amount: 45.32,
				date: "2025-01-02",
				mainCategory: "Expense",
				secondaryCategory: "Groceries",
			},
		},
		{
			id: "2",
			title: "Paycheck",
			data: {
				amount: 2500.0,
				date: "2025-01-01",
				mainCategory: "Income",
				secondaryCategory: "Salary",
			},
		},
		{
			id: "3",
			title: "Gas Station",
			data: {
				amount: 35.0,
				date: "2024-12-31",
				mainCategory: "Expense",
				secondaryCategory: "Transportation",
			},
		},
	];

	// Upcoming bills
	const upcomingBills = [
		{
			id: "1",
			title: "Rent",
			data: {
				amount: 1200.0,
				frequency: "Monthly",
				nextRun: "2025-01-05",
				mainCategory: "Expense",
				secondaryCategory: "Housing",
				startDate: new Date("2024-01-01"),
			},
		},
		{
			id: "2",
			title: "Netflix",
			data: {
				amount: 15.99,
				frequency: "Monthly",
				nextRun: "2025-01-12",
				mainCategory: "Expense",
				secondaryCategory: "Entertainment",
				startDate: new Date("2024-01-01"),
			},
		},
	];

	return (
		<div
			style={{
				padding: "2rem",
				backgroundColor: "#f5f5f5",
				minHeight: "100vh",
			}}
		>
			<h1 style={{ marginBottom: "2rem" }}>Dashboard</h1>

			{/* Summary Cards Row */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
					gap: "1rem",
					marginBottom: "2rem",
				}}
			>
				<SummaryCard
					title="Current Balance"
					amount={currentBalance}
					color="#8884d8"
					subtitle="Available now"
				/>
				<SummaryCard
					title="Monthly Income"
					amount={monthlyIncome}
					color="#82ca9d"
					trend={{ value: 4.2, isPositive: true }}
				/>
				<SummaryCard
					title="Monthly Expenses"
					amount={monthlyExpenses}
					color="#ff7c7c"
					trend={{ value: 3.5, isPositive: false }}
				/>
				<SummaryCard
					title="Net Income"
					amount={netIncome}
					color={netIncome >= 0 ? "#82ca9d" : "#ff7c7c"}
					subtitle={`${savingsRate}% savings rate`}
				/>
			</div>

			{/* Charts Row */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
					gap: "1.5rem",
					marginBottom: "2rem",
				}}
			>
				<Chart
					title="Spending by Category"
					type="pie"
					data={spendingByCategory}
					dataKey="value"
					categoryKey="name"
				/>

				<Chart title="Budget Progress" type="progress" data={budgetProgress} />
			</div>

			{/* Bottom Row: Recent Transactions & Upcoming Bills */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
					gap: "1.5rem",
				}}
			>
				{/* Recent Transactions */}
				<div
					style={{
						backgroundColor: "white",
						borderRadius: "8px",
						padding: "1.5rem",
						border: "1px solid #ccc",
					}}
				>
					<h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
						Recent Transactions
					</h3>
					{recentTransactions.map((transaction) => (
						<Card
							key={transaction.id}
							id={transaction.id}
							title={transaction.title}
							data={transaction.data}
							type="transaction"
						/>
					))}
				</div>

				{/* Upcoming Bills */}
				<div
					style={{
						backgroundColor: "white",
						borderRadius: "8px",
						padding: "1.5rem",
						border: "1px solid #ccc",
					}}
				>
					<h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Upcoming Bills</h3>
					{upcomingBills.map((bill) => (
						<Card
							key={bill.id}
							id={bill.id}
							title={bill.title}
							data={bill.data}
							type="recurring"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

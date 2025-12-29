"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
	const [selectedMonth, setSelectedMonth] = useState("2025-12");

	// Sample data - replace with real API data
	const summary = {
		totalIncome: 4200,
		totalExpenses: 2850.5,
		totalSavings: 500,
		totalInvestments: 250,
		netCashFlow: 599.5,
	};

	const budgets = [
		{ id: "1", category: "Groceries", spent: 180, limit: 200, percentage: 90 },
		{ id: "2", category: "Rent", spent: 1200, limit: 1200, percentage: 100 },
		{ id: "3", category: "Utilities", spent: 85, limit: 130, percentage: 65 },
		{
			id: "4",
			category: "Entertainment",
			spent: 120,
			limit: 150,
			percentage: 80,
		},
	];

	const recentTransactions = [
		{
			id: "1",
			type: "Expense",
			category: "Groceries",
			amount: 45.2,
			date: "2025-12-28",
		},
		{
			id: "2",
			type: "Income",
			category: "Paycheck",
			amount: 2000,
			date: "2025-12-27",
		},
		{
			id: "3",
			type: "Expense",
			category: "Gas",
			amount: 55,
			date: "2025-12-26",
		},
		{
			id: "4",
			type: "Expense",
			category: "Restaurant",
			amount: 35.8,
			date: "2025-12-25",
		},
	];

	const upcomingRecurring = [
		{
			id: "1",
			category: "Rent",
			amount: 1200,
			dueDate: "2026-01-01",
			type: "Expense",
		},
		{
			id: "2",
			category: "Paycheck",
			amount: 2000,
			dueDate: "2026-01-03",
			type: "Income",
		},
		{
			id: "3",
			category: "Netflix",
			amount: 15.99,
			dueDate: "2026-01-05",
			type: "Expense",
		},
	];

	const getBudgetColor = (percentage: number) => {
		if (percentage >= 100) return "#ef4444"; // red
		if (percentage >= 80) return "#f59e0b"; // orange
		return "#10b981"; // green
	};

	return (
		<div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
			{/* Header */}
			<div style={{ marginBottom: "2rem" }}>
				<h1
					style={{
						fontSize: "2rem",
						fontWeight: "bold",
						marginBottom: "0.5rem",
					}}
				>
					Dashboard
				</h1>
				<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
					<label>Month:</label>
					<input
						type="month"
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
						style={{
							padding: "0.5rem",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
					/>
				</div>
			</div>

			{/* Summary Cards */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
					gap: "1rem",
					marginBottom: "2rem",
				}}
			>
				<SummaryCard
					title="Total Income"
					amount={summary.totalIncome}
					color="#10b981"
					icon="↑"
				/>
				<SummaryCard
					title="Total Expenses"
					amount={summary.totalExpenses}
					color="#ef4444"
					icon="↓"
				/>
				<SummaryCard
					title="Savings"
					amount={summary.totalSavings}
					color="#3b82f6"
					icon="💰"
				/>
				<SummaryCard
					title="Investments"
					amount={summary.totalInvestments}
					color="#8b5cf6"
					icon="📈"
				/>
				<SummaryCard
					title="Net Cash Flow"
					amount={summary.netCashFlow}
					color={summary.netCashFlow >= 0 ? "#10b981" : "#ef4444"}
					icon={summary.netCashFlow >= 0 ? "✓" : "✗"}
				/>
			</div>

			{/* Main Content Grid */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
					gap: "1.5rem",
				}}
			>
				{/* Budget Progress */}
				<Section
					title="Budget Progress"
					linkHref="/budgets"
					linkText="View All"
				>
					{budgets.map((budget) => (
						<div
							key={budget.id}
							style={{
								marginBottom: "1.5rem",
								padding: "1rem",
								backgroundColor: "#f9fafb",
								borderRadius: "8px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "0.5rem",
								}}
							>
								<span style={{ fontWeight: "600" }}>{budget.category}</span>
								<span style={{ color: getBudgetColor(budget.percentage) }}>
									${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
								</span>
							</div>
							<div
								style={{
									height: "8px",
									backgroundColor: "#e5e7eb",
									borderRadius: "4px",
									overflow: "hidden",
								}}
							>
								<div
									style={{
										height: "100%",
										width: `${Math.min(budget.percentage, 100)}%`,
										backgroundColor: getBudgetColor(budget.percentage),
										transition: "width 0.3s ease",
									}}
								/>
							</div>
							<div
								style={{
									fontSize: "0.875rem",
									color: "#6b7280",
									marginTop: "0.25rem",
								}}
							>
								{budget.percentage}% used
							</div>
						</div>
					))}
				</Section>

				{/* Recent Transactions */}
				<Section
					title="Recent Transactions"
					linkHref="/transactions"
					linkText="View All"
				>
					{recentTransactions.map((tx) => (
						<div
							key={tx.id}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "0.75rem",
								borderBottom: "1px solid #e5e7eb",
							}}
						>
							<div>
								<div style={{ fontWeight: "600" }}>{tx.category}</div>
								<div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
									{tx.date}
								</div>
							</div>
							<div
								style={{
									fontWeight: "bold",
									color: tx.type === "Income" ? "#10b981" : "#ef4444",
								}}
							>
								{tx.type === "Income" ? "+" : "-"}${tx.amount.toFixed(2)}
							</div>
						</div>
					))}
				</Section>

				{/* Upcoming Recurring */}
				<Section
					title="Upcoming Recurring"
					linkHref="/recurring"
					linkText="View All"
				>
					{upcomingRecurring.map((item) => (
						<div
							key={item.id}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "0.75rem",
								borderBottom: "1px solid #e5e7eb",
							}}
						>
							<div>
								<div style={{ fontWeight: "600" }}>{item.category}</div>
								<div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
									Due: {item.dueDate}
								</div>
							</div>
							<div
								style={{
									fontWeight: "bold",
									color: item.type === "Income" ? "#10b981" : "#ef4444",
								}}
							>
								{item.type === "Income" ? "+" : "-"}${item.amount.toFixed(2)}
							</div>
						</div>
					))}
				</Section>

				{/* Spending by Category (Placeholder for Chart) */}
				<Section title="Spending by Category">
					<div
						style={{
							height: "250px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#f9fafb",
							borderRadius: "8px",
							color: "#6b7280",
						}}
					>
						Chart coming soon (use recharts or chart.js)
					</div>
				</Section>
			</div>

			{/* Quick Actions */}
			<div style={{ marginTop: "2rem" }}>
				<h2
					style={{
						fontSize: "1.5rem",
						fontWeight: "bold",
						marginBottom: "1rem",
					}}
				>
					Quick Actions
				</h2>
				<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
					<QuickActionButton href="/transactions/new" label="Add Transaction" />
					<QuickActionButton href="/budgets/new" label="Create Budget" />
					<QuickActionButton href="/recurring/new" label="Add Recurring" />
					<QuickActionButton href="/categories/new" label="New Category" />
				</div>
			</div>
		</div>
	);
}

function SummaryCard({
	title,
	amount,
	color,
	icon,
}: {
	title: string;
	amount: number;
	color: string;
	icon: string;
}) {
	return (
		<div
			style={{
				padding: "1.5rem",
				backgroundColor: "white",
				border: "1px solid #e5e7eb",
				borderRadius: "8px",
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "0.5rem",
				}}
			>
				<span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{title}</span>
				<span style={{ fontSize: "1.5rem" }}>{icon}</span>
			</div>
			<div style={{ fontSize: "1.75rem", fontWeight: "bold", color }}>
				${amount.toFixed(2)}
			</div>
		</div>
	);
}

function Section({
	title,
	linkHref,
	linkText,
	children,
}: {
	title: string;
	linkHref?: string;
	linkText?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			style={{
				backgroundColor: "white",
				border: "1px solid #e5e7eb",
				borderRadius: "8px",
				padding: "1.5rem",
				boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "1rem",
				}}
			>
				<h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{title}</h3>
				{linkHref && (
					<Link
						href={linkHref}
						style={{
							color: "#3b82f6",
							fontSize: "0.875rem",
							textDecoration: "none",
						}}
					>
						{linkText} →
					</Link>
				)}
			</div>
			{children}
		</div>
	);
}

function QuickActionButton({ href, label }: { href: string; label: string }) {
	return (
		<Link
			href={href}
			style={{
				padding: "0.75rem 1.5rem",
				backgroundColor: "#3b82f6",
				color: "white",
				borderRadius: "6px",
				textDecoration: "none",
				fontWeight: "600",
				display: "inline-block",
				transition: "background-color 0.2s",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "#2563eb";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "#3b82f6";
			}}
		>
			{label}
		</Link>
	);
}

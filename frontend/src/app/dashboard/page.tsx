"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/ui/SectionHeader";
import SummaryCards from "@/components/ui/SummaryCards";
import Chart from "@/components/charts/Chart";
import CardList from "@/components/ui/CardList";
import BudgetGoals from "@/components/ui/BudgetGoals";
import MonthSelector from "@/components/ui/MonthSelector";

const expenses = [
	{ name: "Housing", value: 1200, color: "#1e40af" },
	{ name: "Food", value: 450, color: "#3b82f6" },
	{ name: "Transport", value: 300, color: "#60a5fa" },
	{ name: "Entertainment", value: 200, color: "#93c5fd" },
];

const trendData = [
	{ day: "Mon", amount: 150 },
	{ day: "Tue", amount: 230 },
	{ day: "Wed", amount: 180 },
	{ day: "Thu", amount: 290 },
	{ day: "Fri", amount: 250 },
	{ day: "Sat", amount: 320 },
	{ day: "Sun", amount: 200 },
];

// Mock category data
const mockCategories = {
	Subscriptions: { icon: "subscriptions", color: "#8B5CF6" },
	Groceries: { icon: "shopping", color: "#10B981" },
	Rent: { icon: "home", color: "#3B82F6" },
	"Tennis Lessons": { icon: "fitness", color: "#14B8A6" },
	Utilities: { icon: "utilities", color: "#F59E0B" },
	Entertainment: { icon: "other", color: "#EC4899" },
	Gas: { icon: "transport", color: "#F97316" },
	Insurance: { icon: "other", color: "#6366F1" },
	"Gym Membership": { icon: "fitness", color: "#14B8A6" },
	"Phone Bill": { icon: "subscriptions", color: "#A855F7" },
	"Paycheck 1": { icon: "income", color: "#84CC16" },
	Paycheck: { icon: "income", color: "#84CC16" },
	"Emergency Fund": { icon: "savings", color: "#10B981" },
	VOO: { icon: "investments", color: "#F59E0B" },
};

// Helper function
const getCategoryDetails = (categoryName: string) => {
	return (
		mockCategories[categoryName as keyof typeof mockCategories] || {
			icon: "other",
			color: "#9CA3AF",
		}
	);
};

const sampleTransactions = [
	{
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck 1",
		date: new Date("2025-12-20"),
		amount: 200,
	},
	{
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		date: new Date("2025-12-21"),
		amount: 50,
	},
	{
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Utilities",
		date: new Date("2025-12-22"),
		amount: 30.5,
	},
];

const sampleRecurring = [
	{
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck",
		frequency: "Weekly",
		startDate: "2025-01-05",
		nextRun: "2025-01-12",
		endDate: "2026-01-04",
		amount: 200,
	},
	{
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Rent",
		frequency: "Monthly",
		startDate: "2025-01-01",
		nextRun: "2025-02-01",
		endDate: "2025-12-31",
		amount: 1200,
	},
	{
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		frequency: "Weekly",
		startDate: "2025-06-01",
		nextRun: "2025-06-08",
		endDate: "2026-05-31",
		amount: 75,
	},
];

export default function IntegratedBudgetDashboard() {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleMonthChange = (date: Date) => {
		setSelectedDate(date);
		console.log("Selected month:", date);
		// TODO: Fetch data for the selected month
	};

	const handleEditTransaction = (id: string) => {
		router.push(`/transactions/${id}/edit`);
	};

	const handleEditRecurring = (id: string) => {
		router.push(`/recurring/${id}/edit`);
	};

	const handleDeleteTransaction = (id: string) => {
		if (confirm("Are you sure you want to delete this transaction?")) {
			console.log("Delete transaction", id);
		}
	};

	const handleDeleteRecurring = (id: string) => {
		if (
			confirm("Are you sure you want to delete this recurring transaction?")
		) {
			console.log("Delete recurring", id);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Month Selector */}
			<MonthSelector onMonthChange={handleMonthChange} className="mb-6 pt-4" />

			{/* Summary Cards */}
			<SummaryCards />

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
				<Chart type="pie" data={expenses} title="Spending Breakdown" />
				<BudgetGoals />
			</div>

			{/* Spending Trend */}
			<div className="mb-4 sm:mb-6">
				<Chart
					type="line"
					data={trendData}
					dataKey="amount"
					xAxisKey="day"
					title="Spending This Week"
				/>
			</div>

			{/* Transactions and Bills Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
				{/* Recent Transactions */}
				<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
					<div className="mb-4">
						<SectionHeader
							title="Recent Transactions"
							action={{
								label: "View All",
								href: "/transactions",
							}}
						/>
					</div>
					<CardList
						items={sampleTransactions}
						getCardProps={(tx) => {
							const categoryDetails = getCategoryDetails(tx.secondaryCategory);
							return {
								id: tx.id,
								title: tx.mainCategory,
								data: {
									amount: tx.amount,
									date: tx.date,
									mainCategory: tx.mainCategory,
									secondaryCategory: tx.secondaryCategory,
									color: categoryDetails.color,
									icon: categoryDetails.icon,
								},
								type: "transaction",
							};
						}}
						onEdit={handleEditTransaction}
						onDelete={handleDeleteTransaction}
					/>
				</section>

				{/* Upcoming Bills */}
				<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
					<div className="mb-4">
						<SectionHeader
							title="Upcoming Bills"
							action={{
								label: "View All",
								href: "/transactions#recurring",
							}}
						/>
					</div>
					<CardList
						items={sampleRecurring}
						getCardProps={(tx) => {
							const categoryDetails = getCategoryDetails(tx.secondaryCategory);
							return {
								id: tx.id,
								title: tx.mainCategory,
								data: {
									amount: tx.amount,
									frequency: tx.frequency,
									nextRun: new Date(tx.nextRun),
									mainCategory: tx.mainCategory,
									secondaryCategory: tx.secondaryCategory,
									startDate: new Date(tx.startDate),
									endDate: new Date(tx.endDate),
									color: categoryDetails.color,
									icon: categoryDetails.icon,
								},
								type: "recurring",
							};
						}}
						onEdit={handleEditRecurring}
						onDelete={handleDeleteRecurring}
					/>
				</section>
			</div>
		</div>
	);
}

"use client";
import React, { useState } from "react";
import {
	Utensils,
	Briefcase,
	Film,
	Car,
	Zap,
	Wifi,
	Smartphone,
	Home,
} from "lucide-react";
import SummaryCards from "@/components/ui/SummaryCards";
import Chart from "@/components/charts/Chart";
import TransactionsList, {
	Transaction,
} from "@/components/ui/TransactionsList";
import BudgetGoals from "@/components/ui/BudgetGoals";
import MonthSelector from "@/components/ui/MonthSelector";
export default function IntegratedBudgetDashboard() {
	const [selectedDate, setSelectedDate] = useState(new Date());
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

	const transactions: Transaction[] = [
		{
			name: "Grocery Store",
			amount: -85.5,
			category: "Food",
			icon: Utensils,
			color: "bg-blue-100 text-blue-600",
		},
		{
			name: "Salary Deposit",
			amount: 5200,
			category: "Income",
			icon: Briefcase,
			color: "bg-green-100 text-green-600",
		},
		{
			name: "Netflix",
			amount: -15.99,
			category: "Entertainment",
			icon: Film,
			color: "bg-purple-100 text-purple-600",
		},
		{
			name: "Gas Station",
			amount: -45.0,
			category: "Transport",
			icon: Car,
			color: "bg-orange-100 text-orange-600",
		},
	];

	const upcomingBills: Transaction[] = [
		{
			name: "Rent",
			amount: -1200,
			category: "Housing",
			icon: Home,
			color: "bg-red-100 text-red-600",
			date: "Jan 1",
		},
		{
			name: "Electricity",
			amount: -85,
			category: "Utilities",
			icon: Zap,
			color: "bg-yellow-100 text-yellow-600",
			date: "Jan 15",
		},
		{
			name: "Internet",
			amount: -60,
			category: "Utilities",
			icon: Wifi,
			color: "bg-blue-100 text-blue-600",
			date: "Jan 20",
		},
		{
			name: "Phone",
			amount: -45,
			category: "Utilities",
			icon: Smartphone,
			color: "bg-green-100 text-green-600",
			date: "Jan 25",
		},
	];

	// Handle month change
	const handleMonthChange = (date: Date) => {
		setSelectedDate(date);
		console.log("Selected month:", date);
		// TODO: Fetch data for the selected month
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
				<TransactionsList
					title="Recent Transactions"
					transactions={transactions}
					viewAllLink="/transactions"
				/>
				<TransactionsList
					title="Upcoming Bills"
					transactions={upcomingBills}
					viewAllLink="/transactions#recurring"
					showDate={true}
				/>
			</div>
		</div>
	);
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, BarChart2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SummaryCards from "@/components/ui/SummaryCards";
import Chart from "@/components/charts/Chart";
import CardList from "@/components/ui/CardList";
import BudgetGoals from "@/components/ui/BudgetGoals";
import MonthSelector from "@/components/ui/MonthSelector";
import { useSummary } from "@/hooks/useSummary";
import { useTransactions } from "@/hooks/useTransactions";
import { useRecurring } from "@/hooks/useRecurring";
import { useBudgets } from "@/hooks/useBudgets";
import { useCategories } from "@/hooks/useCategories";
import type { Transaction, RecurringTransaction, Category, Budget } from "@/lib/types";

function formatMonth(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	return `${y}-${m}`;
}

function fmt(n: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}

function toTxCardProps(tx: Transaction, cats: Category[]) {
	const cat = cats.find((c) => c.name === tx.category);
	return {
		id: tx._id,
		title: tx.transactionType.charAt(0).toUpperCase() + tx.transactionType.slice(1),
		data: {
			amount: tx.amount,
			date: new Date(tx.date),
			mainCategory: tx.transactionType.charAt(0).toUpperCase() + tx.transactionType.slice(1),
			secondaryCategory: tx.category ?? "Uncategorized",
			color: tx.categoryColor ?? cat?.color ?? "#9CA3AF",
			icon: tx.categoryIcon ?? cat?.icon ?? "other",
		},
		type: "transaction" as const,
	};
}

function toRecCardProps(r: RecurringTransaction, cats: Category[]) {
	const cat = cats.find((c) => c.name === r.category);
	return {
		id: r._id,
		title: r.transactionType.charAt(0).toUpperCase() + r.transactionType.slice(1),
		data: {
			amount: r.amount,
			frequency: r.frequency.charAt(0).toUpperCase() + r.frequency.slice(1),
			nextRun: new Date(r.nextRun),
			mainCategory: r.transactionType.charAt(0).toUpperCase() + r.transactionType.slice(1),
			secondaryCategory: r.category ?? "Uncategorized",
			startDate: new Date(r.startDate),
			endDate: new Date(r.endDate),
			color: r.categoryColor ?? cat?.color ?? "#9CA3AF",
			icon: r.categoryIcon ?? cat?.icon ?? "other",
		},
		type: "recurring" as const,
	};
}

export default function Dashboard() {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const month = formatMonth(selectedDate);

	const prevDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
	const prevMonth = formatMonth(prevDate);

	const { summary, loading: summaryLoading } = useSummary(month);
	const { summary: prevSummary } = useSummary(prevMonth);
	const { transactions, deleteTransaction } = useTransactions();
	const { recurring, deleteRecurring } = useRecurring();
	const { fetchBudgetsForMonth } = useBudgets();
	const { categories } = useCategories();
	const [monthBudgets, setMonthBudgets] = useState<Budget[]>([]);

	useEffect(() => {
		fetchBudgetsForMonth(selectedDate.getMonth() + 1, selectedDate.getFullYear())
			.then(setMonthBudgets)
			.catch(() => setMonthBudgets([]));
	}, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

	function delta(current: number, previous: number) {
		const diff = current - previous;
		const pct = previous !== 0 ? (diff / Math.abs(previous)) * 100 : 0;
		const sign = diff > 0 ? "+" : "";
		return {
			changeAmount: `${sign}${fmt(diff)}`,
			change: previous !== 0 ? `${sign}${pct.toFixed(1)}%` : "—",
		};
	}

	const income = summary?.totalIncome ?? 0;
	const expenses = summary?.totalExpenses ?? 0;
	const net = summary?.net ?? 0;
	const investments = summary?.totalInvestments ?? 0;
	const savings = summary?.totalSavings ?? 0;

	const prevIncome = prevSummary?.totalIncome ?? 0;
	const prevExpenses = prevSummary?.totalExpenses ?? 0;
	const prevNet = prevSummary?.net ?? 0;
	const prevInvestments = prevSummary?.totalInvestments ?? 0;
	const prevSavings = prevSummary?.totalSavings ?? 0;

	// Build summary cards from real data
	const summaryCards = [
		{
			title: "Monthly Income",
			amount: fmt(income),
			...delta(income, prevIncome),
			isPositive: income >= prevIncome,
			icon: TrendingUp,
			bgColor: "bg-green-100",
			iconColor: "text-green-600",
		},
		{
			title: "Monthly Expenses",
			amount: fmt(expenses),
			...delta(expenses, prevExpenses),
			isPositive: expenses <= prevExpenses,
			icon: TrendingDown,
			bgColor: "bg-red-100",
			iconColor: "text-red-600",
		},
		{
			title: "Net Balance",
			amount: fmt(net),
			...delta(net, prevNet),
			isPositive: net >= prevNet,
			icon: Wallet,
			bgColor: net >= 0 ? "bg-blue-100" : "bg-orange-100",
			iconColor: net >= 0 ? "text-blue-600" : "text-orange-600",
		},
		{
			title: "Investments",
			amount: fmt(investments),
			...delta(investments, prevInvestments),
			isPositive: investments >= prevInvestments,
			icon: BarChart2,
			bgColor: "bg-amber-100",
			iconColor: "text-amber-600",
		},
		{
			title: "Savings",
			amount: fmt(savings),
			...delta(savings, prevSavings),
			isPositive: savings >= prevSavings,
			icon: PiggyBank,
			bgColor: "bg-purple-100",
			iconColor: "text-purple-600",
		},
	];

	// Pie chart: expenses + investments + savings for the selected month only (no income)
	const selectedYear = selectedDate.getFullYear();
	const selectedMonth = selectedDate.getMonth() + 1;
	const spendingTx = transactions.filter((tx) => {
		if (tx.transactionType === "income") return false;
		const d = new Date(tx.date);
		return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
	});
	const categoryTotals: Record<string, { total: number; color: string; icon: string }> = {};
	for (const tx of spendingTx) {
		const name = tx.category ?? "Uncategorized";
		const cat = categories.find((c) => c.name === name);
		if (!categoryTotals[name]) {
			categoryTotals[name] = { total: 0, color: tx.categoryColor ?? cat?.color ?? "#9CA3AF", icon: tx.categoryIcon ?? cat?.icon ?? "other" };
		}
		categoryTotals[name].total += tx.amount;
	}
	const pieData = Object.entries(categoryTotals)
		.map(([name, { total, color }]) => ({ name, value: total, color }))
		.sort((a, b) => b.value - a.value)
		.slice(0, 8);

	// Build budget goals from budgets vs actual spending (includes recurring fallbacks)
	const budgetGoals = monthBudgets.map((b) => {
		const cat = categories.find((c) => c.name === b.category);
		const actual = (summary?.categoryBreakdown ?? []).find(
			(cb) => categories.find((c) => c._id === cb._id)?.name === b.category
		);
		return {
			name: b.category,
			target: b.amount,
			current: actual?.total ?? 0,
			color: cat?.color ?? "#9CA3AF",
			icon: cat?.icon ?? "other",
		};
	});

	// Recent 5 transactions
	const recentTx = transactions.slice(0, 5);
	// Upcoming 5 recurring
	const upcomingRec = [...recurring]
		.sort((a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime())
		.slice(0, 5);

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<MonthSelector onMonthChange={setSelectedDate} className="mb-6 pt-4" />

			{summaryLoading ? (
				<p className="text-sm text-gray-500 text-center py-4">Loading summary...</p>
			) : (
				<SummaryCards cards={summaryCards} />
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
				<Chart
					type="pie"
					data={pieData.length > 0 ? pieData : [{ name: "No data", value: 1, color: "#E5E7EB" }]}
					title="Spending Breakdown"
				/>
				{budgetGoals.length > 0 ? (
					<BudgetGoals goals={budgetGoals} />
				) : (
					<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center justify-center">
						<p className="text-sm text-gray-400">No budgets set for this month</p>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
				<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
					<div className="mb-4">
						<SectionHeader
							title="Recent Transactions"
							action={{ label: "View All", href: "/transactions" }}
						/>
					</div>
					{recentTx.length === 0 ? (
						<p className="text-sm text-gray-400 text-center py-4">No transactions yet</p>
					) : (
						<CardList
							items={recentTx}
							getCardProps={(tx) => toTxCardProps(tx, categories)}
							onEdit={(id) => router.push(`/transactions/${id}/edit`)}
							onDelete={async (id) => {
								if (confirm("Delete this transaction?")) await deleteTransaction(id);
							}}
						/>
					)}
				</section>

				<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
					<div className="mb-4">
						<SectionHeader
							title="Upcoming Bills"
							action={{ label: "View All", href: "/transactions" }}
						/>
					</div>
					{upcomingRec.length === 0 ? (
						<p className="text-sm text-gray-400 text-center py-4">No recurring transactions yet</p>
					) : (
						<CardList
							items={upcomingRec}
							getCardProps={(r) => toRecCardProps(r, categories)}
							onEdit={(id) => router.push(`/recurring/${id}/edit`)}
							onDelete={async (id) => {
								if (confirm("Delete this recurring transaction?")) await deleteRecurring(id);
							}}
						/>
					)}
				</section>
			</div>
		</div>
	);
}

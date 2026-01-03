"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
	const router = useRouter();

	const sampleTransactions = [
		{
			id: "1",
			mainCategory: "Income",
			secondaryCategory: "Paycheck 1",
			date: "2025-12-20",
			amount: 200,
		},
		{
			id: "2",
			mainCategory: "Expense",
			secondaryCategory: "Groceries",
			date: "2025-12-21",
			amount: 50,
		},
		{
			id: "3",
			mainCategory: "Expense",
			secondaryCategory: "Utilities",
			date: "2025-12-22",
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
		{
			id: "4",
			mainCategory: "Expense",
			secondaryCategory: "Utilities",
			frequency: "Monthly",
			startDate: "2025-02-01",
			nextRun: "2025-03-01",
			endDate: "2026-01-31",
			amount: 130.5,
		},
		{
			id: "5",
			mainCategory: "Savings",
			secondaryCategory: "Emergency Fund",
			frequency: "Weekly",
			startDate: "2025-03-01",
			nextRun: "2025-03-08",
			endDate: "2026-03-01",
			amount: 100,
		},
		{
			id: "6",
			mainCategory: "Investment",
			secondaryCategory: "VOO",
			frequency: "Monthly",
			startDate: "2026-01-15",
			nextRun: "2026-02-15",
			endDate: "2026-12-15",
			amount: 250,
		},
	];

	const handleEditTransaction = (id: string) => {
		router.push(`/transactions/${id}/edit`);
	};

	const handleEditRecurring = (id: string) => {
		router.push(`/recurring/${id}/edit`);
	};

	const handleDelete = (id: string) => {
		console.log("Delete", id);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
			{/* Page Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
					<p className="text-gray-600 mt-1">Manage your income and expenses</p>
				</div>
				<Link href="/transactions/new">
					<Button variant="primary" size="large">
						+ Add Transaction
					</Button>
				</Link>
			</div>

			{/* Recent Transactions Section */}
			<section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-800">
							Recent Transactions
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							One-time income and expenses
						</p>
					</div>
					<span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
						{sampleTransactions.length} total
					</span>
				</div>

				<div className="space-y-3">
					{sampleTransactions.map((tx) => (
						<Card
							key={tx.id}
							id={tx.id}
							title={tx.mainCategory}
							data={{
								amount: tx.amount,
								date: tx.date,
								mainCategory: tx.mainCategory,
								secondaryCategory: tx.secondaryCategory,
							}}
							type="transaction"
							onEdit={() => handleEditTransaction(tx.id)}
							onDelete={() => handleDelete(tx.id)}
						/>
					))}
				</div>
			</section>

			{/* Divider */}
			<div className="relative">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center">
					<span className="bg-gray-50 px-4 text-sm text-gray-500 font-medium">
						Recurring Transactions
					</span>
				</div>
			</div>

			{/* Recurring Transactions Section */}
			<section className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-6">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-800">
							Active Recurring
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Automated transactions on a schedule
						</p>
					</div>
					<span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
						{sampleRecurring.length} active
					</span>
				</div>

				<div className="space-y-3">
					{sampleRecurring.map((tx) => (
						<Card
							key={tx.id}
							id={tx.id}
							title={tx.mainCategory}
							data={{
								amount: tx.amount,
								frequency: tx.frequency,
								nextRun: tx.nextRun,
								mainCategory: tx.mainCategory,
								secondaryCategory: tx.secondaryCategory,
								startDate: new Date(tx.startDate),
								endDate: new Date(tx.endDate),
							}}
							type="recurring"
							onEdit={() => handleEditRecurring(tx.id)}
							onDelete={() => handleDelete(tx.id)}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

"use client";

import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function BudgetsPage() {
	const router = useRouter();
	const sampleBudgets = [
		{
			id: "1",
			category: "Subscriptions",
			amount: 50,
			month: 12,
			year: 2025,
		},
		{
			id: "2",
			category: "Groceries",
			amount: 200,
			month: 12,
			year: 2025,
		},
		{
			id: "3",
			category: "Rent",
			amount: 1200,
			month: 12,
			year: 2025,
		},
		{
			id: "4",
			category: "Tennis Lessons",
			amount: 100,
			month: 12,
			year: 2025,
		},
	];

	const handleEdit = (id: string) => {
		router.push(`/budgets/${id}/edit`);
		console.log("Edit", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete", id);
	};
	return (
		<div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
			{/* Page Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
					<p className="text-gray-600 mt-1">Track your monthly budgets</p>
				</div>
				<Link href="/categories/new">
					<Button variant="primary" size="large">
						+ Add Budget
					</Button>
				</Link>
			</div>

			{/* Budgets Section */}
			<section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-800">
							All Budgets
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Custom budgets for tracking expenses and income
						</p>
					</div>
					<span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
						{sampleBudgets.length} total
					</span>
				</div>

				<div className="space-y-3">
					{sampleBudgets.map((budget) => (
						<Card
							key={budget.id}
							id={budget.id}
							title={budget.category}
							data={{
								amount: budget.amount,
								month: budget.month,
								year: budget.year,
							}}
							type="budget"
							onEdit={() => handleEdit(budget.id)}
							onDelete={() => handleDelete(budget.id)}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

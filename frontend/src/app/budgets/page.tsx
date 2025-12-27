"use client";

import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
		<>
			<div>
				<Link href="/budgets/new" color="blue">
					Add New Budget
				</Link>
			</div>
			<div>
				<h1>Budgets</h1>
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
		</>
	);
}

"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecurringPage() {
	const router = useRouter();
	const sampleRecurring = [
		{
			id: "1",
			mainCategory: "Income",
			secondaryCategory: "Paycheck",
			frequency: "Weekly",
			startDate: "2025-01-05",
			nextRun: "2025-01-12",
			endDate: "2026-01-04", // 1 year of weekly income
			amount: 200,
		},
		{
			id: "2",
			mainCategory: "Expense",
			secondaryCategory: "Rent",
			frequency: "Monthly",
			startDate: "2025-01-01",
			nextRun: "2025-02-01",
			endDate: "2025-12-31", // 1-year lease
			amount: 1200,
		},
		{
			id: "3",
			mainCategory: "Expense",
			secondaryCategory: "Groceries",
			frequency: "Weekly",
			startDate: "2025-06-01",
			nextRun: "2025-06-08",
			endDate: "2026-05-31", // 1 year
			amount: 75,
		},
		{
			id: "4",
			mainCategory: "Expense",
			secondaryCategory: "Utilities",
			frequency: "Monthly",
			startDate: "2025-02-01",
			nextRun: "2025-03-01",
			endDate: "2026-01-31", // 12 months
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

	const handleEdit = (id: string) => {
		router.push(`/recurring/${id}/edit`);
		console.log("Edit", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete", id);
	};

	return (
		<>
			<div>
				<Link
					href="/recurring/new"
					className="text-blue-600 hover:text-blue-800"
				>
					<Button variant="primary">Add New Recurring Transaction</Button>
				</Link>
			</div>
			<div>
				<h1>Current Recurring Transactions</h1>
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
						onEdit={() => handleEdit(tx.id)}
						onDelete={() => handleDelete(tx.id)}
					/>
				))}
			</div>
		</>
	);
}

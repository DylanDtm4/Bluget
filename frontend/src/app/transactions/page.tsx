"use client";

import Card from "@/components/ui/Card";
import Link from "next/link";

export default function TransactionsPage() {
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

	const handleEdit = (id: string) => {
		console.log("Edit", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete", id);
	};

	return (
		<>
			<div>
				<h1>Recent Transactions</h1>
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
						onEdit={() => handleEdit(tx.id)}
						onDelete={() => handleDelete(tx.id)}
					/>
				))}
			</div>
			<div>
				<Link href="/transactions/new" color="blue">
					Add New Transaction
				</Link>
			</div>
		</>
	);
}

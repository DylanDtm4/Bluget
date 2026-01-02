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

	const handleEdit = (id: string) => {
		router.push(`/transactions/${id}/edit`);
		console.log("Edit", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete", id);
	};

	return (
		<>
			<div>
				<Link href="/transactions/new" color="blue">
					<Button variant="primary">Add New Transaction</Button>
				</Link>
			</div>
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
		</>
	);
}

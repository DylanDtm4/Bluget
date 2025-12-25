import TransactionCard from "@/components/ui/TransactionCard";
import Link from "next/link";

export default function TransactionsPage() {
	const sampleTransactions = [
		{
			id: "1",
			type: "Income",
			category: "Paycheck 1",
			date: "2025-12-20",
			amount: 200,
		},
		{
			id: "2",
			type: "Expense",
			category: "Groceries",
			date: "2025-12-21",
			amount: 50,
		},
		{
			id: "3",
			type: "Expense",
			category: "Utilities",
			date: "2025-12-22",
			amount: 30.5,
		},
	];

	return (
		<>
			<div>
				<h1>Transactions</h1>
				{sampleTransactions.map((tx) => (
					<TransactionCard
						key={tx.id}
						id={tx.id}
						type={tx.type}
						category={tx.category}
						date={tx.date}
						amount={tx.amount}
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

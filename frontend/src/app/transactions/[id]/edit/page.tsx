"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function EditTransactionPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const transactionFields = [
		{
			name: "mainCategory",
			label: "Type",
			type: "select" as const,
			required: true,
			options: [
				{ label: "Income", value: "Income" },
				{ label: "Expense", value: "Expense" },
				{ label: "Investment", value: "Investment" },
				{ label: "Savings", value: "Savings" },
			],
		},
		{
			name: "secondaryCategory",
			label: "Category",
			type: "text" as const,
			required: true,
			placeholder: "e.g., Groceries, Paycheck",
		},
		{
			name: "amount",
			label: "Amount",
			type: "number" as const,
			required: true,
			placeholder: "0.00",
		},
		{
			name: "date",
			label: "Date",
			type: "date" as const,
			required: true,
		},
		{
			name: "note",
			label: "Note",
			type: "textarea" as const,
			placeholder: "Optional note...",
		},
	];

	// Fetch existing data (for now using dummy data)
	// In real app: useEffect to fetch from API
	const existingTransaction = {
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		amount: 50,
		date: "2025-12-21",
		note: "Weekly shopping",
	};

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Updating transaction:", params.id, data);
		// PUT request to API: /api/transactions/${params.id}
		router.push("/transactions");
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Edit Transaction"
					fields={transactionFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/transactions")}
					initialData={existingTransaction}
					enableRecurring={false}
				/>
			</div>{" "}
		</div>
	);
}

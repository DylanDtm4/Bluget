"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function NewTransactionPage() {
	const router = useRouter();

	// Define the fields for your transaction form
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
			hideWhenRecurring: true,
			required: true,
		},
		{
			name: "frequency",
			label: "Frequency",
			type: "select" as const,
			showOnlyWhenRecurring: true,
			required: true,
			options: [
				{ label: "Daily", value: "daily" },
				{ label: "Weekly", value: "weekly" },
				{ label: "Monthly", value: "monthly" },
				{ label: "Yearly", value: "yearly" },
			],
		},
		{
			name: "startDate",
			label: "Start Date",
			type: "date" as const,
			required: true,
			showOnlyWhenRecurring: true,
		},
		{
			name: "endDate",
			label: "End Date",
			type: "date" as const,
			required: true,
			showOnlyWhenRecurring: true,
		},
		{
			name: "note",
			label: "Note",
			type: "textarea" as const,
			placeholder: "Optional note...",
		},
	];

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Form submitted:", data);

		// Here you would send data to your API
		// fetch('/transactions', {
		//   method: 'POST',
		//   body: JSON.stringify(data)
		// })

		// Then redirect back to transactions page
		router.push("/transactions");
	};

	const handleCancel = () => {
		router.push("/transactions");
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Add New Transaction"
					fields={transactionFields}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					enableRecurring={true}
				/>
			</div>
		</div>
	);
}

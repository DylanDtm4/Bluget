"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function NewRecurringTransactionPage() {
	const router = useRouter();

	// Define the fields for your transaction form
	const recurringFields = [
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
			name: "frequency",
			label: "Frequency",
			type: "select" as const,
			required: true,
			options: [
				{ label: "Daily", value: "Daily" },
				{ label: "Weekly", value: "Weekly" },
				{ label: "Biweekly", value: "Biweekly" },
				{ label: "Monthly", value: "Monthly" },
				{ label: "Quarterly", value: "Quarterly" },
				{ label: "Yearly", value: "Yearly" },
			],
		},
		{
			name: "startDate",
			label: "Start Date",
			type: "date" as const,
			required: true,
		},
		{
			name: "endDate",
			label: "End Date",
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

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Form submitted:", data);

		// Here you would send data to your API
		// fetch('/recurring', {
		//   method: 'POST',
		//   body: JSON.stringify(data)
		// })

		// Then redirect back to recurring page
		router.push("/transactions");
	};

	const handleCancel = () => {
		router.push("/transactions");
	};

	return (
		<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Add New Recurring Transaction"
					fields={recurringFields}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			</div>
		</div>
	);
}

"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function NewBudgetPage() {
	const router = useRouter();

	// Define the fields for your budget form
	const budgetFields = [
		{
			name: "category",
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
			name: "month",
			label: "Month",
			type: "select" as const,
			required: true,
			options: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
		},
		{
			name: "year",
			label: "Year",
			type: "number" as const,
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
		// fetch('/budgets', {
		//   method: 'POST',
		//   body: JSON.stringify(data)
		// })

		// Then redirect back to budgets page
		router.push("/budgets");
	};

	const handleCancel = () => {
		router.push("/budgets");
	};

	return (
		<Form
			title="Add New Budget"
			fields={budgetFields}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);
}

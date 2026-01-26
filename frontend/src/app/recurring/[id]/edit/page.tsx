"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function EditRecurringPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

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

	// Fetch existing data (for now using dummy data)
	// In real app: useEffect to fetch from API
	const existingRecurring = {
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		amount: 50,
		frequency: "Weekly",
		startDate: "2025-05-31",
		endDate: "2026-05-30",
		note: "Weekly shopping",
	};

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Updating recurring transaction:", params.id, data);
		// PUT request to API: /api/recurring/${params.id}
		router.push("/transactions");
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Edit Recurring Transaction"
					fields={recurringFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/transactions")}
					initialData={existingRecurring}
					enableRecurring={true}
					recurringLocked={true}
				/>
			</div>
		</div>
	);
}

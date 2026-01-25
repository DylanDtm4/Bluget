"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function EditBudgetPage({ params }: { params: { id: string } }) {
	const router = useRouter();

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
				{ label: "January", value: "1" },
				{ label: "February", value: "2" },
				{ label: "March", value: "3" },
				{ label: "April", value: "4" },
				{ label: "May", value: "5" },
				{ label: "June", value: "6" },
				{ label: "July", value: "7" },
				{ label: "August", value: "8" },
				{ label: "September", value: "9" },
				{ label: "October", value: "10" },
				{ label: "November", value: "11" },
				{ label: "December", value: "12" },
			],
		},
		{
			name: "year",
			label: "Year",
			type: "year" as const,
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
	const existingBudget = {
		category: "Groceries",
		amount: 200,
		month: "December",
		year: 2025,
		note: "Monthly grocery budget",
	};

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Updating budget:", params.id, data);
		// PUT request to API: /api/budgets/${params.id}
		// ADD functionality to push to budgets/[id] after successful update
		router.push("/budgets/");
	};

	return (
		<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Edit Budget"
					fields={budgetFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/budgets")}
					initialData={existingBudget}
				/>
			</div>
		</div>
	);
}

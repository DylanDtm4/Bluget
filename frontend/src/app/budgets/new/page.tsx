"use client";

import { useState } from "react";
import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { api } from "@/lib/api";

export default function NewBudgetPage() {
	const router = useRouter();
	const { categories } = useCategories();
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	const categoryOptions = categories.map((c) => ({ label: c.name, value: c.name }));

	const budgetFields = [
		{
			name: "category",
			label: "Category",
			type: "select" as const,
			required: true,
			options: categoryOptions,
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
			hideWhenRecurring: true,
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
			hideWhenRecurring: true,
		},
		{
			name: "note",
			label: "Note",
			type: "textarea" as const,
			placeholder: "Optional note...",
		},
	];

	const handleSubmit = async (data: Record<string, string | number | boolean>) => {
		setError(undefined);
		setIsLoading(true);
		try {
			const recurring = !!data.recurring;
			await api.post("/budgets", {
				category: data.category,
				amount: Number(data.amount),
				month: recurring ? undefined : Number(data.month),
				year: recurring ? undefined : Number(data.year),
				note: data.note,
				recurring,
			});
			router.push("/budgets");
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Failed to create budget. Please try again.";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Add New Budget"
					fields={budgetFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/budgets")}
					enableRecurring={true}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

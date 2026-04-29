"use client";

import { useState } from "react";
import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { api } from "@/lib/api";

export default function NewTransactionPage() {
	const router = useRouter();
	const { categories } = useCategories();
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	const categoryOptions = categories.map((c) => ({ label: c.name, value: c.name }));

	const transactionFields = [
		{
			name: "mainCategory",
			label: "Type",
			type: "select" as const,
			required: true,
			options: [
				{ label: "Income", value: "income" },
				{ label: "Expense", value: "expense" },
				{ label: "Investment", value: "investment" },
				{ label: "Savings", value: "savings" },
			],
		},
		{
			name: "secondaryCategory",
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

	const handleSubmit = async (data: Record<string, string | number>) => {
		setError(undefined);
		setIsLoading(true);
		const isRecurring = !data.date;
		try {
			if (isRecurring) {
				await api.post("/recurring", {
					transactionType: data.mainCategory,
					category: data.secondaryCategory,
					amount: data.amount,
					frequency: data.frequency,
					startDate: data.startDate,
					endDate: data.endDate,
					nextRun: data.startDate,
					note: data.note,
				});
			} else {
				await api.post("/transactions", {
					transactionType: data.mainCategory,
					category: data.secondaryCategory,
					amount: data.amount,
					date: data.date,
					note: data.note,
				});
			}
			router.push("/transactions");
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Failed to save. Please try again.";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Add New Transaction"
					fields={transactionFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/transactions")}
					enableRecurring={true}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

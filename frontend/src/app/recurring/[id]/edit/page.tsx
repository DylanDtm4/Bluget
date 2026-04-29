"use client";

import { useState, useEffect } from "react";
import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { api } from "@/lib/api";

export default function EditRecurringPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { categories } = useCategories();
	const [initialData, setInitialData] = useState<Record<string, string | number> | null>(null);
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		api.get(`/recurring/${params.id}`).then((res) => {
			const r = res.data;
			setInitialData({
				mainCategory: r.transactionType,
				secondaryCategory: r.category ?? "",
				amount: r.amount,
				frequency: r.frequency,
				startDate: r.startDate ? r.startDate.slice(0, 10) : "",
				endDate: r.endDate ? r.endDate.slice(0, 10) : "",
				note: r.note ?? "",
			});
		});
	}, [params.id]);

	const categoryOptions = categories.map((c) => ({ label: c.name, value: c.name }));

	const recurringFields = [
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
			name: "frequency",
			label: "Frequency",
			type: "select" as const,
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

	const handleSubmit = async (data: Record<string, string | number>) => {
		setError(undefined);
		setIsLoading(true);
		try {
			await api.put(`/recurring/${params.id}`, {
				transactionType: data.mainCategory,
				category: data.secondaryCategory,
				amount: data.amount,
				frequency: data.frequency,
				startDate: data.startDate,
				endDate: data.endDate,
				note: data.note,
			});
			router.push("/transactions");
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Failed to update. Please try again.";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	if (!initialData) {
		return (
			<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen flex items-center justify-center">
				<p className="text-gray-500 text-sm">Loading...</p>
			</div>
		);
	}

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Edit Recurring Transaction"
					fields={recurringFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/transactions")}
					initialData={initialData}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

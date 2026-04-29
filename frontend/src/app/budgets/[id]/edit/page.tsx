"use client";

import { useState, useEffect } from "react";
import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { api } from "@/lib/api";

export default function EditBudgetPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { categories } = useCategories();
	const [initialData, setInitialData] = useState<Record<string, string | number | boolean> | null>(null);
	const [initialRecurring, setInitialRecurring] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		api.get(`/budgets/${params.id}`).then((res) => {
			const b = res.data;
			setInitialRecurring(!!b.recurring);
			setInitialData({
				category: b.category,
				amount: b.amount,
				month: b.month != null ? String(b.month) : "",
				year: b.year ?? "",
				note: b.note ?? "",
			});
		});
	}, [params.id]);

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
			await api.put(`/budgets/${params.id}`, {
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
					?.error ?? "Failed to update budget. Please try again.";
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
					title="Edit Budget"
					fields={budgetFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/budgets")}
					initialData={initialData}
					enableRecurring={true}
					initialRecurring={initialRecurring}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

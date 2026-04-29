"use client";

import { useState, useEffect } from "react";
import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditCategoryPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [initialData, setInitialData] = useState<Record<string, string | number> | null>(null);
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		api.get(`/categories/${params.id}`).then((res) => {
			const c = res.data;
			setInitialData({ name: c.name, color: c.color, icon: c.icon });
		});
	}, [params.id]);

	const categoryFields = [
		{
			name: "name",
			label: "Name",
			type: "text" as const,
			required: true,
			placeholder: "e.g., Groceries, Paycheck",
		},
		{
			name: "color",
			label: "Color",
			type: "color" as const,
			required: true,
		},
		{
			name: "icon",
			label: "Icon",
			type: "icon" as const,
			required: true,
		},
	];

	const handleSubmit = async (data: Record<string, string | number>) => {
		setError(undefined);
		setIsLoading(true);
		try {
			await api.put(`/categories/${params.id}`, {
				name: data.name,
				color: data.color,
				icon: data.icon,
			});
			router.push("/categories");
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Failed to update category. Please try again.";
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
					title="Edit Category"
					fields={categoryFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/categories")}
					initialData={initialData}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

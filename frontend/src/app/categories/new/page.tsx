"use client";

import { useState } from "react";
import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function NewCategoryPage() {
	const router = useRouter();
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

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
			await api.post("/categories", {
				name: data.name,
				color: data.color,
				icon: data.icon,
			});
			router.push("/categories");
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Failed to create category. Please try again.";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="w-full flex justify-center">
				<Form
					title="Add New Category"
					fields={categoryFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/categories")}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

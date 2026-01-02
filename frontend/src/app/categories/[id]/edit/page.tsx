"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function EditCategoryPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const categoryFields = [
		{
			name: "category",
			label: "Category",
			type: "text" as const,
			required: true,
			placeholder: "e.g., Groceries, Paycheck",
		},
		{
			name: "color",
			label: "Color",
			type: "text" as const,
			required: true,
			placeholder: "e.g., #FF5733",
		},
	];
	// Fetch existing data (for now using dummy data)
	// In real app: useEffect to fetch from API
	const existingCategory = {
		category: "Groceries",
	};

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Updating category:", params.id, data);
		// PUT request to API: /api/categories/${params.id}
		router.push("/categories");
	};

	return (
		<Form
			title="Edit Category"
			fields={categoryFields}
			onSubmit={handleSubmit}
			onCancel={() => router.push("/categories")}
			initialData={existingCategory}
		/>
	);
}

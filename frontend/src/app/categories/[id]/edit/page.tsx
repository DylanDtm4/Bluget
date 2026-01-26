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
			type: "color" as const, // Changed from "text" to "color"
			required: true,
			placeholder: "#FF5733", // Default color value
		},
		{
			name: "icon",
			label: "Icon",
			type: "icon" as const,
			required: true,
			placeholder: "Select an icon",
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
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				<Form
					title="Edit Category"
					fields={categoryFields}
					onSubmit={handleSubmit}
					onCancel={() => router.push("/categories")}
					initialData={existingCategory}
				/>
			</div>
		</div>
	);
}

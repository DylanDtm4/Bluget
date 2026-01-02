"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
	const router = useRouter();

	// Define the fields for your category form
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

	const handleSubmit = (data: Record<string, string | number>) => {
		console.log("Form submitted:", data);

		// Here you would send data to your API
		// fetch('/categories', {
		//   method: 'POST',
		//   body: JSON.stringify(data)
		// })

		// Then redirect back to categories page
		router.push("/categories");
	};

	const handleCancel = () => {
		router.push("/categories");
	};

	return (
		<Form
			title="Add New Category"
			fields={categoryFields}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);
}

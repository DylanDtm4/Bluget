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
			type: "color" as const, // Changed from "text" to "color"
			required: true,
		},
		{
			name: "icon",
			label: "Icon",
			type: "icon" as const,
			required: true,
			placeholder: "Select an icon",
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
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="w-full flex justify-center">
				<Form
					title="Add New Category"
					fields={categoryFields}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			</div>
		</div>
	);
}

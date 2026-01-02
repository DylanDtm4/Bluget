"use client";

import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
	const router = useRouter();
	const sampleCategories = [
		{
			id: "1",
			category: "Paycheck 1",
			color: "#FF5733",
		},
		{
			id: "2",
			category: "Groceries",
			color: "#FF5733",
		},
		{
			id: "3",
			category: "Rent",
			color: "#FF5733",
		},
		{
			id: "4",
			category: "Tennis Lessons",
			color: "#FF5733",
		},
	];

	const handleEdit = (id: string) => {
		router.push(`/categories/${id}/edit`);
		console.log("Edit", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete", id);
	};
	return (
		<>
			<div>
				<Link href="/categories/new" color="blue">
					Add New Category
				</Link>
			</div>
			<div>
				<h1>Categories</h1>
				{sampleCategories.map((category) => (
					<Card
						key={category.id}
						id={category.id}
						title={category.category}
						data={{
							color: category.color,
						}}
						type="category"
						onEdit={() => handleEdit(category.id)}
						onDelete={() => handleDelete(category.id)}
					/>
				))}
			</div>
		</>
	);
}

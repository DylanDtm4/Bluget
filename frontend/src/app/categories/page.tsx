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
			custom: false,
		},
		{
			id: "2",
			category: "Groceries",
			custom: false,
		},
		{
			id: "3",
			category: "Rent",
			custom: false,
		},
		{
			id: "4",
			category: "Tennis Lessons",
			custom: true,
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
							custom: category.custom,
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

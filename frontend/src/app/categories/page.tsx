"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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
		<div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
			{/* Page Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Categories</h1>
					<p className="text-gray-600 mt-1">
						Organize your transactions by category
					</p>
				</div>
				<Link href="/categories/new">
					<Button variant="primary" size="large">
						+ Add Category
					</Button>
				</Link>
			</div>

			{/* Categories Section */}
			<section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-800">
							All Categories
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Custom categories for tracking expenses and income
						</p>
					</div>
					<span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
						{sampleCategories.length} total
					</span>
				</div>

				<div className="space-y-3">
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
			</section>
		</div>
	);
}

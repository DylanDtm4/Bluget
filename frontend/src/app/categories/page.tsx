import CategoryCard from "@/components/ui/CategoryCard";
import Link from "next/link";

export default function CategoriesPage() {
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

	return (
		<>
			<div>
				<h1>Categories</h1>
				{sampleCategories.map((category) => (
					<CategoryCard
						key={category.id}
						id={category.id}
						category={category.category}
						custom={category.custom}
					/>
				))}
			</div>
			<div>
				<Link href="/categories/new" color="blue">
					Add New Category
				</Link>
			</div>
		</>
	);
}

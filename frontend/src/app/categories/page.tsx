"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchAndSortBar from "@/components/ui/SearchAndSortBar";
import EmptyState from "@/components/ui/EmptyState";
import CardList from "@/components/ui/CardList";
import Pagination from "@/components/ui/Pagination";
import { useTableState } from "@/hooks/useTableState";

type CategorySortField = "color" | "category" | "icon";

type Category = {
	id: string;
	category: string;
	color: string;
	icon: string;
};

const sampleCategories: Category[] = [
	{
		id: "1",
		category: "Groceries",
		color: "#10B981", // Green
		icon: "shopping",
	},
	{
		id: "2",
		category: "Rent",
		color: "#3B82F6", // Blue
		icon: "home",
	},
	{
		id: "3",
		category: "Utilities",
		color: "#8B5CF6", // Purple
		icon: "utilities",
	},
	{
		id: "4",
		category: "Transportation",
		color: "#F59E0B", // Amber
		icon: "transport",
	},
	{
		id: "5",
		category: "Entertainment",
		color: "#EC4899", // Pink
		icon: "other",
	},
	{
		id: "6",
		category: "Dining Out",
		color: "#EF4444", // Red
		icon: "food",
	},
	{
		id: "7",
		category: "Healthcare",
		color: "#06B6D4", // Cyan
		icon: "other",
	},
	{
		id: "8",
		category: "Shopping",
		color: "#F97316", // Orange
		icon: "shopping",
	},
	{
		id: "9",
		category: "Subscriptions",
		color: "#6366F1", // Indigo
		icon: "subscriptions",
	},
	{
		id: "10",
		category: "Fitness",
		color: "#14B8A6", // Teal
		icon: "fitness",
	},
	{
		id: "11",
		category: "Education",
		color: "#A855F7", // Violet
		icon: "other",
	},
	{
		id: "12",
		category: "Savings",
		color: "#84CC16", // Lime
		icon: "savings",
	},
	{
		id: "13",
		category: "Income",
		color: "#84CC16", // Lime
		icon: "income",
	},
];

// Sort options for categories
const categorySortOptions = [
	{ value: "category" as const, label: "Category" },
	{ value: "color" as const, label: "Color" },
	{ value: "icon" as const, label: "Icon" },
];

export default function CategoriesPage() {
	const router = useRouter();

	// Category table state
	const categories = useTableState<
		(typeof sampleCategories)[0],
		CategorySortField
	>({
		data: sampleCategories,
		defaultSortField: "category",
		defaultSortDirection: "asc",
		searchFields: ["category"],
	});

	const handleEdit = (id: string) => {
		router.push(`/categories/${id}/edit`);
		console.log("Edit", id);
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this category?")) {
			console.log("Delete", id);
			// TODO: Add real delete functionality
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Page Header */}
			<PageHeader
				title="Categories"
				description="Organize your transactions by category"
				actionButton={{
					label: "+ Add Category",
					href: "/categories/new",
				}}
			/>

			{/* Categories Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				{/* Header with Search, Sort, and Count */}
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="All Categories"
						description="Custom categories for tracking expenses and income"
						badge={{
							label: "total",
							count: categories.totalItems,
						}}
					/>
					<SearchAndSortBar
						searchValue={categories.searchValue}
						setSearchValue={categories.setSearchValue}
						sortField={categories.sortField}
						setSortField={categories.setSortField}
						sortDirection={categories.sortDirection}
						setSortDirection={categories.setSortDirection}
						setPage={categories.setCurrentPage}
						sortOptions={categorySortOptions}
					/>
				</div>

				{/* Empty State */}
				{categories.isEmpty && (
					<EmptyState
						variant={categories.searchValue ? "no-results" : "no-data"}
						icon="document"
						message={
							categories.searchValue
								? "No budgets match your search"
								: "No budgets found"
						}
						action={
							categories.searchValue
								? {
										label: "Clear Search",
										onClick: () => categories.clearSearch,
									}
								: {
										label: "Create Your First Budget",
										href: "/budgets/new",
									}
						}
					/>
				)}

				{/* Categories List */}
				{categories.hasData && (
					<>
						<CardList
							items={categories.paginatedData}
							getCardProps={(category) => {
								return {
									id: category.id,
									title: category.category,
									data: {
										color: category.color,
										icon: category.icon,
									},
									type: "category",
								};
							}}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
						<Pagination
							currentPage={categories.currentPage}
							totalPages={categories.totalPages}
							totalItems={categories.totalItems}
							itemsPerPage={categories.itemsPerPage}
							onPageChange={categories.setCurrentPage}
						/>
					</>
				)}
			</section>
		</div>
	);
}

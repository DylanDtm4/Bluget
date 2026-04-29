"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchAndSortBar from "@/components/ui/SearchAndSortBar";
import EmptyState from "@/components/ui/EmptyState";
import CardList from "@/components/ui/CardList";
import Pagination from "@/components/ui/Pagination";
import { useTableState } from "@/hooks/useTableState";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/lib/types";

type CategoryRow = {
	id: string;
	name: string;
	color: string;
	icon: string;
};

type CategorySortField = "name" | "color" | "icon";

const categorySortOptions = [
	{ value: "name" as const, label: "Name" },
	{ value: "color" as const, label: "Color" },
	{ value: "icon" as const, label: "Icon" },
];

function toCategoryRow(c: Category): CategoryRow {
	return { id: c._id, name: c.name, color: c.color, icon: c.icon };
}

export default function CategoriesPage() {
	const router = useRouter();
	const { categories, loading, deleteCategory } = useCategories();

	const rows = categories.map(toCategoryRow);

	const table = useTableState<CategoryRow, CategorySortField>({
		data: rows,
		defaultSortField: "name",
		defaultSortDirection: "asc",
		searchFields: ["name"],
	});

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this category?")) {
			await deleteCategory(id);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<PageHeader
				title="Categories"
				description="Organize your transactions by category"
				actionButton={{ label: "+ Add Category", href: "/categories/new" }}
			/>

			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="All Categories"
						description="Custom categories for tracking expenses and income"
						badge={{ label: "total", count: table.totalItems }}
					/>
					<SearchAndSortBar
						searchValue={table.searchValue}
						setSearchValue={table.setSearchValue}
						sortField={table.sortField}
						setSortField={table.setSortField}
						sortDirection={table.sortDirection}
						setSortDirection={table.setSortDirection}
						setPage={table.setCurrentPage}
						sortOptions={categorySortOptions}
					/>
				</div>

				{loading && <p className="text-sm text-gray-500 py-4 text-center">Loading...</p>}

				{!loading && table.isEmpty && (
					<EmptyState
						variant={table.searchValue ? "no-results" : "no-data"}
						icon="document"
						message={table.searchValue ? "No categories match your search" : "No categories found"}
						action={
							table.searchValue
								? { label: "Clear Search", onClick: table.clearSearch }
								: { label: "Create Your First Category", href: "/categories/new" }
						}
					/>
				)}

				{!loading && table.hasData && (
					<>
						<CardList
							items={table.paginatedData}
							getCardProps={(c) => ({
								id: c.id,
								title: c.name,
								data: { color: c.color, icon: c.icon },
								type: "category",
							})}
							onEdit={(id) => router.push(`/categories/${id}/edit`)}
							onDelete={handleDelete}
						/>
						<Pagination
							currentPage={table.currentPage}
							totalPages={table.totalPages}
							totalItems={table.totalItems}
							itemsPerPage={table.itemsPerPage}
							onPageChange={table.setCurrentPage}
						/>
					</>
				)}
			</section>
		</div>
	);
}

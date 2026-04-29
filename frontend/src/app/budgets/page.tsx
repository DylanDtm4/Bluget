"use client";

import { useRouter } from "next/navigation";
import { useTableState } from "@/hooks/useTableState";
import { useBudgets } from "@/hooks/useBudgets";
import { useCategories } from "@/hooks/useCategories";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchAndSortBar from "@/components/ui/SearchAndSortBar";
import EmptyState from "@/components/ui/EmptyState";
import CardList from "@/components/ui/CardList";
import Pagination from "@/components/ui/Pagination";
import type { Budget, Category } from "@/lib/types";

type BudgetRow = {
	id: string;
	category: string;
	amount: number;
	month: number | null;
	year: number | null;
	recurring?: boolean;
	note?: string;
	color: string;
	icon: string;
};

type BudgetSortField = "amount" | "month" | "year" | "category";

const budgetSortOptions = [
	{ value: "month" as const, label: "Month" },
	{ value: "year" as const, label: "Year" },
	{ value: "amount" as const, label: "Amount" },
	{ value: "category" as const, label: "Category" },
];

function toBudgetRow(b: Budget, cats: Category[]): BudgetRow {
	const cat = cats.find((c) => c.name === b.category);
	return {
		id: b._id,
		category: b.category,
		amount: b.amount,
		month: b.month,
		year: b.year,
		recurring: b.recurring,
		note: b.note,
		color: cat?.color ?? "#9CA3AF",
		icon: cat?.icon ?? "other",
	};
}

export default function BudgetsPage() {
	const router = useRouter();
	const { budgets, loading, deleteBudget } = useBudgets();
	const { categories } = useCategories();

	const rows = budgets.map((b) => toBudgetRow(b, categories));

	const table = useTableState<BudgetRow, BudgetSortField>({
		data: rows,
		defaultSortField: "month",
		defaultSortDirection: "desc",
		searchFields: ["category"],
	});

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this budget?")) {
			await deleteBudget(id);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<PageHeader
				title="Budgets"
				description="Track your monthly spending"
				actionButton={{ label: "+ Add Budget", href: "/budgets/new" }}
			/>

			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="All Budgets"
						description="Monthly spending limits by category"
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
						sortOptions={budgetSortOptions}
					/>
				</div>

				{loading && <p className="text-sm text-gray-500 py-4 text-center">Loading...</p>}

				{!loading && table.isEmpty && (
					<EmptyState
						variant={table.searchValue ? "no-results" : "no-data"}
						icon="document"
						message={table.searchValue ? "No budgets match your search" : "No budgets found"}
						action={
							table.searchValue
								? { label: "Clear Search", onClick: table.clearSearch }
								: { label: "Create Your First Budget", href: "/budgets/new" }
						}
					/>
				)}

				{!loading && table.hasData && (
					<>
						<CardList
							items={table.paginatedData}
							getCardProps={(b) => ({
								id: b.id,
								title: b.category,
								data: {
									amount: b.amount,
									month: b.month,
									year: b.year,
									recurring: b.recurring,
									note: b.note,
									color: b.color,
									icon: b.icon,
								},
								type: "budget",
							})}
							onEdit={(id) => router.push(`/budgets/${id}/edit`)}
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

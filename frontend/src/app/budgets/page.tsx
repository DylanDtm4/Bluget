"use client";

import { useRouter } from "next/navigation";
import { useTableState } from "@/hooks/useTableState";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchAndSortBar from "@/components/ui/SearchAndSortBar";
import EmptyState from "@/components/ui/EmptyState";
import CardList from "@/components/ui/CardList";
import Pagination from "@/components/ui/Pagination";

type BudgetSortField = "amount" | "month" | "year" | "category";

type Budget = {
	id: string;
	category: string;
	amount: number;
	month: number;
	year: number;
	note?: string;
};

// Mock category data
const mockCategories = {
	Subscriptions: { icon: "subscriptions", color: "#8B5CF6" },
	Groceries: { icon: "shopping", color: "#10B981" },
	Rent: { icon: "home", color: "#3B82F6" },
	"Tennis Lessons": { icon: "fitness", color: "#14B8A6" },
	Utilities: { icon: "utilities", color: "#F59E0B" },
	Entertainment: { icon: "other", color: "#EC4899" },
	Gas: { icon: "transport", color: "#F97316" },
	Insurance: { icon: "other", color: "#6366F1" },
	"Gym Membership": { icon: "fitness", color: "#14B8A6" },
	"Phone Bill": { icon: "subscriptions", color: "#A855F7" },
};

// Helper function
const getCategoryDetails = (categoryName: string) => {
	return (
		mockCategories[categoryName as keyof typeof mockCategories] || {
			icon: "other",
			color: "#9CA3AF",
		}
	);
};

// Hardcoded sample data
const sampleBudgets: Budget[] = [
	{
		id: "1",
		category: "Subscriptions",
		amount: 50,
		month: 12,
		year: 2025,
		note: "Netflix, Spotify, etc.",
	},
	{
		id: "2",
		category: "Groceries",
		amount: 200,
		month: 12,
		year: 2025,
		note: "Weekly shopping",
	},
	{
		id: "3",
		category: "Rent",
		amount: 1200,
		month: 12,
		year: 2025,
	},
	{
		id: "4",
		category: "Tennis Lessons",
		amount: 100,
		month: 12,
		year: 2025,
	},
	{
		id: "5",
		category: "Utilities",
		amount: 150,
		month: 11,
		year: 2025,
		note: "Electric, water, gas",
	},
	{
		id: "6",
		category: "Groceries",
		amount: 180,
		month: 11,
		year: 2025,
	},
	{
		id: "7",
		category: "Entertainment",
		amount: 75,
		month: 10,
		year: 2025,
		note: "Movies, concerts",
	},
	{
		id: "8",
		category: "Gas",
		amount: 120,
		month: 10,
		year: 2025,
	},
	{
		id: "9",
		category: "Insurance",
		amount: 250,
		month: 9,
		year: 2025,
	},
	{
		id: "10",
		category: "Gym Membership",
		amount: 60,
		month: 9,
		year: 2025,
	},
	{
		id: "11",
		category: "Phone Bill",
		amount: 85,
		month: 8,
		year: 2025,
	},
	{
		id: "12",
		category: "Subscriptions",
		amount: 45,
		month: 1,
		year: 2024,
	},
];

// Sort options for budgets
const budgetSortOptions = [
	{ value: "month" as const, label: "Month" },
	{ value: "year" as const, label: "Year" },
	{ value: "amount" as const, label: "Amount" },
	{ value: "category" as const, label: "Category" },
];

export default function BudgetsPage() {
	const router = useRouter();

	// Budget table state
	const budgets = useTableState<(typeof sampleBudgets)[0], BudgetSortField>({
		data: sampleBudgets,
		defaultSortField: "month",
		defaultSortDirection: "desc",
		searchFields: ["category", "note"],
	});

	const handleEdit = (id: string) => {
		router.push(`/budgets/${id}/edit`);
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this budget?")) {
			console.log("Delete", id);
			// TODO: Add real delete functionality
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Page Header */}
			<PageHeader
				title="Budgets"
				description="Track your monthly Spending"
				actionButton={{
					label: "+ Add Budget",
					href: "/budgets/new",
				}}
			/>

			{/* Budgets Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				{/* Header with Search, Sort, and Count */}
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="All Budgets"
						description="Custom budgets for tracking expenses and income"
						badge={{
							label: "total",
							count: budgets.totalItems,
						}}
					/>

					<SearchAndSortBar
						searchValue={budgets.searchValue}
						setSearchValue={budgets.setSearchValue}
						sortField={budgets.sortField}
						setSortField={budgets.setSortField}
						sortDirection={budgets.sortDirection}
						setSortDirection={budgets.setSortDirection}
						setPage={budgets.setCurrentPage}
						sortOptions={budgetSortOptions}
					/>
				</div>

				{/* Empty State */}
				{budgets.isEmpty && (
					<EmptyState
						variant={budgets.searchValue ? "no-results" : "no-data"}
						icon="document"
						message={
							budgets.searchValue
								? "No budgets match your search"
								: "No budgets found"
						}
						action={
							budgets.searchValue
								? {
										label: "Clear Search",
										onClick: () => budgets.clearSearch,
									}
								: {
										label: "Create Your First Budget",
										href: "/budgets/new",
									}
						}
					/>
				)}

				{/* Budgets List */}
				{budgets.hasData && (
					<>
						<CardList
							items={budgets.paginatedData}
							getCardProps={(budget) => {
								const categoryDetails = getCategoryDetails(budget.category);
								return {
									id: budget.id,
									title: budget.category,
									data: {
										amount: budget.amount,
										month: budget.month,
										year: budget.year,
										note: budget.note,
										color: categoryDetails.color,
										icon: categoryDetails.icon,
									},
									type: "budget",
								};
							}}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
						<Pagination
							currentPage={budgets.currentPage}
							totalPages={budgets.totalPages}
							totalItems={budgets.totalItems}
							itemsPerPage={budgets.itemsPerPage}
							onPageChange={budgets.setCurrentPage}
						/>
					</>
				)}
			</section>
		</div>
	);
}

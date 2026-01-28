"use client";

import Card from "@/components/ui/Card";
import CardList from "@/components/ui/CardList";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchAndSortBar from "@/components/ui/SearchAndSortBar";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { useTableState } from "@/hooks/useTableState";
import { useRouter } from "next/navigation";

type TransactionSortField =
	| "date"
	| "amount"
	| "mainCategory"
	| "secondaryCategory";
type RecurringSortField =
	| "nextRun"
	| "amount"
	| "frequency"
	| "mainCategory"
	| "secondaryCategory"
	| "startDate"
	| "endDate";

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
	"Paycheck 1": { icon: "income", color: "#84CC16" },
	Paycheck: { icon: "income", color: "#84CC16" },
	"Emergency Fund": { icon: "savings", color: "#10B981" },
	VOO: { icon: "investments", color: "#F59E0B" },
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

const sampleTransactions = [
	{
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck 1",
		date: new Date("2025-12-20"),
		amount: 200,
	},
	{
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		date: new Date("2025-12-21"),
		amount: 50,
	},
	{
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Utilities",
		date: new Date("2025-12-22"),
		amount: 30.5,
	},
];

const sampleRecurring = [
	{
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck",
		frequency: "Weekly",
		startDate: "2025-01-05",
		nextRun: "2025-01-12",
		endDate: "2026-01-04",
		amount: 200,
	},
	{
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Rent",
		frequency: "Monthly",
		startDate: "2025-01-01",
		nextRun: "2025-02-01",
		endDate: "2025-12-31",
		amount: 1200,
	},
	{
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		frequency: "Weekly",
		startDate: "2025-06-01",
		nextRun: "2025-06-08",
		endDate: "2026-05-31",
		amount: 75,
	},
	{
		id: "4",
		mainCategory: "Expense",
		secondaryCategory: "Utilities",
		frequency: "Monthly",
		startDate: "2025-02-01",
		nextRun: "2025-03-01",
		endDate: "2026-01-31",
		amount: 130.5,
	},
	{
		id: "5",
		mainCategory: "Savings",
		secondaryCategory: "Emergency Fund",
		frequency: "Weekly",
		startDate: "2025-03-01",
		nextRun: "2025-03-08",
		endDate: "2026-03-01",
		amount: 100,
	},
	{
		id: "6",
		mainCategory: "Investment",
		secondaryCategory: "VOO",
		frequency: "Monthly",
		startDate: "2026-01-15",
		nextRun: "2026-02-15",
		endDate: "2026-12-15",
		amount: 250,
	},
];

// Sort options for transactions
const transactionSortOptions = [
	{ value: "date" as const, label: "Date" },
	{ value: "amount" as const, label: "Amount" },
	{ value: "mainCategory" as const, label: "Type" },
	{ value: "secondaryCategory" as const, label: "Category" },
];

// Sort options for recurring transactions
const recurringSortOptions = [
	{ value: "nextRun" as const, label: "Next Run" },
	{ value: "amount" as const, label: "Amount" },
	{ value: "frequency" as const, label: "Frequency" },
	{ value: "mainCategory" as const, label: "Type" },
	{ value: "secondaryCategory" as const, label: "Category" },
];

export default function TransactionsPage() {
	const router = useRouter();

	// Transaction table state
	const transactions = useTableState<
		(typeof sampleTransactions)[0],
		TransactionSortField
	>({
		data: sampleTransactions,
		defaultSortField: "date",
		defaultSortDirection: "desc",
		searchFields: ["mainCategory", "secondaryCategory"],
	});

	// Recurring table state
	const recurring = useTableState<
		(typeof sampleRecurring)[0],
		RecurringSortField
	>({
		data: sampleRecurring,
		defaultSortField: "nextRun",
		defaultSortDirection: "asc",
		searchFields: ["mainCategory", "secondaryCategory", "frequency"],
	});

	const handleEditTransaction = (id: string) => {
		router.push(`/transactions/${id}/edit`);
	};

	const handleEditRecurring = (id: string) => {
		router.push(`/recurring/${id}/edit`);
	};

	const handleDeleteTransaction = (id: string) => {
		if (confirm("Are you sure you want to delete this transaction?")) {
			console.log("Delete transaction", id);
		}
	};

	const handleDeleteRecurring = (id: string) => {
		if (
			confirm("Are you sure you want to delete this recurring transaction?")
		) {
			console.log("Delete recurring", id);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Page Header */}
			<PageHeader
				title="Transactions"
				description="Manage your income and expenses"
				actionButton={{
					label: "+ Add Transaction",
					href: "/transactions/new",
				}}
			/>

			{/* Recent Transactions Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="Recent Transactions"
						description="One-time income and expenses"
						badge={{
							label: "total",
							count: transactions.totalItems,
						}}
					/>

					<SearchAndSortBar
						searchValue={transactions.searchValue}
						setSearchValue={transactions.setSearchValue}
						sortField={transactions.sortField}
						setSortField={transactions.setSortField}
						sortDirection={transactions.sortDirection}
						setSortDirection={transactions.setSortDirection}
						setPage={transactions.setCurrentPage}
						sortOptions={transactionSortOptions}
					/>
				</div>

				{/* Empty State */}
				{transactions.isEmpty && (
					<EmptyState
						variant={transactions.searchValue ? "no-results" : "no-data"}
						icon="document"
						message={
							transactions.searchValue
								? "No transactions match your search"
								: "No transactions found"
						}
						action={
							transactions.searchValue
								? {
										label: "Clear Search",
										onClick: transactions.clearSearch,
									}
								: {
										label: "Create Your First Transaction",
										href: "/transactions/new",
									}
						}
					/>
				)}

				{/* Transactions List */}
				{transactions.hasData && (
					<>
						<CardList
							items={transactions.paginatedData}
							getCardProps={(tx) => {
								const categoryDetails = getCategoryDetails(
									tx.secondaryCategory,
								);
								return {
									id: tx.id,
									title: tx.mainCategory,
									data: {
										amount: tx.amount,
										date: tx.date,
										mainCategory: tx.mainCategory,
										secondaryCategory: tx.secondaryCategory,
										color: categoryDetails.color,
										icon: categoryDetails.icon,
									},
									type: "transaction",
								};
							}}
							onEdit={handleEditTransaction}
							onDelete={handleDeleteTransaction}
						/>

						<Pagination
							currentPage={transactions.currentPage}
							totalPages={transactions.totalPages}
							totalItems={transactions.totalItems}
							itemsPerPage={transactions.itemsPerPage}
							onPageChange={transactions.setCurrentPage}
						/>
					</>
				)}
			</section>

			{/* Recurring Transactions Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="Active Recurring"
						description="Automated transactions on a schedule"
						badge={{
							label: "active",
							count: recurring.totalItems,
						}}
					/>

					<SearchAndSortBar
						searchValue={recurring.searchValue}
						setSearchValue={recurring.setSearchValue}
						sortField={recurring.sortField}
						setSortField={recurring.setSortField}
						sortDirection={recurring.sortDirection}
						setSortDirection={recurring.setSortDirection}
						setPage={recurring.setCurrentPage}
						sortOptions={recurringSortOptions}
					/>
				</div>

				{/* Empty State */}
				{recurring.isEmpty && (
					<EmptyState
						variant={recurring.searchValue ? "no-results" : "no-data"}
						icon="recurring"
						message={
							recurring.searchValue
								? "No recurring transactions match your search"
								: "No recurring transactions found"
						}
						action={
							recurring.searchValue
								? {
										label: "Clear Search",
										onClick: recurring.clearSearch,
									}
								: {
										label: "Create Your First Recurring Transaction",
										href: "/recurring/new",
									}
						}
					/>
				)}

				{/* Recurring List */}
				{recurring.hasData && (
					<>
						<CardList
							items={recurring.paginatedData}
							getCardProps={(tx) => {
								const categoryDetails = getCategoryDetails(
									tx.secondaryCategory,
								);
								return {
									id: tx.id,
									title: tx.mainCategory,
									data: {
										amount: tx.amount,
										frequency: tx.frequency,
										nextRun: new Date(tx.nextRun),
										mainCategory: tx.mainCategory,
										secondaryCategory: tx.secondaryCategory,
										startDate: new Date(tx.startDate),
										endDate: new Date(tx.endDate),
										color: categoryDetails.color,
										icon: categoryDetails.icon,
									},
									type: "recurring",
								};
							}}
							onEdit={handleEditRecurring}
							onDelete={handleDeleteRecurring}
						/>

						<Pagination
							currentPage={recurring.currentPage}
							totalPages={recurring.totalPages}
							totalItems={recurring.totalItems}
							itemsPerPage={recurring.itemsPerPage}
							onPageChange={recurring.setCurrentPage}
						/>
					</>
				)}
			</section>
		</div>
	);
}

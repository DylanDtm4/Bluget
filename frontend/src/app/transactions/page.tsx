"use client";

import CardList from "@/components/ui/CardList";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchAndSortBar from "@/components/ui/SearchAndSortBar";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { useTableState } from "@/hooks/useTableState";
import { useTransactions } from "@/hooks/useTransactions";
import { useRecurring } from "@/hooks/useRecurring";
import { useRouter } from "next/navigation";
import type { Transaction, RecurringTransaction } from "@/lib/types";

type TxRow = {
	id: string;
	mainCategory: string;
	secondaryCategory: string;
	date: Date;
	amount: number;
	color: string;
	icon: string;
};

type RecRow = {
	id: string;
	mainCategory: string;
	secondaryCategory: string;
	frequency: string;
	nextRun: Date;
	startDate: Date;
	endDate: Date;
	amount: number;
	color: string;
	icon: string;
};

function toTxRow(tx: Transaction): TxRow {
	return {
		id: tx._id,
		mainCategory: tx.transactionType.charAt(0).toUpperCase() + tx.transactionType.slice(1),
		secondaryCategory: tx.category ?? "Uncategorized",
		date: new Date(tx.date),
		amount: tx.amount,
		color: tx.categoryColor ?? "#9CA3AF",
		icon: tx.categoryIcon ?? "other",
	};
}

function toRecRow(r: RecurringTransaction): RecRow {
	return {
		id: r._id,
		mainCategory: r.transactionType.charAt(0).toUpperCase() + r.transactionType.slice(1),
		secondaryCategory: r.category ?? "Uncategorized",
		frequency: r.frequency.charAt(0).toUpperCase() + r.frequency.slice(1),
		nextRun: new Date(r.nextRun),
		startDate: new Date(r.startDate),
		endDate: new Date(r.endDate),
		amount: r.amount,
		color: r.categoryColor ?? "#9CA3AF",
		icon: r.categoryIcon ?? "other",
	};
}

type TxSortField = "date" | "amount" | "mainCategory" | "secondaryCategory";
type RecSortField = "nextRun" | "amount" | "frequency" | "mainCategory" | "secondaryCategory";

const transactionSortOptions = [
	{ value: "date" as const, label: "Date" },
	{ value: "amount" as const, label: "Amount" },
	{ value: "mainCategory" as const, label: "Type" },
	{ value: "secondaryCategory" as const, label: "Category" },
];

const recurringSortOptions = [
	{ value: "nextRun" as const, label: "Next Run" },
	{ value: "amount" as const, label: "Amount" },
	{ value: "frequency" as const, label: "Frequency" },
	{ value: "mainCategory" as const, label: "Type" },
	{ value: "secondaryCategory" as const, label: "Category" },
];

export default function TransactionsPage() {
	const router = useRouter();
	const { transactions, loading: txLoading, deleteTransaction } = useTransactions();
	const { recurring, loading: recLoading, deleteRecurring } = useRecurring();

	const txRows = transactions.map(toTxRow);
	const recRows = recurring.map(toRecRow);

	const txTable = useTableState<TxRow, TxSortField>({
		data: txRows,
		defaultSortField: "date",
		defaultSortDirection: "desc",
		searchFields: ["mainCategory", "secondaryCategory"],
	});

	const recTable = useTableState<RecRow, RecSortField>({
		data: recRows,
		defaultSortField: "nextRun",
		defaultSortDirection: "asc",
		searchFields: ["mainCategory", "secondaryCategory", "frequency"],
	});

	const handleDeleteTransaction = async (id: string) => {
		if (confirm("Are you sure you want to delete this transaction?")) {
			await deleteTransaction(id);
		}
	};

	const handleDeleteRecurring = async (id: string) => {
		if (confirm("Are you sure you want to delete this recurring transaction?")) {
			await deleteRecurring(id);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<PageHeader
				title="Transactions"
				description="Manage your income and expenses"
				actionButton={{ label: "+ Add Transaction", href: "/transactions/new" }}
			/>

			{/* One-time Transactions */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="Recent Transactions"
						description="One-time income and expenses"
						badge={{ label: "total", count: txTable.totalItems }}
					/>
					<SearchAndSortBar
						searchValue={txTable.searchValue}
						setSearchValue={txTable.setSearchValue}
						sortField={txTable.sortField}
						setSortField={txTable.setSortField}
						sortDirection={txTable.sortDirection}
						setSortDirection={txTable.setSortDirection}
						setPage={txTable.setCurrentPage}
						sortOptions={transactionSortOptions}
					/>
				</div>

				{txLoading && <p className="text-sm text-gray-500 py-4 text-center">Loading...</p>}

				{!txLoading && txTable.isEmpty && (
					<EmptyState
						variant={txTable.searchValue ? "no-results" : "no-data"}
						icon="document"
						message={txTable.searchValue ? "No transactions match your search" : "No transactions found"}
						action={
							txTable.searchValue
								? { label: "Clear Search", onClick: txTable.clearSearch }
								: { label: "Create Your First Transaction", href: "/transactions/new" }
						}
					/>
				)}

				{!txLoading && txTable.hasData && (
					<>
						<CardList
							items={txTable.paginatedData}
							getCardProps={(tx) => ({
								id: tx.id,
								title: tx.mainCategory,
								data: {
									amount: tx.amount,
									date: tx.date,
									mainCategory: tx.mainCategory,
									secondaryCategory: tx.secondaryCategory,
									color: tx.color,
									icon: tx.icon,
								},
								type: "transaction",
							})}
							onEdit={(id) => router.push(`/transactions/${id}/edit`)}
							onDelete={handleDeleteTransaction}
						/>
						<Pagination
							currentPage={txTable.currentPage}
							totalPages={txTable.totalPages}
							totalItems={txTable.totalItems}
							itemsPerPage={txTable.itemsPerPage}
							onPageChange={txTable.setCurrentPage}
						/>
					</>
				)}
			</section>

			{/* Recurring Transactions */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				<div className="space-y-4 mb-6">
					<SectionHeader
						title="Active Recurring"
						description="Automated transactions on a schedule"
						badge={{ label: "active", count: recTable.totalItems }}
					/>
					<SearchAndSortBar
						searchValue={recTable.searchValue}
						setSearchValue={recTable.setSearchValue}
						sortField={recTable.sortField}
						setSortField={recTable.setSortField}
						sortDirection={recTable.sortDirection}
						setSortDirection={recTable.setSortDirection}
						setPage={recTable.setCurrentPage}
						sortOptions={recurringSortOptions}
					/>
				</div>

				{recLoading && <p className="text-sm text-gray-500 py-4 text-center">Loading...</p>}

				{!recLoading && recTable.isEmpty && (
					<EmptyState
						variant={recTable.searchValue ? "no-results" : "no-data"}
						icon="recurring"
						message={recTable.searchValue ? "No recurring transactions match your search" : "No recurring transactions found"}
						action={
							recTable.searchValue
								? { label: "Clear Search", onClick: recTable.clearSearch }
								: { label: "Create Your First Recurring Transaction", href: "/transactions/new" }
						}
					/>
				)}

				{!recLoading && recTable.hasData && (
					<>
						<CardList
							items={recTable.paginatedData}
							getCardProps={(r) => ({
								id: r.id,
								title: r.mainCategory,
								data: {
									amount: r.amount,
									frequency: r.frequency,
									nextRun: r.nextRun,
									mainCategory: r.mainCategory,
									secondaryCategory: r.secondaryCategory,
									startDate: r.startDate,
									endDate: r.endDate,
									color: r.color,
									icon: r.icon,
								},
								type: "recurring",
							})}
							onEdit={(id) => router.push(`/recurring/${id}/edit`)}
							onDelete={handleDeleteRecurring}
						/>
						<Pagination
							currentPage={recTable.currentPage}
							totalPages={recTable.totalPages}
							totalItems={recTable.totalItems}
							itemsPerPage={recTable.itemsPerPage}
							onPageChange={recTable.setCurrentPage}
						/>
					</>
				)}
			</section>
		</div>
	);
}

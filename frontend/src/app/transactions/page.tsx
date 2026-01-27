"use client";

import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";

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
type SortDirection = "asc" | "desc";

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
		date: "2025-12-20",
		amount: 200,
	},
	{
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		date: "2025-12-21",
		amount: 50,
	},
	{
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Utilities",
		date: "2025-12-22",
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

export default function TransactionsPage() {
	const router = useRouter();

	// Transaction state
	const [transactionSearch, setTransactionSearch] = useState("");
	const [transactionSortField, setTransactionSortField] =
		useState<TransactionSortField>("date");
	const [transactionSortDirection, setTransactionSortDirection] =
		useState<SortDirection>("desc");
	const [transactionPage, setTransactionPage] = useState(1);

	// Recurring state
	const [recurringSearch, setRecurringSearch] = useState("");
	const [recurringSortField, setRecurringSortField] =
		useState<RecurringSortField>("nextRun");
	const [recurringSortDirection, setRecurringSortDirection] =
		useState<SortDirection>("asc");
	const [recurringPage, setRecurringPage] = useState(1);

	const itemsPerPage = 5;

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

	// Filter and sort transactions
	const filteredAndSortedTransactions = useMemo(() => {
		let result = [...sampleTransactions];

		if (transactionSearch) {
			result = result.filter(
				(tx) =>
					tx.mainCategory
						.toLowerCase()
						.includes(transactionSearch.toLowerCase()) ||
					tx.secondaryCategory
						.toLowerCase()
						.includes(transactionSearch.toLowerCase()),
			);
		}

		result.sort((a, b) => {
			let aValue: string | number = a[transactionSortField as keyof typeof a];
			let bValue: string | number = b[transactionSortField as keyof typeof b];

			if (typeof aValue === "string" && typeof bValue === "string") {
				aValue = aValue.toLowerCase();
				bValue = bValue.toLowerCase();
			}

			if (transactionSortDirection === "asc") {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		return result;
	}, [transactionSearch, transactionSortField, transactionSortDirection]);

	// Filter and sort recurring
	const filteredAndSortedRecurring = useMemo(() => {
		let result = [...sampleRecurring];

		if (recurringSearch) {
			result = result.filter(
				(tx) =>
					tx.mainCategory
						.toLowerCase()
						.includes(recurringSearch.toLowerCase()) ||
					tx.secondaryCategory
						.toLowerCase()
						.includes(recurringSearch.toLowerCase()) ||
					tx.frequency.toLowerCase().includes(recurringSearch.toLowerCase()),
			);
		}

		result.sort((a, b) => {
			let aValue: string | number = a[recurringSortField as keyof typeof a];
			let bValue: string | number = b[recurringSortField as keyof typeof b];

			if (typeof aValue === "string" && typeof bValue === "string") {
				aValue = aValue.toLowerCase();
				bValue = bValue.toLowerCase();
			}

			if (recurringSortDirection === "asc") {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		return result;
	}, [recurringSearch, recurringSortField, recurringSortDirection]);

	// Pagination for transactions
	const transactionTotalPages = Math.ceil(
		filteredAndSortedTransactions.length / itemsPerPage,
	);
	const paginatedTransactions = useMemo(() => {
		const startIndex = (transactionPage - 1) * itemsPerPage;
		return filteredAndSortedTransactions.slice(
			startIndex,
			startIndex + itemsPerPage,
		);
	}, [filteredAndSortedTransactions, transactionPage]);

	// Pagination for recurring
	const recurringTotalPages = Math.ceil(
		filteredAndSortedRecurring.length / itemsPerPage,
	);
	const paginatedRecurring = useMemo(() => {
		const startIndex = (recurringPage - 1) * itemsPerPage;
		return filteredAndSortedRecurring.slice(
			startIndex,
			startIndex + itemsPerPage,
		);
	}, [filteredAndSortedRecurring, recurringPage]);

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Page Header */}
			<div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
				<div className="sm:ml-4">
					<h1 className="text-2xl md:text-3xl font-bold text-blue-900 whitespace-nowrap">
						Transactions
					</h1>
					<p className="hidden sm:block text-sm sm:text-base text-gray-600">
						Manage your income and expenses
					</p>
				</div>
				<Link href="/transactions/new" className="sm:mr-4">
					<button className="bg-[#354abd] hover:bg-[#1f1885] text-white font-semibold px-3 sm:px-6 py-2 rounded-lg transition-colors shadow-md text-xs sm:text-base whitespace-nowrap">
						+ Add Transaction
					</button>
				</Link>
			</div>

			{/* Recent Transactions Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
				<div className="space-y-4 mb-6">
					<div className="flex items-center justify-between gap-2">
						<div>
							<h2 className="text-md sm:text-xl font-bold text-blue-900 whitespace-nowrap">
								Recent Transactions
							</h2>
							<p className="hidden sm:block text-xs sm:text-sm text-gray-500">
								One-time income and expenses
							</p>
						</div>

						<span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
							{filteredAndSortedTransactions.length} total
						</span>
					</div>

					{/* Search and Sort Controls */}
					<div className="flex flex-col sm:flex-row gap-3">
						{/* Search Bar */}
						<div className="flex-1 relative">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={18}
							/>
							<input
								type="text"
								placeholder="Search transactions..."
								value={transactionSearch}
								onChange={(e) => {
									setTransactionSearch(e.target.value);
									setTransactionPage(1);
								}}
								className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-700"
							/>
						</div>

						{/* Sorting Controls */}
						<div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2 border border-blue-200">
							<ArrowUpDown className="text-blue-600" size={16} />
							<span className="text-xs sm:text-sm text-blue-700 font-medium">
								Sort:
							</span>
							<select
								value={transactionSortField}
								onChange={(e) => {
									setTransactionSortField(
										e.target.value as TransactionSortField,
									);
									setTransactionPage(1);
								}}
								className="text-xs sm:text-sm border-0 bg-transparent focus:outline-none focus:ring-0 cursor-pointer font-medium text-blue-900"
							>
								<option value="date">Date</option>
								<option value="amount">Amount</option>
								<option value="mainCategory">Type</option>
								<option value="secondaryCategory">Category</option>
							</select>

							<button
								onClick={() => {
									setTransactionSortDirection((prev) =>
										prev === "asc" ? "desc" : "asc",
									);
									setTransactionPage(1);
								}}
								className="p-1 hover:bg-blue-100 rounded transition-colors"
								title={
									transactionSortDirection === "asc"
										? "Ascending"
										: "Descending"
								}
							>
								{transactionSortDirection === "asc" ? (
									<ChevronUp className="w-4 h-4 text-blue-700" />
								) : (
									<ChevronDown className="w-4 h-4 text-blue-700" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Empty State */}
				{filteredAndSortedTransactions.length === 0 && (
					<div className="text-center py-12 sm:py-16">
						<div className="text-blue-200 mb-4">
							<svg
								className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<p className="text-gray-600 mb-4 text-sm sm:text-base font-medium">
							{transactionSearch
								? "No transactions match your search"
								: "No transactions found"}
						</p>
						{transactionSearch ? (
							<button
								onClick={() => {
									setTransactionSearch("");
									setTransactionPage(1);
								}}
								className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
							>
								Clear Search
							</button>
						) : (
							<Link href="/transactions/new">
								<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors shadow-md text-sm sm:text-base">
									Create Your First Transaction
								</button>
							</Link>
						)}
					</div>
				)}

				{/* Transactions List */}
				{paginatedTransactions.length > 0 && (
					<>
						<div className="space-y-3">
							{paginatedTransactions.map((tx) => {
								const categoryDetails = getCategoryDetails(
									tx.secondaryCategory,
								);
								return (
									<Card
										key={tx.id}
										id={tx.id}
										title={tx.mainCategory}
										data={{
											amount: tx.amount,
											date: tx.date,
											mainCategory: tx.mainCategory,
											secondaryCategory: tx.secondaryCategory,
											color: categoryDetails.color,
											icon: categoryDetails.icon,
										}}
										type="transaction"
										onEdit={() => handleEditTransaction(tx.id)}
										onDelete={() => handleDeleteTransaction(tx.id)}
									/>
								);
							})}
						</div>

						{/* Pagination */}
						{transactionTotalPages > 1 && (
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
								<div className="text-xs sm:text-sm text-gray-600">
									Showing{" "}
									<span className="font-semibold text-blue-900">
										{(transactionPage - 1) * itemsPerPage + 1}
									</span>{" "}
									to{" "}
									<span className="font-semibold text-blue-900">
										{Math.min(
											transactionPage * itemsPerPage,
											filteredAndSortedTransactions.length,
										)}
									</span>{" "}
									of{" "}
									<span className="font-semibold text-blue-900">
										{filteredAndSortedTransactions.length}
									</span>{" "}
									results
								</div>

								<div className="flex items-center gap-2">
									<button
										onClick={() => {
											setTransactionPage(transactionPage - 1);
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										disabled={transactionPage === 1}
										className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
											transactionPage === 1
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-blue-100 text-blue-700 hover:bg-blue-200"
										}`}
									>
										Previous
									</button>

									<div className="flex gap-1">
										{Array.from(
											{ length: transactionTotalPages },
											(_, i) => i + 1,
										).map((pageNum) => {
											const showPage =
												pageNum === 1 ||
												pageNum === transactionTotalPages ||
												(pageNum >= transactionPage - 1 &&
													pageNum <= transactionPage + 1);

											const showEllipsis =
												(pageNum === 2 && transactionPage > 3) ||
												(pageNum === transactionTotalPages - 1 &&
													transactionPage < transactionTotalPages - 2);

											if (!showPage && !showEllipsis) return null;

											if (showEllipsis) {
												return (
													<span
														key={pageNum}
														className="px-2 sm:px-3 py-1 text-gray-500 text-xs sm:text-sm"
													>
														...
													</span>
												);
											}

											return (
												<button
													key={pageNum}
													onClick={() => {
														setTransactionPage(pageNum);
														window.scrollTo({ top: 0, behavior: "smooth" });
													}}
													className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
														transactionPage === pageNum
															? "bg-blue-600 text-white shadow-md"
															: "bg-gray-100 text-gray-700 hover:bg-gray-200"
													}`}
												>
													{pageNum}
												</button>
											);
										})}
									</div>

									<button
										onClick={() => {
											setTransactionPage(transactionPage + 1);
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										disabled={transactionPage === transactionTotalPages}
										className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
											transactionPage === transactionTotalPages
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-blue-100 text-blue-700 hover:bg-blue-200"
										}`}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</section>

			{/* Recurring Transactions Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				<div className="space-y-4 mb-6">
					<div className="flex items-center justify-between gap-2">
						<div>
							<h2 className="text-md sm:text-xl font-bold text-blue-900 whitespace-nowrap">
								Active Recurring
							</h2>
							<p className="hidden sm:block text-xs sm:text-sm text-gray-500">
								Automated transactions on a schedule
							</p>
						</div>

						<span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
							{filteredAndSortedRecurring.length} active
						</span>
					</div>

					{/* Search and Sort Controls */}
					<div className="flex flex-col sm:flex-row gap-3">
						{/* Search Bar */}
						<div className="flex-1 relative">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={18}
							/>
							<input
								type="text"
								placeholder="Search recurring..."
								value={recurringSearch}
								onChange={(e) => {
									setRecurringSearch(e.target.value);
									setRecurringPage(1);
								}}
								className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-700"
							/>
						</div>

						{/* Sorting Controls */}
						<div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2 border border-blue-200">
							<ArrowUpDown className="text-blue-600" size={16} />
							<span className="text-xs sm:text-sm text-blue-700 font-medium">
								Sort:
							</span>
							<select
								value={recurringSortField}
								onChange={(e) => {
									setRecurringSortField(e.target.value as RecurringSortField);
									setRecurringPage(1);
								}}
								className="text-xs sm:text-sm border-0 bg-transparent focus:outline-none focus:ring-0 cursor-pointer font-medium text-blue-900"
							>
								<option value="nextRun">Next Run</option>
								<option value="amount">Amount</option>
								<option value="frequency">Frequency</option>
								<option value="mainCategory">Type</option>
								<option value="secondaryCategory">Category</option>
							</select>

							<button
								onClick={() => {
									setRecurringSortDirection((prev) =>
										prev === "asc" ? "desc" : "asc",
									);
									setRecurringPage(1);
								}}
								className="p-1 hover:bg-blue-100 rounded transition-colors"
								title={
									recurringSortDirection === "asc" ? "Ascending" : "Descending"
								}
							>
								{recurringSortDirection === "asc" ? (
									<ChevronUp className="w-4 h-4 text-blue-700" />
								) : (
									<ChevronDown className="w-4 h-4 text-blue-700" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Empty State */}
				{filteredAndSortedRecurring.length === 0 && (
					<div className="text-center py-12 sm:py-16">
						<div className="text-blue-200 mb-4">
							<svg
								className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
						</div>
						<p className="text-gray-600 mb-4 text-sm sm:text-base font-medium">
							{recurringSearch
								? "No recurring transactions match your search"
								: "No recurring transactions found"}
						</p>
						{recurringSearch ? (
							<button
								onClick={() => {
									setRecurringSearch("");
									setRecurringPage(1);
								}}
								className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
							>
								Clear Search
							</button>
						) : (
							<Link href="/recurring/new">
								<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors shadow-md text-sm sm:text-base">
									Create Your First Recurring Transaction
								</button>
							</Link>
						)}
					</div>
				)}

				{/* Recurring List */}
				{paginatedRecurring.length > 0 && (
					<>
						<div className="space-y-3">
							{paginatedRecurring.map((tx) => {
								const categoryDetails = getCategoryDetails(
									tx.secondaryCategory,
								);
								return (
									<Card
										key={tx.id}
										id={tx.id}
										title={tx.mainCategory}
										data={{
											amount: tx.amount,
											frequency: tx.frequency,
											nextRun: tx.nextRun,
											mainCategory: tx.mainCategory,
											secondaryCategory: tx.secondaryCategory,
											startDate: new Date(tx.startDate),
											endDate: new Date(tx.endDate),
											color: categoryDetails.color,
											icon: categoryDetails.icon,
										}}
										type="recurring"
										onEdit={() => handleEditRecurring(tx.id)}
										onDelete={() => handleDeleteRecurring(tx.id)}
									/>
								);
							})}
						</div>

						{/* Pagination */}
						{recurringTotalPages > 1 && (
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
								<div className="text-xs sm:text-sm text-gray-600">
									Showing{" "}
									<span className="font-semibold text-blue-900">
										{(recurringPage - 1) * itemsPerPage + 1}
									</span>{" "}
									to{" "}
									<span className="font-semibold text-blue-900">
										{Math.min(
											recurringPage * itemsPerPage,
											filteredAndSortedRecurring.length,
										)}
									</span>{" "}
									of{" "}
									<span className="font-semibold text-blue-900">
										{filteredAndSortedRecurring.length}
									</span>{" "}
									results
								</div>

								<div className="flex items-center gap-2">
									<button
										onClick={() => {
											setRecurringPage(recurringPage - 1);
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										disabled={recurringPage === 1}
										className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
											recurringPage === 1
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-blue-100 text-blue-700 hover:bg-blue-200"
										}`}
									>
										Previous
									</button>

									<div className="flex gap-1">
										{Array.from(
											{ length: recurringTotalPages },
											(_, i) => i + 1,
										).map((pageNum) => {
											const showPage =
												pageNum === 1 ||
												pageNum === recurringTotalPages ||
												(pageNum >= recurringPage - 1 &&
													pageNum <= recurringPage + 1);

											const showEllipsis =
												(pageNum === 2 && recurringPage > 3) ||
												(pageNum === recurringTotalPages - 1 &&
													recurringPage < recurringTotalPages - 2);

											if (!showPage && !showEllipsis) return null;

											if (showEllipsis) {
												return (
													<span
														key={pageNum}
														className="px-2 sm:px-3 py-1 text-gray-500 text-xs sm:text-sm"
													>
														...
													</span>
												);
											}

											return (
												<button
													key={pageNum}
													onClick={() => {
														setRecurringPage(pageNum);
														window.scrollTo({ top: 0, behavior: "smooth" });
													}}
													className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
														recurringPage === pageNum
															? "bg-blue-600 text-white shadow-md"
															: "bg-gray-100 text-gray-700 hover:bg-gray-200"
													}`}
												>
													{pageNum}
												</button>
											);
										})}
									</div>

									<button
										onClick={() => {
											setRecurringPage(recurringPage + 1);
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										disabled={recurringPage === recurringTotalPages}
										className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
											recurringPage === recurringTotalPages
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-blue-100 text-blue-700 hover:bg-blue-200"
										}`}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</section>
		</div>
	);
}

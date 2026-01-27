"use client";

import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";

type SortField = "amount" | "month" | "year" | "category";
type SortDirection = "asc" | "desc";

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

export default function BudgetsPage() {
	const router = useRouter();

	// State
	const [search, setSearch] = useState("");
	const [sortField, setSortField] = useState<SortField>("month");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	// Handlers that reset page
	const handleSearchChange = (value: string) => {
		setSearch(value);
		setCurrentPage(1);
	};

	const handleSortFieldChange = (field: SortField) => {
		setSortField(field);
		setCurrentPage(1);
	};

	const handleSortDirectionToggle = () => {
		setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		setCurrentPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleEdit = (id: string) => {
		router.push(`/budgets/${id}/edit`);
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this budget?")) {
			console.log("Delete", id);
			// TODO: Add real delete functionality
		}
	};

	// Filter and sort budgets
	const filteredAndSortedBudgets = useMemo(() => {
		let result = [...sampleBudgets];

		// Apply search filter
		if (search) {
			result = result.filter(
				(budget) =>
					budget.category.toLowerCase().includes(search.toLowerCase()) ||
					budget.note?.toLowerCase().includes(search.toLowerCase()),
			);
		}

		// Apply sorting
		result.sort((a, b) => {
			let aValue: string | number = a[sortField];
			let bValue: string | number = b[sortField];

			// Handle string comparison (category)
			if (typeof aValue === "string" && typeof bValue === "string") {
				aValue = aValue.toLowerCase();
				bValue = bValue.toLowerCase();
			}

			if (sortDirection === "asc") {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		return result;
	}, [search, sortField, sortDirection]);

	// Pagination
	const totalPages = Math.ceil(filteredAndSortedBudgets.length / itemsPerPage);
	const paginatedBudgets = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredAndSortedBudgets.slice(
			startIndex,
			startIndex + itemsPerPage,
		);
	}, [filteredAndSortedBudgets, currentPage]);

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Page Header */}
			<div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
				<div className="sm:ml-4">
					<h1 className="text-2xl md:text-3xl font-bold text-blue-900 whitespace-nowrap">
						Budgets
					</h1>
					<p className="hidden sm:block text-sm sm:text-base text-gray-600">
						Track your monthly spending
					</p>
				</div>
				<Link href="/budgets/new" className="sm:mr-4">
					<button className="bg-[#354abd] hover:bg-[#1f1885] text-white font-semibold px-3 sm:px-6 py-2 rounded-lg transition-colors shadow-md text-xs sm:text-base whitespace-nowrap">
						+ Add Budget
					</button>
				</Link>
			</div>

			{/* Budgets Section */}
			<section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
				{/* Header with Search, Sort, and Count */}
				<div className="space-y-4 mb-6">
					<div className="flex items-center justify-between gap-2">
						<div>
							<h2 className="text-md sm:text-xl font-bold text-blue-900 whitespace-nowrap">
								All Budgets
							</h2>
							<p className="hidden sm:block text-xs sm:text-sm text-gray-500">
								Custom budgets for tracking expenses and income
							</p>
						</div>

						<span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
							{filteredAndSortedBudgets.length} total
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
								placeholder="Search budgets..."
								value={search}
								onChange={(e) => handleSearchChange(e.target.value)}
								className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-700"
							/>
						</div>

						{/* Sorting Controls */}
						<div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2 border border-blue-200">
							<ArrowUpDown className="text-blue-600" size={16} />
							<span className="text-xs sm:text-sm text-blue-700 font-medium">
								Sort:
							</span>
							{/* Sort Field Dropdown */}
							<select
								value={sortField}
								onChange={(e) =>
									handleSortFieldChange(e.target.value as SortField)
								}
								className="text-xs sm:text-sm border-0 bg-transparent focus:outline-none focus:ring-0 cursor-pointer font-medium text-blue-900"
							>
								<option value="month">Month</option>
								<option value="year">Year</option>
								<option value="amount">Amount</option>
								<option value="category">Category</option>
							</select>

							{/* Sort Direction Toggle */}
							<button
								onClick={handleSortDirectionToggle}
								className="p-1 hover:bg-blue-100 rounded transition-colors"
								title={sortDirection === "asc" ? "Ascending" : "Descending"}
							>
								{sortDirection === "asc" ? (
									<ChevronUp className="w-4 h-4 text-blue-700" />
								) : (
									<ChevronDown className="w-4 h-4 text-blue-700" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Empty State */}
				{filteredAndSortedBudgets.length === 0 && (
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
							{search ? "No budgets match your search" : "No budgets found"}
						</p>
						{search ? (
							<button
								onClick={() => handleSearchChange("")}
								className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
							>
								Clear Search
							</button>
						) : (
							<Link href="/budgets/new">
								<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors shadow-md text-sm sm:text-base">
									Create Your First Budget
								</button>
							</Link>
						)}
					</div>
				)}

				{/* Budgets List */}
				{paginatedBudgets.length > 0 && (
					<>
						<div className="space-y-3">
							{paginatedBudgets.map((budget) => {
								const categoryDetails = getCategoryDetails(budget.category);
								return (
									<Card
										key={budget.id}
										id={budget.id}
										title={budget.category}
										data={{
											amount: budget.amount,
											month: budget.month,
											year: budget.year,
											note: budget.note,
											color: categoryDetails.color,
											icon: categoryDetails.icon,
										}}
										type="budget"
										onEdit={() => handleEdit(budget.id)}
										onDelete={() => handleDelete(budget.id)}
									/>
								);
							})}
						</div>

						{/* Pagination - keeping the same */}
						{totalPages > 1 && (
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
								{/* Page Info */}
								<div className="text-xs sm:text-sm text-gray-600">
									Showing{" "}
									<span className="font-semibold text-blue-900">
										{(currentPage - 1) * itemsPerPage + 1}
									</span>{" "}
									to{" "}
									<span className="font-semibold text-blue-900">
										{Math.min(
											currentPage * itemsPerPage,
											filteredAndSortedBudgets.length,
										)}
									</span>{" "}
									of{" "}
									<span className="font-semibold text-blue-900">
										{filteredAndSortedBudgets.length}
									</span>{" "}
									results
								</div>

								{/* Pagination Controls */}
								<div className="flex items-center gap-2">
									{/* Previous Button */}
									<button
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 1}
										className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
											currentPage === 1
												? "bg-gray-100 text-gray-400 cursor-not-allowed"
												: "bg-blue-100 text-blue-700 hover:bg-blue-200"
										}`}
									>
										Previous
									</button>

									{/* Page Numbers */}
									<div className="flex gap-1">
										{Array.from({ length: totalPages }, (_, i) => i + 1).map(
											(pageNum) => {
												const showPage =
													pageNum === 1 ||
													pageNum === totalPages ||
													(pageNum >= currentPage - 1 &&
														pageNum <= currentPage + 1);

												const showEllipsis =
													(pageNum === 2 && currentPage > 3) ||
													(pageNum === totalPages - 1 &&
														currentPage < totalPages - 2);

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
														onClick={() => handlePageChange(pageNum)}
														className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
															currentPage === pageNum
																? "bg-blue-600 text-white shadow-md"
																: "bg-gray-100 text-gray-700 hover:bg-gray-200"
														}`}
													>
														{pageNum}
													</button>
												);
											},
										)}
									</div>

									{/* Next Button */}
									<button
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages}
										className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
											currentPage === totalPages
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

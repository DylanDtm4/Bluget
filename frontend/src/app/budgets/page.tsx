"use client";

import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState, useMemo } from "react";

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
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
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
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">Track your monthly budgets</p>
        </div>
        <Link href="/budgets/new">
          <Button variant="primary" size="large">
            + Add Budget
          </Button>
        </Link>
      </div>

      {/* Budgets Section */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header with Search, Sort, and Count */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                All Budgets
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Custom budgets for tracking expenses and income
              </p>
            </div>

            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {filteredAndSortedBudgets.length} total
            </span>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex-1 text-gray-600">
              <input
                type="text"
                placeholder="Search budgets by category or note..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
              <span className="text-sm text-gray-600 font-medium px-2">
                Sort by:
              </span>
              {/* Sort Field Dropdown */}
              <select
                value={sortField}
                onChange={(e) =>
                  handleSortFieldChange(e.target.value as SortField)
                }
                className="text-sm border-0 bg-transparent focus:outline-none focus:ring-0 cursor-pointer font-medium text-gray-700"
              >
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>

              {/* Sort Direction Toggle */}
              <button
                onClick={handleSortDirectionToggle}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                title={sortDirection === "asc" ? "Ascending" : "Descending"}
              >
                {sortDirection === "asc" ? (
                  // Up arrow
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  // Down arrow
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedBudgets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
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
            <p className="text-gray-500 mb-4">
              {search ? "No budgets match your search" : "No budgets found"}
            </p>
            {search ? (
              <Button
                variant="secondary"
                onClick={() => handleSearchChange("")}
              >
                Clear Search
              </Button>
            ) : (
              <Link href="/budgets/new">
                <Button variant="primary">Create Your First Budget</Button>
              </Link>
            )}
          </div>
        )}

        {/* Budgets List */}
        {paginatedBudgets.length > 0 && (
          <>
            <div className="space-y-3">
              {paginatedBudgets.map((budget) => (
                <Card
                  key={budget.id}
                  id={budget.id}
                  title={budget.category}
                  data={{
                    amount: budget.amount,
                    month: budget.month,
                    year: budget.year,
                    note: budget.note,
                  }}
                  type="budget"
                  onEdit={() => handleEdit(budget.id)}
                  onDelete={() => handleDelete(budget.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredAndSortedBudgets.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAndSortedBudgets.length}
                  </span>{" "}
                  results
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="secondary"
                    size="small"
                  >
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => {
                        // Show first page, last page, current page, and adjacent pages
                        const showPage =
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 &&
                            pageNum <= currentPage + 1);

                        // Show ellipsis
                        const showEllipsis =
                          (pageNum === 2 && currentPage > 3) ||
                          (pageNum === totalPages - 1 &&
                            currentPage < totalPages - 2);

                        if (!showPage && !showEllipsis) return null;

                        if (showEllipsis) {
                          return (
                            <span
                              key={pageNum}
                              className="px-3 py-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-1 rounded transition-colors ${
                              currentPage === pageNum
                                ? "bg-blue-500 text-white font-medium"
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
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="secondary"
                    size="small"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

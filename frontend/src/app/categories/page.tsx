"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

type SortField = "color" | "category";
type SortDirection = "asc" | "desc";

type Category = {
  id: string;
  category: string;
  color: string;
};

const sampleCategories: Category[] = [
  {
    id: "1",
    category: "Groceries",
    color: "#10B981", // Green
  },
  {
    id: "2",
    category: "Rent",
    color: "#3B82F6", // Blue
  },
  {
    id: "3",
    category: "Utilities",
    color: "#8B5CF6", // Purple
  },
  {
    id: "4",
    category: "Transportation",
    color: "#F59E0B", // Amber
  },
  {
    id: "5",
    category: "Entertainment",
    color: "#EC4899", // Pink
  },
  {
    id: "6",
    category: "Dining Out",
    color: "#EF4444", // Red
  },
  {
    id: "7",
    category: "Healthcare",
    color: "#06B6D4", // Cyan
  },
  {
    id: "8",
    category: "Shopping",
    color: "#F97316", // Orange
  },
  {
    id: "9",
    category: "Subscriptions",
    color: "#6366F1", // Indigo
  },
  {
    id: "10",
    category: "Fitness",
    color: "#14B8A6", // Teal
  },
  {
    id: "11",
    category: "Education",
    color: "#A855F7", // Violet
  },
  {
    id: "12",
    category: "Savings",
    color: "#84CC16", // Lime
  },
];

export default function CategoriesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("category");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (value: SortField) => {
    setSortField(value);
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
    router.push(`/categories/${id}/edit`);
    console.log("Edit", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete", id);
  };

  const filteredAndSortedCategories = useMemo(() => {
    let result = [...sampleCategories];

    if (search) {
      result = result.filter((cat) =>
        cat.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

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

  const totalPages = Math.ceil(
    filteredAndSortedCategories.length / itemsPerPage,
  );
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCategories.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [filteredAndSortedCategories, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Organize your transactions by category
          </p>
        </div>
        <Link href="/categories/new">
          <Button variant="primary" size="large">
            + Add Category
          </Button>
        </Link>
      </div>

      {/* Categories Section */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header with Search, Sort, and Count */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                All Categories
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Custom categories for tracking expenses and income
              </p>
            </div>

            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {filteredAndSortedCategories.length} total
            </span>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search Bar */}
            <div className="flex-1 text-gray-600">
              <input
                type="text"
                placeholder="Search categories by name or color..."
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
                <option value="category">Category</option>
                <option value="color">Color</option>
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

          {/* Empty State */}
          {filteredAndSortedCategories.length === 0 && (
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
                {search
                  ? "No categories match your search"
                  : "No categories found"}
              </p>
              {search ? (
                <Button
                  variant="secondary"
                  onClick={() => handleSearchChange("")}
                >
                  Clear Search
                </Button>
              ) : (
                <Link href="/categories/new">
                  <Button variant="primary">Create Your First Category</Button>
                </Link>
              )}
            </div>
          )}
          {/* Categories List */}
          {paginatedCategories.length > 0 && (
            <>
              <div className="space-y-3">
                {paginatedCategories.map((cat) => (
                  <Card
                    key={cat.id}
                    id={cat.id}
                    title={cat.category}
                    data={{
                      color: cat.color,
                    }}
                    type="category"
                    onEdit={() => handleEdit(cat.id)}
                    onDelete={() => handleDelete(cat.id)}
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
                        filteredAndSortedCategories.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredAndSortedCategories.length}
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
        </div>
      </section>
    </div>
  );
}

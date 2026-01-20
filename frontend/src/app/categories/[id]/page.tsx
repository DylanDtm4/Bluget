"use client";

import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";

type Category = {
  id: string;
  category: string;
  color: string;
};

// Sample data - replace with actual API call
const sampleCategories: Record<string, Category> = {
  "1": {
    id: "1",
    category: "Subscriptions",
    color: "#8B5CF6", // Purple
  },
  "2": {
    id: "2",
    category: "Groceries",
    color: "#10B981", // Green
  },
  "3": {
    id: "3",
    category: "Rent",
    color: "#3B82F6", // Blue
  },
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CategoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Get category data - replace with actual API call
  const category = sampleCategories[id as string];

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Category Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link href="/categories">
            <Button variant="primary">Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/categories/${id}/edit`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this category?")) {
      console.log("Delete category", id);
      // TODO: Add real delete functionality
      router.push("/categories");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Back Button */}
      <Link href="/categories">
        <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Categories
        </button>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {/* Color indicator dot */}
            {category.color && (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {category.category}
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleEdit}>
            Edit Category
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

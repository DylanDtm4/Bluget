"use client";

import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";

type Budget = {
  id: string;
  category: string;
  amount: number;
  month: number;
  year: number;
  note?: string;
  color?: string; // hex color for the category
};

// Sample data - replace with actual API call
const sampleBudgets: Record<string, Budget> = {
  "1": {
    id: "1",
    category: "Subscriptions",
    amount: 50,
    month: 12,
    year: 2025,
    note: "Netflix, Spotify, etc.",
    color: "#8B5CF6", // Purple
  },
  "2": {
    id: "2",
    category: "Groceries",
    amount: 200,
    month: 12,
    year: 2025,
    note: "Weekly shopping",
    color: "#10B981", // Green
  },
  "3": {
    id: "3",
    category: "Rent",
    amount: 1200,
    month: 12,
    year: 2025,
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

export default function BudgetDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Get budget data - replace with actual API call
  const budget = sampleBudgets[id as string];

  if (!budget) {
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
            Budget Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The budget you're looking for doesn't exist.
          </p>
          <Link href="/budgets">
            <Button variant="primary">Back to Budgets</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/budgets/${id}/edit`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this budget?")) {
      console.log("Delete budget", id);
      // TODO: Add real delete functionality
      router.push("/budgets");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Back Button */}
      <Link href="/budgets">
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
          Back to Budgets
        </button>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {/* Color indicator dot */}
            {budget.color && (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: budget.color }}
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {budget.category}
            </h1>
          </div>
          <p className="text-gray-600 mt-1">
            {monthNames[budget.month - 1]} {budget.year}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleEdit}>
            Edit Budget
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {/* Budget Overview Card */}
      <div
        className="bg-white rounded-lg shadow-sm border-2 p-6 relative overflow-hidden"
        style={{ borderColor: budget.color || "#E5E7EB" }}
      >
        {/* Colored accent bar */}
        {budget.color && (
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: budget.color }}
          />
        )}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-1">
          Budget Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div
            className="p-4 rounded-lg border-2 relative overflow-hidden"
            style={{
              borderColor: budget.color || "#E5E7EB",
              backgroundColor: budget.color ? `${budget.color}10` : "#F9FAFB",
            }}
          >
            <div className="text-sm font-medium text-gray-500 mb-1">
              Budget Amount
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${budget.amount.toFixed(2)}
            </div>
          </div>

          {/* Period */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Period</div>
            <div className="text-3xl font-bold text-gray-900">
              {monthNames[budget.month - 1].slice(0, 3)} {budget.year}
            </div>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>

        <div className="space-y-4">
          {/* Category */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Category</span>
            <div className="flex items-center gap-2">
              {budget.color && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: budget.color }}
                />
              )}
              <span className="text-gray-900 font-semibold">
                {budget.category}
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Amount</span>
            <span className="text-gray-900">${budget.amount.toFixed(2)}</span>
          </div>

          {/* Note */}
          {budget.note && (
            <div className="py-3">
              <div className="text-gray-600 font-medium mb-2">Note</div>
              <div className="text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {budget.note}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spending Tracking Card - Placeholder for future feature */}
      <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Spending Tracker
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Track your actual spending against this budget
        </p>

        <div className="text-center py-8">
          <div className="text-blue-300 mb-3">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-gray-600">Spending tracking coming soon!</p>
          <p className="text-sm text-gray-500 mt-1">
            Link transactions to see how much you've spent
          </p>
        </div>
      </div>
    </div>
  );
}

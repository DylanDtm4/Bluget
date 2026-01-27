"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, TrendingUp } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

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

// Sample data - replace with actual API call
const sampleBudgets: Record<string, Budget> = {
	"1": {
		id: "1",
		category: "Subscriptions",
		amount: 50,
		month: 12,
		year: 2025,
		note: "Netflix, Spotify, etc.",
	},
	"2": {
		id: "2",
		category: "Groceries",
		amount: 200,
		month: 12,
		year: 2025,
		note: "Weekly shopping",
	},
	"3": {
		id: "3",
		category: "Rent",
		amount: 1200,
		month: 12,
		year: 2025,
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
			<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center">
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
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
							Budget Not Found
						</h2>
						<p className="text-gray-600 mb-6 text-sm sm:text-base">
							The budget you&apos;re looking for doesn&apos;t exist.
						</p>
						<Link href="/budgets">
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md mb-4">
								Back to Budgets
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// Get category details (icon and color)
	const categoryDetails = getCategoryDetails(budget.category);
	const CategoryIcon = CATEGORY_ICONS.find(
		(cat) => cat.id === categoryDetails.icon,
	)?.Icon;

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
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
				{/* Back Button */}
				<Link href="/budgets">
					<button className="flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium text-sm sm:text-base mb-4">
						<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
						Back to Budgets
					</button>
				</Link>

				{/* Header */}
				<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div className="flex-1">
							<div className="flex items-center gap-3 mb-2">
								{/* Icon with color background */}
								<div
									className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm"
									style={{ backgroundColor: categoryDetails.color }}
								>
									{CategoryIcon && (
										<CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
									)}
								</div>
								<h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
									{budget.category}
								</h1>
							</div>
							<p className="text-gray-600 text-sm sm:text-base">
								{monthNames[budget.month - 1]} {budget.year}
							</p>
						</div>
						<div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
							<button
								onClick={handleEdit}
								className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
							>
								<Edit size={16} />
								Edit
							</button>
							<button
								onClick={handleDelete}
								className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
							>
								<Trash2 size={16} />
								Delete
							</button>
						</div>
					</div>
				</div>

				{/* Budget Overview Card */}
				<div
					className="bg-white rounded-lg shadow-md border-2 p-4 sm:p-6 relative overflow-hidden"
					style={{ borderColor: categoryDetails.color }}
				>
					{/* Colored accent bar */}
					<div
						className="absolute top-0 left-0 right-0 h-1"
						style={{ backgroundColor: categoryDetails.color }}
					/>
					<h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 mt-1">
						Budget Overview
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
						{/* Amount */}
						<div
							className="p-4 sm:p-5 rounded-lg border-2 relative overflow-hidden"
							style={{
								borderColor: categoryDetails.color,
								backgroundColor: `${categoryDetails.color}10`,
							}}
						>
							<div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
								Budget Amount
							</div>
							<div className="text-2xl sm:text-3xl font-bold text-gray-900">
								${budget.amount.toFixed(2)}
							</div>
						</div>

						{/* Period */}
						<div className="p-4 sm:p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
							<div className="text-xs sm:text-sm font-medium text-blue-700 mb-1">
								Period
							</div>
							<div className="text-2xl sm:text-3xl font-bold text-blue-900">
								{monthNames[budget.month - 1].slice(0, 3)} {budget.year}
							</div>
						</div>
					</div>
				</div>

				{/* Details Card */}
				<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
					<h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">
						Details
					</h2>

					<div className="space-y-3 sm:space-y-4">
						{/* Category */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Category
							</span>
							<div className="flex items-center gap-2">
								{/* Icon */}
								<div
									className="w-8 h-8 rounded-full flex items-center justify-center"
									style={{ backgroundColor: categoryDetails.color }}
								>
									{CategoryIcon && (
										<CategoryIcon className="w-4 h-4 text-white" />
									)}
								</div>
								<span className="text-gray-900 font-semibold text-sm sm:text-base">
									{budget.category}
								</span>
							</div>
						</div>

						{/* Amount */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Amount
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								${budget.amount.toFixed(2)}
							</span>
						</div>

						{/* Month & Year */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Period
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{monthNames[budget.month - 1]} {budget.year}
							</span>
						</div>

						{/* Note */}
						{budget.note && (
							<div className="py-3">
								<div className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
									Note
								</div>
								<div className="text-gray-900 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-sm sm:text-base">
									{budget.note}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Spending Tracking Card - Placeholder for future feature */}
				<div className="bg-linear-to-br from-blue-100 to-blue-50 rounded-lg shadow-md border-2 border-blue-300 p-4 sm:p-6">
					<div className="flex items-center gap-2 mb-2">
						<TrendingUp className="text-blue-600" size={20} />
						<h2 className="text-lg sm:text-xl font-bold text-blue-900">
							Spending Tracker
						</h2>
					</div>
					<p className="text-xs sm:text-sm text-gray-600 mb-4">
						Track your actual spending against this budget
					</p>

					<div className="text-center py-6 sm:py-8">
						<div className="text-blue-300 mb-3">
							<svg
								className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
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
						<p className="text-gray-700 font-medium text-sm sm:text-base">
							Spending tracking coming soon!
						</p>
						<p className="text-xs sm:text-sm text-gray-600 mt-1">
							Link transactions to see how much you&apos;ve spent
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

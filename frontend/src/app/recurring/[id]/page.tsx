"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Repeat, Calendar } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

type RecurringTransaction = {
	id: string;
	mainCategory: string;
	secondaryCategory: string;
	frequency: string;
	startDate: string;
	nextRun: string;
	endDate: string;
	amount: number;
	note?: string;
	color?: string;
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
const sampleRecurring: Record<string, RecurringTransaction> = {
	"1": {
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck",
		frequency: "Weekly",
		startDate: "2025-01-05",
		nextRun: "2025-01-12",
		endDate: "2026-01-04",
		amount: 200,
		note: "Biweekly salary deposit",
		color: "#10B981",
	},
	"2": {
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Rent",
		frequency: "Monthly",
		startDate: "2025-01-01",
		nextRun: "2025-02-01",
		endDate: "2025-12-31",
		amount: 1200,
		note: "Monthly rent payment",
		color: "#3B82F6",
	},
	"3": {
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		frequency: "Weekly",
		startDate: "2025-06-01",
		nextRun: "2025-06-08",
		endDate: "2026-05-31",
		amount: 75,
		color: "#EF4444",
	},
};

export default function RecurringDetailPage() {
	const { id } = useParams();
	const router = useRouter();

	const recurring = sampleRecurring[id as string];

	if (!recurring) {
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
							Recurring Transaction Not Found
						</h2>
						<p className="text-gray-600 mb-6 text-sm sm:text-base">
							The recurring transaction you&apos;re looking for doesn&apos;t
							exist.
						</p>
						<Link href="/transactions">
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md mb-4">
								Back to Transactions
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// Get category details (icon and color)
	const categoryDetails = getCategoryDetails(recurring.secondaryCategory);
	const CategoryIcon = CATEGORY_ICONS.find(
		(cat) => cat.id === categoryDetails.icon,
	)?.Icon;
	const handleEdit = () => {
		router.push(`/recurring/${id}/edit`);
	};

	const handleDelete = () => {
		if (
			confirm("Are you sure you want to delete this recurring transaction?")
		) {
			console.log("Delete recurring transaction", id);
			router.push("/transactions");
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const calculateTotalOccurrences = () => {
		const start = new Date(recurring.startDate);
		const end = new Date(recurring.endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		switch (recurring.frequency.toLowerCase()) {
			case "daily":
				return diffDays;
			case "weekly":
				return Math.floor(diffDays / 7);
			case "monthly":
				return Math.floor(diffDays / 30);
			case "yearly":
				return Math.floor(diffDays / 365);
			default:
				return 0;
		}
	};

	const totalOccurrences = calculateTotalOccurrences();
	const totalAmount = totalOccurrences * recurring.amount;

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
				{/* Back Button */}
				<Link href="/transactions">
					<button className="flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium text-sm sm:text-base mb-4">
						<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
						Back to Transactions
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
									style={{ backgroundColor: recurring.color }}
								>
									{CategoryIcon && (
										<CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
									)}
								</div>
								<h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
									{recurring.secondaryCategory}
								</h1>
								<Repeat className="text-blue-600" size={20} />
							</div>
							<p className="text-gray-600 text-sm sm:text-base">
								{recurring.mainCategory}
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

				{/* Recurring Overview Card */}
				<div
					className="bg-white rounded-lg shadow-md border-2 p-4 sm:p-6 relative overflow-hidden"
					style={{ borderColor: recurring.color || "#E5E7EB" }}
				>
					{recurring.color && (
						<div
							className="absolute top-0 left-0 right-0 h-1"
							style={{ backgroundColor: recurring.color }}
						/>
					)}
					<h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 mt-1">
						Recurring Overview
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
						{/* Amount */}
						<div
							className="p-4 sm:p-5 rounded-lg border-2 relative overflow-hidden"
							style={{
								borderColor: recurring.color || "#E5E7EB",
								backgroundColor: recurring.color
									? `${recurring.color}10`
									: "#F9FAFB",
							}}
						>
							<div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
								Amount per {recurring.frequency.toLowerCase()}
							</div>
							<div className="text-2xl sm:text-3xl font-bold text-gray-900">
								${recurring.amount.toFixed(2)}
							</div>
						</div>

						{/* Frequency */}
						<div className="p-4 sm:p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
							<div className="text-xs sm:text-sm font-medium text-blue-700 mb-1">
								Frequency
							</div>
							<div className="text-2xl sm:text-3xl font-bold text-blue-900">
								{recurring.frequency}
							</div>
						</div>

						{/* Next Run */}
						<div className="p-4 sm:p-5 bg-green-50 rounded-lg border-2 border-green-200">
							<div className="text-xs sm:text-sm font-medium text-green-700 mb-1">
								Next Run
							</div>
							<div className="text-lg sm:text-xl font-bold text-green-900">
								{formatDate(recurring.nextRun)}
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
						{/* Main Category */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Type
							</span>
							<div className="flex items-center gap-2">
								{/* Icon with color background */}
								<div
									className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm"
									style={{ backgroundColor: recurring.color }}
								>
									{CategoryIcon && (
										<CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
									)}
								</div>
								<span className="text-gray-900 font-semibold text-sm sm:text-base">
									{recurring.mainCategory}
								</span>
							</div>
						</div>

						{/* Secondary Category */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Category
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{recurring.secondaryCategory}
							</span>
						</div>

						{/* Start Date */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Start Date
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{formatDate(recurring.startDate)}
							</span>
						</div>

						{/* End Date */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								End Date
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{formatDate(recurring.endDate)}
							</span>
						</div>

						{/* Note */}
						{recurring.note && (
							<div className="py-3">
								<div className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
									Note
								</div>
								<div className="text-gray-900 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-sm sm:text-base">
									{recurring.note}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Projection Card */}
				<div className="bg-linear-to-br from-purple-100 to-purple-50 rounded-lg shadow-md border-2 border-purple-300 p-4 sm:p-6">
					<div className="flex items-center gap-2 mb-4">
						<Calendar className="text-purple-600" size={20} />
						<h2 className="text-lg sm:text-xl font-bold text-blue-900">
							Transaction Projection
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-white/70 p-4 rounded-lg border border-purple-200">
							<div className="text-sm font-medium text-gray-600 mb-1">
								Total Occurrences
							</div>
							<div className="text-2xl font-bold text-purple-900">
								{totalOccurrences}
							</div>
							<div className="text-xs text-gray-500 mt-1">
								From start to end date
							</div>
						</div>

						<div className="bg-white/70 p-4 rounded-lg border border-purple-200">
							<div className="text-sm font-medium text-gray-600 mb-1">
								Projected Total
							</div>
							<div className="text-2xl font-bold text-purple-900">
								${totalAmount.toFixed(2)}
							</div>
							<div className="text-xs text-gray-500 mt-1">
								{totalOccurrences} × ${recurring.amount.toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

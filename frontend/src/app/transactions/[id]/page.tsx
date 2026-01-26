"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Calendar } from "lucide-react";

type Transaction = {
	id: string;
	mainCategory: string;
	secondaryCategory: string;
	date: string;
	amount: number;
	note?: string;
	color?: string;
};

// Sample data - replace with actual API call
const sampleTransactions: Record<string, Transaction> = {
	"1": {
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck 1",
		date: "2025-12-20",
		amount: 200,
		note: "Weekly paycheck",
		color: "#10B981",
	},
	"2": {
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		date: "2025-12-21",
		amount: 50,
		note: "Weekly shopping at Kroger",
		color: "#EF4444",
	},
	"3": {
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Utilities",
		date: "2025-12-22",
		amount: 30.5,
		color: "#8B5CF6",
	},
};

export default function TransactionDetailPage() {
	const { id } = useParams();
	const router = useRouter();

	const transaction = sampleTransactions[id as string];

	if (!transaction) {
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
							Transaction Not Found
						</h2>
						<p className="text-gray-600 mb-6 text-sm sm:text-base">
							The transaction you&apos;re looking for doesn&apos;t exist.
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

	const handleEdit = () => {
		router.push(`/transactions/${id}/edit`);
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this transaction?")) {
			console.log("Delete transaction", id);
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
								{transaction.color && (
									<div
										className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm"
										style={{ backgroundColor: transaction.color }}
									/>
								)}
								<h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
									{transaction.secondaryCategory}
								</h1>
							</div>
							<p className="text-gray-600 text-sm sm:text-base">
								{transaction.mainCategory} • {formatDate(transaction.date)}
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

				{/* Transaction Overview Card */}
				<div
					className="bg-white rounded-lg shadow-md border-2 p-4 sm:p-6 relative overflow-hidden"
					style={{ borderColor: transaction.color || "#E5E7EB" }}
				>
					{transaction.color && (
						<div
							className="absolute top-0 left-0 right-0 h-1"
							style={{ backgroundColor: transaction.color }}
						/>
					)}
					<h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 mt-1">
						Transaction Overview
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
						{/* Amount */}
						<div
							className="p-4 sm:p-5 rounded-lg border-2 relative overflow-hidden"
							style={{
								borderColor: transaction.color || "#E5E7EB",
								backgroundColor: transaction.color
									? `${transaction.color}10`
									: "#F9FAFB",
							}}
						>
							<div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
								Amount
							</div>
							<div className="text-2xl sm:text-3xl font-bold text-gray-900">
								${transaction.amount.toFixed(2)}
							</div>
						</div>

						{/* Date */}
						<div className="p-4 sm:p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
							<div className="text-xs sm:text-sm font-medium text-blue-700 mb-1">
								Transaction Date
							</div>
							<div className="text-xl sm:text-2xl font-bold text-blue-900">
								{formatDate(transaction.date)}
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
								{transaction.color && (
									<div
										className="w-3 h-3 rounded-full"
										style={{ backgroundColor: transaction.color }}
									/>
								)}
								<span className="text-gray-900 font-semibold text-sm sm:text-base">
									{transaction.mainCategory}
								</span>
							</div>
						</div>

						{/* Secondary Category */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Category
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{transaction.secondaryCategory}
							</span>
						</div>

						{/* Amount */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Amount
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								${transaction.amount.toFixed(2)}
							</span>
						</div>

						{/* Date */}
						<div className="flex justify-between items-center py-3 border-b border-gray-100">
							<span className="text-gray-600 font-medium text-sm sm:text-base">
								Date
							</span>
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{formatDate(transaction.date)}
							</span>
						</div>

						{/* Note */}
						{transaction.note && (
							<div className="py-3">
								<div className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
									Note
								</div>
								<div className="text-gray-900 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-sm sm:text-base">
									{transaction.note}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Related Budget Card - Placeholder */}
				<div className="bg-linear-to-br from-blue-100 to-blue-50 rounded-lg shadow-md border-2 border-blue-300 p-4 sm:p-6">
					<div className="flex items-center gap-2 mb-2">
						<Calendar className="text-blue-600" size={20} />
						<h2 className="text-lg sm:text-xl font-bold text-blue-900">
							Related Budget
						</h2>
					</div>
					<p className="text-xs sm:text-sm text-gray-600 mb-4">
						Link this transaction to a budget category
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
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
						</div>
						<p className="text-gray-700 font-medium text-sm sm:text-base">
							Budget linking coming soon!
						</p>
						<p className="text-xs sm:text-sm text-gray-600 mt-1">
							Connect transactions to budgets for better tracking
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

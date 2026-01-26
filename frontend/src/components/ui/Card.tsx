"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

type BudgetData = {
	amount: number;
	month: number;
	year: number;
	note?: string;
};

type CategoryData = {
	color: string;
	icon?: string;
};

type RecurringData = {
	amount: number;
	frequency: string;
	nextRun: string;
	secondaryCategory: string;
	mainCategory: string;
	note?: string;
	startDate: Date;
	endDate?: Date;
};

type TransactionData = {
	amount: number;
	date: string;
	secondaryCategory: string;
	mainCategory: string;
	note?: string;
};

interface CardProps {
	id: string;
	title: string;
	data: BudgetData | CategoryData | RecurringData | TransactionData;
	type: "budget" | "category" | "recurring" | "transaction";
	onEdit?: () => void;
	onDelete?: () => void;
}

export default function Card({
	id,
	title,
	data,
	type,
	onEdit,
	onDelete,
}: CardProps) {
	const [expanded, setExpanded] = useState(false);

	const getCardContent = () => {
		switch (type) {
			case "budget": {
				const budgetData = data as BudgetData;
				return {
					subtitle: `${budgetData.year}-${budgetData.month
						.toString()
						.padStart(2, "0")}`,
					amount: budgetData.amount,
					color: "#424242",
					extraInfo: budgetData.note,
					icon: null,
				};
			}
			case "category": {
				const categoryData = data as CategoryData;

				// Find the matching icon component
				const IconComponent = CATEGORY_ICONS.find(
					(c) => c.id === categoryData.icon,
				)?.Icon;

				return {
					subtitle: null,
					amount: null,
					color: categoryData.color,
					extraInfo: null,
					icon: IconComponent || null,
				};
			}
			case "recurring": {
				const recurringData = data as RecurringData;
				return {
					subtitle: `${recurringData.frequency} - Next: ${recurringData.nextRun}`,
					subtitleMobile: recurringData.nextRun, // Mobile shows only next date
					secondaryTitle: recurringData.secondaryCategory,
					amount: recurringData.amount,
					color:
						recurringData.mainCategory.toLowerCase() === "income"
							? "green"
							: "#424242",
					extraInfo: (
						<>
							{recurringData.startDate && (
								<p className="text-xs sm:text-sm mb-3">
									<strong>Start Date:</strong>{" "}
									{new Date(recurringData.startDate).toLocaleDateString()}
								</p>
							)}
							{recurringData.endDate && (
								<p className="text-xs sm:text-sm mb-3">
									<strong>End Date:</strong>{" "}
									{new Date(recurringData.endDate).toLocaleDateString()}
								</p>
							)}
							{recurringData.note && (
								<p className="text-xs sm:text-sm mb-3">
									<strong>Note:</strong> {recurringData.note}
								</p>
							)}
						</>
					),
					icon: null,
				};
			}
			case "transaction": {
				const transactionData = data as TransactionData;
				return {
					subtitle: transactionData.date,
					secondaryTitle: transactionData.secondaryCategory,
					amount: transactionData.amount,
					color:
						transactionData.mainCategory.toLowerCase() === "income"
							? "green"
							: "#424242",
					extraInfo: transactionData.note,
					icon: null,
				};
			}
		}
	};

	const content = getCardContent();
	const pathMap: Record<typeof type, string> = {
		budget: "budgets",
		transaction: "transactions",
		category: "categories",
		recurring: "recurring",
	};
	const detailsPath = `/${pathMap[type]}/${id}`;

	return (
		<div
			onClick={() => setExpanded(!expanded)}
			className="border border-gray-300 rounded-lg p-3 sm:p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
		>
			{/* Top Row */}
			<div className="flex justify-between items-center gap-2">
				<div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
					{/* Render icon if it exists - responsive sizing */}
					{content.icon && (
						<div
							className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
							style={{ backgroundColor: content.color + "20" }}
						>
							<content.icon
								className="w-7 h-7 sm:w-5 sm:h-5"
								style={{ color: content.color }}
							/>
						</div>
					)}

					<div className="flex-1 min-w-0">
						<div className="flex items-baseline gap-1 flex-wrap">
							<p className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100 truncate">
								{title}
								{type !== "category" && type !== "budget" && ":"}
							</p>
							{content.secondaryTitle && (
								<p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 truncate">
									{content.secondaryTitle}
								</p>
							)}
						</div>
						{content.subtitle && (
							<>
								{/* Show full subtitle on desktop */}
								<p className="hidden sm:block text-sm text-gray-400 dark:text-gray-500">
									{content.subtitle}
								</p>
								{/* Show mobile subtitle if available, otherwise show full */}
								<p className="sm:hidden text-xs text-gray-400 dark:text-gray-500">
									{content.subtitleMobile || content.subtitle}
								</p>
							</>
						)}
					</div>
				</div>

				{content.amount !== null && (
					<div
						className="font-bold text-sm sm:text-base flex-shrink-0"
						style={{ color: content.color || "black" }}
					>
						${content.amount.toFixed(2)}
					</div>
				)}
			</div>

			{/* Expanded Section */}
			{expanded && (
				<div className="mt-3">
					{typeof content.extraInfo === "string" && content.extraInfo && (
						<p className="text-xs sm:text-sm mb-3">
							<strong>Note:</strong> {content.extraInfo}
						</p>
					)}
					{typeof content.extraInfo !== "string" && content.extraInfo}

					<div className="flex flex-wrap gap-2 sm:gap-3">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit?.();
							}}
							className="px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
						>
							Edit
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete?.();
							}}
							className="px-3 py-1 text-xs sm:text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
						>
							Delete
						</button>
						{type !== "category" && (
							<Link
								href={detailsPath}
								onClick={(e) => e.stopPropagation()}
								className="px-3 py-1 text-xs sm:text-sm text-blue-600 underline hover:text-blue-800"
							>
								View Details
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

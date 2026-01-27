"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

type BudgetData = {
	amount: number;
	month: number;
	year: number;
	note?: string;
	color: string;
	icon: string;
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
	icon: string;
	color: string;
};

type TransactionData = {
	amount: number;
	date: string;
	secondaryCategory: string;
	mainCategory: string;
	note?: string;
	icon: string;
	color: string;
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

	// Helper function to get amount color based on transaction type
	const getAmountColor = (mainCategory: string): string => {
		return mainCategory.toLowerCase() === "income" ? "#43A047" : "#424242";
	};

	// Helper function to get icon component
	const getIconComponent = (iconId?: string) => {
		if (!iconId) return null;
		return CATEGORY_ICONS.find((c) => c.id === iconId)?.Icon || null;
	};

	const getCardContent = () => {
		switch (type) {
			case "budget": {
				const budgetData = data as BudgetData;
				const IconComponent = getIconComponent(budgetData.icon);

				return {
					subtitle: `${budgetData.year}-${budgetData.month
						.toString()
						.padStart(2, "0")}`,
					amount: budgetData.amount,
					amountColor: "#1F2937", // Dark gray for budgets
					iconColor: budgetData.color,
					iconBackgroundColor: budgetData.color,
					extraInfo: budgetData.note,
					icon: IconComponent,
				};
			}
			case "category": {
				const categoryData = data as CategoryData;
				const IconComponent = getIconComponent(categoryData.icon);

				return {
					subtitle: null,
					amount: null,
					amountColor: null,
					iconColor: categoryData.color,
					iconBackgroundColor: categoryData.color,
					extraInfo: null,
					icon: IconComponent,
				};
			}
			case "recurring": {
				const recurringData = data as RecurringData;
				const IconComponent = getIconComponent(recurringData.icon);

				return {
					subtitle: `${recurringData.frequency} - Next: ${recurringData.nextRun}`,
					subtitleMobile: recurringData.nextRun,
					secondaryTitle: recurringData.secondaryCategory,
					amount: recurringData.amount,
					amountColor: getAmountColor(recurringData.mainCategory),
					iconColor: recurringData.color,
					iconBackgroundColor: recurringData.color,
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
					icon: IconComponent,
				};
			}
			case "transaction": {
				const transactionData = data as TransactionData;
				const IconComponent = getIconComponent(transactionData.icon);

				return {
					subtitle: transactionData.date,
					secondaryTitle: transactionData.secondaryCategory,
					amount: transactionData.amount,
					amountColor: getAmountColor(transactionData.mainCategory),
					iconColor: transactionData.color,
					iconBackgroundColor: transactionData.color,
					extraInfo: transactionData.note,
					icon: IconComponent,
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
					{/* Render icon if it exists */}
					{content.icon && (
						<div
							className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
							style={{
								backgroundColor: `${content.iconBackgroundColor}20`,
							}}
						>
							<content.icon
								className="w-7 h-7 sm:w-5 sm:h-5"
								style={{ color: content.iconColor }}
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
									{type === "recurring"
										? `Next: ${content.subtitleMobile || content.subtitle}`
										: content.subtitleMobile || content.subtitle}
								</p>
							</>
						)}
					</div>
				</div>

				{content.amount !== null && (
					<div
						className="font-bold text-sm sm:text-base flex-shrink-0"
						style={{ color: content.amountColor || "#1F2937" }}
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

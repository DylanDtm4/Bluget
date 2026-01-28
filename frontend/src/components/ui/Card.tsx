"use client";

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
	date: Date;
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
	expanded?: boolean;
	onToggle?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
}

export default function Card({
	id,
	title,
	data,
	type,
	expanded = false,
	onToggle,
	onEdit,
	onDelete,
}: CardProps) {
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
					amountColor: "#1F2937",
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

				// Format next run date
				const nextRunDate = new Date(recurringData.nextRun);
				const formattedNextRun = nextRunDate.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				});

				return {
					subtitle: `${recurringData.frequency} · Next: ${formattedNextRun}`,
					subtitleMobile: `${recurringData.frequency} · ${formattedNextRun}`,
					secondaryTitle: recurringData.secondaryCategory,
					amount: recurringData.amount,
					amountColor: getAmountColor(recurringData.mainCategory),
					iconColor: recurringData.color,
					iconBackgroundColor: recurringData.color,
					extraInfo: (
						<div className="space-y-2">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								{recurringData.startDate && (
									<p className="text-xs sm:text-sm text-gray-600">
										<span className="font-semibold text-gray-700">Start:</span>{" "}
										{new Date(recurringData.startDate).toLocaleDateString(
											"en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
											},
										)}
									</p>
								)}
								{recurringData.endDate && (
									<p className="text-xs sm:text-sm text-gray-600">
										<span className="font-semibold text-gray-700">End:</span>{" "}
										{new Date(recurringData.endDate).toLocaleDateString(
											"en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
											},
										)}
									</p>
								)}
							</div>
							{recurringData.note && (
								<p className="text-xs sm:text-sm text-gray-600">
									<span className="font-semibold text-gray-700">Note:</span>{" "}
									{recurringData.note}
								</p>
							)}
						</div>
					),
					icon: IconComponent,
				};
			}
			case "transaction": {
				const transactionData = data as TransactionData;
				const IconComponent = getIconComponent(transactionData.icon);

				// Format date for mobile
				const formattedDate = transactionData.date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				});

				return {
					subtitle: formattedDate,
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
			onClick={onToggle}
			className="border border-gray-300 rounded-lg p-3 sm:p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow bg-white"
		>
			{/* Top Row */}
			<div className="flex justify-between items-center gap-2 sm:gap-3">
				<div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
					{/* Icon */}
					{content.icon && (
						<div
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0"
							style={{
								backgroundColor: `${content.iconBackgroundColor}20`,
							}}
						>
							<content.icon
								className="w-5 h-5 sm:w-6 sm:h-6"
								style={{ color: content.iconColor }}
							/>
						</div>
					)}

					{/* Content */}
					<div className="flex-1 min-w-0">
						{/* Title Row */}
						<div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
							<p className="font-bold text-sm sm:text-base text-gray-800 truncate">
								{title}
								{type !== "category" && type !== "budget" && ":"}
							</p>
							{content.secondaryTitle && (
								<p className="text-xs sm:text-base text-gray-600 truncate">
									{content.secondaryTitle}
								</p>
							)}
						</div>

						{/* Subtitle */}
						{content.subtitle && (
							<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
								{content.subtitleMobile || content.subtitle}
							</p>
						)}
					</div>
				</div>

				{/* Amount */}
				{content.amount !== null && (
					<div
						className="font-bold text-base sm:text-lg shrink-0 ml-2"
						style={{ color: content.amountColor || "#1F2937" }}
					>
						${content.amount.toFixed(2)}
					</div>
				)}
			</div>

			{/* Expanded Section */}
			{expanded && (
				<div className="mt-4 pt-3 border-t border-gray-200">
					{/* Extra Info */}
					{typeof content.extraInfo === "string" && content.extraInfo && (
						<p className="text-xs sm:text-sm text-gray-600 mb-3">
							<span className="font-semibold text-gray-700">Note:</span>{" "}
							{content.extraInfo}
						</p>
					)}
					{typeof content.extraInfo !== "string" && content.extraInfo && (
						<div className="mb-3">{content.extraInfo}</div>
					)}

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-2 sm:gap-3">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit?.();
							}}
							className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
						>
							Edit
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete?.();
							}}
							className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
						>
							Delete
						</button>
						{type !== "category" && (
							<Link
								href={detailsPath}
								onClick={(e) => e.stopPropagation()}
								className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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

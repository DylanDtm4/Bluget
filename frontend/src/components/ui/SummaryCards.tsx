import React from "react";
import { TrendingUp, TrendingDown, Wallet, LucideIcon } from "lucide-react";

interface SummaryCardData {
	title: string;
	amount: string;
	change: string;
	changeAmount: string;
	isPositive: boolean;
	icon: LucideIcon;
	bgColor: string;
	iconColor: string;
}

interface SummaryCardsProps {
	cards?: SummaryCardData[];
}

const defaultCards: SummaryCardData[] = [
	{
		title: "Total Balance",
		amount: "$12,450",
		change: "+12%",
		changeAmount: "+$1,494",
		isPositive: true,
		icon: Wallet,
		bgColor: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		title: "Monthly Income",
		amount: "$5,200",
		change: "+5%",
		changeAmount: "+$260",
		isPositive: true,
		icon: TrendingUp,
		bgColor: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		title: "Monthly Expenses",
		amount: "$2,150",
		change: "-8%",
		changeAmount: "-$172",
		isPositive: false,
		icon: TrendingDown,
		bgColor: "bg-red-100",
		iconColor: "text-red-600",
	},
];

export default function SummaryCards({
	cards = defaultCards,
}: SummaryCardsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
			{cards.map((card, index) => {
				const IconComponent = card.icon;
				return (
					<div key={index} className="bg-white p-4 sm:p-5 rounded-lg shadow-md">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="flex-1">
								<p className="text-xs sm:text-sm text-gray-500 mb-1">
									{card.title}
								</p>
								<p className="text-xl sm:text-2xl font-bold text-blue-900">
									{card.amount}
								</p>
								<div className="flex items-center gap-2 mt-1">
									<span
										className={`text-xs font-semibold ${card.isPositive ? "text-green-600" : "text-red-600"}`}
									>
										{card.changeAmount} ({card.change})
									</span>
								</div>
							</div>
							<div className={`${card.bgColor} p-2 sm:p-3 rounded-lg`}>
								<IconComponent className={card.iconColor} size={20} />
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

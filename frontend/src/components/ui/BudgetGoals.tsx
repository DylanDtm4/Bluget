import React from "react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

interface BudgetGoal {
	name: string;
	current: number;
	target: number;
	color: string;
	icon: string;
}

interface BudgetGoalsProps {
	goals?: BudgetGoal[];
}

const defaultGoals: BudgetGoal[] = [
	{
		name: "Emergency Fund",
		current: 9000,
		target: 10000,
		color: "#3B82F6",
		icon: "savings",
	},
	{
		name: "Vacation Savings",
		current: 3330,
		target: 5000,
		color: "#A855F7",
		icon: "travel",
	},
	{
		name: "New Car",
		current: 3000,
		target: 10000,
		color: "#F59E0B",
		icon: "transport",
	},
];

const getProgressColor = (percentage: number) => {
	if (percentage < 50) return "bg-green-100 text-green-700";
	if (percentage <= 75) return "bg-blue-100 text-blue-700";
	return "bg-red-100 text-red-700";
};

// Helper to get lighter background color
const getLighterColor = (hexColor: string) => {
	// Convert hex to RGB
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);
	// Return a lighter version (mix with white)
	return `rgba(${r}, ${g}, ${b}, 0.15)`;
};

export default function BudgetGoals({
	goals = defaultGoals,
}: BudgetGoalsProps) {
	return (
		<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
			<h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">
				Budget Goals
			</h3>
			<div className="space-y-5 sm:space-y-6">
				{goals.map((goal, index) => {
					const percentage = Math.round((goal.current / goal.target) * 100);
					const categoryIcon = CATEGORY_ICONS.find(
						(cat) => cat.id === goal.icon,
					);
					const IconComponent =
						categoryIcon?.Icon ||
						CATEGORY_ICONS.find((cat) => cat.id === "other")!.Icon;

					return (
						<div key={index} className="group cursor-pointer">
							<div className="flex justify-between items-center mb-2">
								<div className="flex items-center gap-3">
									<div
										className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
										style={{
											background: `linear-gradient(135deg, ${getLighterColor(goal.color)}, ${getLighterColor(goal.color)})`,
										}}
									>
										<IconComponent
											className="w-5 h-5 flex-shrink-0"
											style={{ color: goal.color }}
										/>
									</div>
									<div>
										<span className="text-sm font-semibold text-gray-900 block">
											{goal.name}
										</span>
										<span className="text-xs text-gray-500">
											${goal.current.toLocaleString()} / $
											{goal.target.toLocaleString()}
										</span>
									</div>
								</div>
								<span
									className={`text-sm font-bold px-3 py-1 rounded-full ${getProgressColor(percentage)}`}
								>
									{percentage}%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
								<div
									className="h-3 rounded-full transition-all duration-700 shadow-sm relative overflow-hidden"
									style={{
										width: `${percentage > 100 ? 100 : percentage}%`,
										background: `linear-gradient(90deg, ${goal.color}, ${goal.color})`,
									}}
								>
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

"use client";

import { useState } from "react";
import { Maximize2, X } from "lucide-react";
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
	{ name: "Emergency Fund", current: 9000, target: 10000, color: "#3B82F6", icon: "savings" },
	{ name: "Vacation Savings", current: 3330, target: 5000, color: "#A855F7", icon: "travel" },
	{ name: "New Car", current: 3000, target: 10000, color: "#F59E0B", icon: "transport" },
];

const getProgressColor = (percentage: number) => {
	if (percentage >= 100) return "bg-red-100 text-red-700";
	if (percentage >= 75) return "bg-orange-100 text-orange-700";
	if (percentage >= 50) return "bg-blue-100 text-blue-700";
	return "bg-green-100 text-green-700";
};

const getLighterColor = (hexColor: string) => {
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, 0.15)`;
};

function GoalItem({ goal }: { goal: BudgetGoal }) {
	const percentage = Math.round((goal.current / goal.target) * 100);
	const categoryIcon = CATEGORY_ICONS.find((cat) => cat.id === goal.icon);
	const IconComponent = categoryIcon?.Icon || CATEGORY_ICONS.find((cat) => cat.id === "other")!.Icon;

	return (
		<div className="group">
			<div className="flex justify-between items-center mb-2">
				<div className="flex items-center gap-3 min-w-0">
					<div
						className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
						style={{ background: getLighterColor(goal.color) }}
					>
						<IconComponent className="w-4 h-4" style={{ color: goal.color }} />
					</div>
					<div className="min-w-0">
						<span className="text-sm font-semibold text-gray-900 block truncate">{goal.name}</span>
						<span className="text-xs text-gray-500">
							${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
						</span>
					</div>
				</div>
				<span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${getProgressColor(percentage)}`}>
					{percentage}%
				</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
				<div
					className="h-2.5 rounded-full transition-all duration-500"
					style={{
						width: `${Math.min(percentage, 100)}%`,
						backgroundColor: goal.color,
					}}
				/>
			</div>
		</div>
	);
}

export default function BudgetGoals({ goals = defaultGoals }: BudgetGoalsProps) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col">
				<div className="flex items-center justify-between mb-3 sm:mb-4">
					<h3 className="text-base sm:text-lg font-semibold text-blue-900">Budget Goals</h3>
					<button
						onClick={() => setModalOpen(true)}
						className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
						title="Expand"
					>
						<Maximize2 size={16} />
					</button>
				</div>

				<div className="space-y-4 overflow-y-auto max-h-[280px] pr-1">
					{goals.map((goal, i) => (
						<GoalItem key={i} goal={goal} />
					))}
				</div>
			</div>

			{modalOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
					onClick={() => setModalOpen(false)}
				>
					<div
						className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between p-5 border-b border-gray-200">
							<h2 className="text-lg font-semibold text-blue-900">Budget Goals</h2>
							<button
								onClick={() => setModalOpen(false)}
								className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
							>
								<X size={18} />
							</button>
						</div>
						<div className="overflow-y-auto flex-1 p-5 space-y-5">
							{goals.map((goal, i) => (
								<GoalItem key={i} goal={goal} />
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

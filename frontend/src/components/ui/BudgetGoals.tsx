import React from "react";

interface Goal {
	name: string;
	current: number;
	target: number;
}

interface BudgetGoalsProps {
	goals?: Goal[];
}

const defaultGoals: Goal[] = [
	{ name: "Emergency Fund", current: 7500, target: 10000 },
	{ name: "Vacation Savings", current: 2250, target: 5000 },
	{ name: "New Car", current: 3000, target: 10000 },
];

export default function BudgetGoals({
	goals = defaultGoals,
}: BudgetGoalsProps) {
	return (
		<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
			<h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">
				Budget Goals
			</h3>
			<div className="space-y-3 sm:space-y-4">
				{goals.map((goal, index) => {
					const percentage = Math.round((goal.current / goal.target) * 100);
					return (
						<div key={index}>
							<div className="flex justify-between mb-1">
								<span className="text-xs sm:text-sm text-gray-600">
									{goal.name}
								</span>
								<span className="text-xs sm:text-sm font-semibold text-blue-900">
									${goal.current.toLocaleString()} / $
									{goal.target.toLocaleString()} ({percentage}%)
								</span>
							</div>
							<div className="w-full bg-blue-100 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full transition-all duration-300"
									style={{ width: `${percentage}%` }}
								></div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

"use client";
import React, { useState } from "react";
import {
	ArrowUpCircle,
	ArrowDownCircle,
	PiggyBank,
	CreditCard,
	Home,
	ShoppingCart,
	Car,
	Utensils,
} from "lucide-react";

export default function BudgetDashboard() {
	const [budget] = useState({
		income: 5420,
		expenses: 3245,
		balance: 2175,
		categories: [
			{ name: "Housing", spent: 1200, budget: 1500, icon: Home },
			{ name: "Groceries", spent: 650, budget: 800, icon: ShoppingCart },
			{ name: "Transport", spent: 320, budget: 400, icon: Car },
			{ name: "Dining", spent: 480, budget: 600, icon: Utensils },
		],
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-10">
					<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
						My Budget
					</h1>
					<p className="text-blue-600">Track your financial goals</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-blue-200">
						<div className="flex items-center gap-4 mb-4">
							<div className="bg-gradient-to-br from-green-400 to-green-500 p-4 rounded-2xl shadow-lg">
								<ArrowUpCircle className="text-white" size={28} />
							</div>
							<div>
								<p className="text-blue-600 text-sm font-medium">Income</p>
								<p className="text-3xl font-bold text-blue-900">
									${budget.income.toLocaleString()}
								</p>
							</div>
						</div>
						<div className="bg-green-50 rounded-xl p-3">
							<p className="text-green-700 text-sm font-medium">
								+12% from last month
							</p>
						</div>
					</div>

					<div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-blue-200">
						<div className="flex items-center gap-4 mb-4">
							<div className="bg-gradient-to-br from-red-400 to-red-500 p-4 rounded-2xl shadow-lg">
								<ArrowDownCircle className="text-white" size={28} />
							</div>
							<div>
								<p className="text-blue-600 text-sm font-medium">Expenses</p>
								<p className="text-3xl font-bold text-blue-900">
									${budget.expenses.toLocaleString()}
								</p>
							</div>
						</div>
						<div className="bg-red-50 rounded-xl p-3">
							<p className="text-red-700 text-sm font-medium">
								60% of income spent
							</p>
						</div>
					</div>

					<div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-blue-200">
						<div className="flex items-center gap-4 mb-4">
							<div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-4 rounded-2xl shadow-lg">
								<PiggyBank className="text-white" size={28} />
							</div>
							<div>
								<p className="text-blue-600 text-sm font-medium">Balance</p>
								<p className="text-3xl font-bold text-blue-900">
									${budget.balance.toLocaleString()}
								</p>
							</div>
						</div>
						<div className="bg-blue-50 rounded-xl p-3">
							<p className="text-blue-700 text-sm font-medium">
								40% saved this month
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-blue-200">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold text-blue-900">
							Spending by Category
						</h2>
						<span className="text-blue-600 text-sm font-medium">
							December 2025
						</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{budget.categories.map((cat, idx) => {
							const Icon = cat.icon;
							const percentage = (cat.spent / cat.budget) * 100;
							const remaining = cat.budget - cat.spent;

							return (
								<div
									key={idx}
									className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
								>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="bg-blue-500 p-3 rounded-xl shadow-md">
												<Icon className="text-white" size={22} />
											</div>
											<div>
												<p className="text-blue-900 font-bold text-lg">
													{cat.name}
												</p>
												<p className="text-blue-600 text-sm">
													${remaining} remaining
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-2xl font-bold text-blue-900">
												${cat.spent}
											</p>
											<p className="text-blue-600 text-sm">of ${cat.budget}</p>
										</div>
									</div>
									<div className="h-3 bg-blue-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<div className="mt-2 flex justify-between text-xs">
										<span className="text-blue-600">
											{percentage.toFixed(0)}% used
										</span>
										<span
											className={
												percentage > 90
													? "text-red-600 font-semibold"
													: "text-green-600"
											}
										>
											{percentage > 90 ? "Over budget!" : "On track"}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

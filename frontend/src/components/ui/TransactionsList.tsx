import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface Transaction {
	name: string;
	amount: number;
	category: string;
	icon: LucideIcon;
	color: string;
	date?: string;
}

interface TransactionsListProps {
	title: string;
	transactions: Transaction[];
	viewAllLink?: string;
	showDate?: boolean;
}

export default function TransactionsList({
	title,
	transactions,
	viewAllLink,
	showDate = false,
}: TransactionsListProps) {
	return (
		<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
			<div className="flex items-center justify-between mb-3 sm:mb-4">
				<h3 className="text-lg sm:text-xl font-bold text-blue-900">{title}</h3>
				{viewAllLink && (
					<Link
						href={viewAllLink}
						className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-50 transition-colors"
					>
						View All
					</Link>
				)}
			</div>
			<div className="space-y-2 sm:space-y-3">
				{transactions.map((tx, i) => {
					const IconComponent = tx.icon;
					return (
						<div
							key={i}
							className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
						>
							<div className="flex items-center gap-2 sm:gap-3">
								<div
									className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${tx.color} flex items-center justify-center`}
								>
									<IconComponent size={18} className="sm:w-5 sm:h-5" />
								</div>
								<div>
									<p className="font-semibold text-gray-800 text-xs sm:text-base">
										{tx.name}
									</p>
									<p className="text-xs sm:text-sm text-gray-500">
										{showDate && tx.date ? tx.date : tx.category}
									</p>
								</div>
							</div>
							<p
								className={`font-bold text-sm sm:text-lg ${
									tx.amount > 0 ? "text-green-600" : "text-gray-800"
								}`}
							>
								${Math.abs(tx.amount).toFixed(2)}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

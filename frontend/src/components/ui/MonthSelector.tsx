"use client";

import { useState } from "react";

type MonthSelectorProps = {
	onMonthChange?: (date: Date) => void;
	initialDate?: Date;
	className?: string;
};

export default function MonthSelector({
	onMonthChange,
	initialDate,
	className = "",
}: MonthSelectorProps) {
	const now = new Date();
	const [selectedDate, setSelectedDate] = useState(initialDate || now);

	// Format month and year for display
	const monthYear = selectedDate.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	// Check if we can go forward (prevent going into the future)
	const canGoForward = () => {
		const nextMonth = new Date(selectedDate);
		nextMonth.setMonth(nextMonth.getMonth() + 1);
		// Allow if next month is before or equal to current month
		return (
			nextMonth.getFullYear() < now.getFullYear() ||
			(nextMonth.getFullYear() === now.getFullYear() &&
				nextMonth.getMonth() <= now.getMonth())
		);
	};

	// Navigate to previous/next month
	const changeMonth = (direction: number) => {
		// Prevent going into future
		if (direction > 0 && !canGoForward()) {
			return;
		}

		const newDate = new Date(selectedDate);
		newDate.setMonth(newDate.getMonth() + direction);
		setSelectedDate(newDate);
		onMonthChange?.(newDate);
	};

	return (
		<div className={`flex items-center justify-between ${className}`}>
			<button
				onClick={() => changeMonth(-1)}
				className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
				aria-label="Previous month"
			>
				<svg
					className="w-5 h-5 "
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<div className="flex items-center gap-2">
				<h2 className="text-xl font-semibold text-gray-700">{monthYear}</h2>
			</div>

			<button
				onClick={() => changeMonth(1)}
				disabled={!canGoForward()}
				className={`p-2 transition-colors text-gray-400 ${
					canGoForward()
						? "hover:text-blue-600 cursor-pointer"
						: "invisible cursor-not-allowed"
				}`}
				aria-label="Next month"
			>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	);
}

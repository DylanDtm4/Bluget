import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export type MonthSummary = {
	month: string;
	totalIncome: number;
	totalExpenses: number;
	totalInvestments: number;
	totalSavings: number;
	net: number;
};

export type CategoryBreakdown = {
	_id: string;
	total: number;
	name: string;
	color: string;
	icon: string;
};

export type RangeTotals = {
	totalIncome: number;
	totalExpenses: number;
	totalInvestments: number;
	totalSavings: number;
	net: number;
};

export type AnalyticsData = {
	months: MonthSummary[];
	categoryBreakdown: CategoryBreakdown[];
	totals: RangeTotals;
};

export function useAnalytics(start: string, end: string) {
	const [data, setData] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!start || !end) return;
		setLoading(true);
		setError(null);
		api
			.get("/months/range", { params: { start, end } })
			.then((res) => setData(res.data))
			.catch(() => setError("Failed to load analytics"))
			.finally(() => setLoading(false));
	}, [start, end]);

	return { data, loading, error };
}

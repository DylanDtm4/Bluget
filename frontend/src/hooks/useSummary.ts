import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { MonthlySummary } from "@/lib/types";

export function useSummary(month: string) {
	const [summary, setSummary] = useState<MonthlySummary | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchSummary = useCallback(async () => {
		if (!month) return;
		try {
			setLoading(true);
			setError(null);
			const res = await api.get("/months/summary", { params: { month } });
			setSummary(res.data);
		} catch {
			setError("Failed to load summary");
		} finally {
			setLoading(false);
		}
	}, [month]);

	useEffect(() => {
		fetchSummary();
	}, [fetchSummary]);

	return { summary, loading, error, refetch: fetchSummary };
}

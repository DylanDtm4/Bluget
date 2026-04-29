import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { Budget } from "@/lib/types";

export function useBudgets() {
	const [budgets, setBudgets] = useState<Budget[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchBudgets = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await api.get("/budgets", { params: { limit: 500 } });
			setBudgets(res.data.budgets);
		} catch {
			setError("Failed to load budgets");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchBudgets();
	}, [fetchBudgets]);

	const deleteBudget = async (id: string) => {
		await api.delete(`/budgets/${id}`);
		setBudgets((prev) => prev.filter((b) => b._id !== id));
	};

	const fetchBudgetsForMonth = async (month: number, year: number): Promise<Budget[]> => {
		const res = await api.get("/budgets/for-month", { params: { month, year } });
		return res.data.budgets;
	};

	return { budgets, loading, error, refetch: fetchBudgets, deleteBudget, fetchBudgetsForMonth };
}

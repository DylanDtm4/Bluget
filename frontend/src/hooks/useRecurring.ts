import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { RecurringTransaction } from "@/lib/types";

export function useRecurring() {
	const [recurring, setRecurring] = useState<RecurringTransaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchRecurring = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await api.get("/recurring", { params: { limit: 500 } });
			setRecurring(res.data.recurringTransactions);
		} catch {
			setError("Failed to load recurring transactions");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchRecurring();
	}, [fetchRecurring]);

	const deleteRecurring = async (id: string) => {
		await api.delete(`/recurring/${id}`);
		setRecurring((prev) => prev.filter((r) => r._id !== id));
	};

	return { recurring, loading, error, refetch: fetchRecurring, deleteRecurring };
}

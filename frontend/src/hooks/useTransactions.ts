import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { Transaction } from "@/lib/types";

export function useTransactions() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTransactions = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await api.get("/transactions", { params: { limit: 500 } });
			setTransactions(res.data.transactions);
		} catch {
			setError("Failed to load transactions");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	const deleteTransaction = async (id: string) => {
		await api.delete(`/transactions/${id}`);
		setTransactions((prev) => prev.filter((t) => t._id !== id));
	};

	return { transactions, loading, error, refetch: fetchTransactions, deleteTransaction };
}

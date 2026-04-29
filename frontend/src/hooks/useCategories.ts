import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { Category } from "@/lib/types";

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchCategories = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await api.get("/categories", { params: { limit: 500 } });
			setCategories(res.data.categories);
		} catch {
			setError("Failed to load categories");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const deleteCategory = async (id: string) => {
		await api.delete(`/categories/${id}`);
		setCategories((prev) => prev.filter((c) => c._id !== id));
	};

	return { categories, loading, error, refetch: fetchCategories, deleteCategory };
}

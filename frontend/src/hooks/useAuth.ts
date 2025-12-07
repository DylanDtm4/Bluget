import { useState } from "react";
import { signIn, signUp, signOut } from "@/lib/auth";

export function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function login(email: string, password: string) {
		setLoading(true);
		const { error } = await signIn(email, password);
		setLoading(false);
		setError(error?.message ?? null);
		return { error };
	}

	async function signup(email: string, password: string) {
		setLoading(true);
		const { error } = await signUp(email, password);
		setLoading(false);
		setError(error?.message ?? null);
		return { error };
	}

	async function logout() {
		await signOut();
	}

	return { login, signup, logout, loading, error };
}

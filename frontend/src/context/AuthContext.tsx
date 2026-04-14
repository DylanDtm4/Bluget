"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

type AuthContextType = {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Run once on app load
	useEffect(() => {
		if (!loading) return;

		const initAuth = async () => {
			try {
				const res = await api.get("/auth/me");
				setUser(res.data.user);
			} catch {
				localStorage.removeItem("token");
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		initAuth();
	}, [loading]);

	const login = async (email: string, password: string) => {
		const res = await api.post("/auth/login", { email, password });

		localStorage.setItem("token", res.data.token);
		setUser(res.data.user);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

// Convenience hook
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}

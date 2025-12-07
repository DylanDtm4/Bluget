"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
	const { login, loading, error } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const { error } = await login(email, password);
		if (!error) window.location.href = "/dashboard";
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" disabled={loading}>
				Login
			</button>
			{error && <p>{error}</p>}
		</form>
	);
}

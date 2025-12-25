"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function DashboardPage() {
	const { user, loading } = useAuth();

	if (loading) return null;
	// if (!user) redirect("/login");
	return (
		<div style={{ padding: 20 }}>
			<h1>My Budget</h1>

			<div style={{ marginBottom: 20 }}>
				<h2>Balance</h2>
				<p style={{ fontSize: 24 }}>$2,450</p>
			</div>

			<button>Add Transaction</button>

			<h3>Recent Transactions</h3>
			<ul>
				<li>Grocery - $45</li>
				<li>Gas - $30</li>
				<li>Salary + $2,000</li>
			</ul>
		</div>
	);
}

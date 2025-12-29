"use client"; // only if you need client hooks

import { useParams } from "next/navigation";

export default function BudgetDetailPage() {
	const { id } = useParams(); // will be "1", "2", etc.

	return (
		<div>
			<h1>Budget Detail</h1>
			<p>Budget ID: {id}</p>
			{/* Later: fetch budget details from backend using id */}
		</div>
	);
}

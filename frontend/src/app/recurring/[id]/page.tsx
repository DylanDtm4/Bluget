"use client"; // only if you need client hooks

import { useParams } from "next/navigation";

export default function RecurringDetailPage() {
	const { id } = useParams(); // will be "1", "2", etc.

	return (
		<div>
			<h1>Recurring Transaction Detail</h1>
			<p>Recurring Transaction ID: {id}</p>
			{/* Later: fetch recurring transaction details from backend using id */}
		</div>
	);
}

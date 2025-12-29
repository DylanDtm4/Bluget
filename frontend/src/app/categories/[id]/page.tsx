"use client"; // only if you need client hooks

import { useParams } from "next/navigation";

export default function CategoryDetailPage() {
	const { id } = useParams(); // will be "1", "2", etc.

	return (
		<div>
			<h1>Category Detail</h1>
			<p>Category ID: {id}</p>
			{/* Later: fetch category details from backend using id */}
		</div>
	);
}

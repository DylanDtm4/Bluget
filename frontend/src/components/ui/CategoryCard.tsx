"use client";

import { useState } from "react";
import Link from "next/link";

type CategoryCardProps = {
	id: string;
	category: string;
	custom: boolean;
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
};

export default function CategoryCard({
	id,
	category,
	custom,
	onDelete,
	onEdit,
}: CategoryCardProps) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			onClick={() => setExpanded(!expanded)}
			style={{
				border: "1px solid #ccc",
				borderRadius: "8px",
				padding: "1rem",
				marginBottom: "1rem",
				cursor: "pointer",
			}}
		>
			{/* Top Row */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div>
					<p style={{ fontWeight: "bold" }}>{category}:</p>
					<p style={{ fontSize: "0.9rem", color: "#555" }}>
						{custom ? "Custom" : "Default"}
					</p>
				</div>
			</div>

			{/* Expanded Section */}
			{expanded && (
				<div style={{ marginTop: "0.75rem" }}>
					<div style={{ display: "flex", gap: "0.75rem" }}>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit?.(id);
							}}
						>
							Edit
						</button>

						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete?.(id);
							}}
							style={{ color: "red" }}
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

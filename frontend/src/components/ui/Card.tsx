"use client";

import { useState } from "react";
import Link from "next/link";

type BudgetData = {
	amount: number;
	month: number;
	year: number;
	note?: string;
};

type CategoryData = {
	custom: boolean;
};

type RecurringData = {
	amount: number;
	frequency: string;
	nextRun: string;
	secondaryCategory: string;
	mainCategory: string;
	note?: string;
	startDate: Date;
	endDate?: Date;
};

type TransactionData = {
	amount: number;
	date: string;
	secondaryCategory: string;
	mainCategory: string;
	note?: string;
};

interface CardProps {
	id: string;
	title: string;
	data: BudgetData | CategoryData | RecurringData | TransactionData;
	type: "budget" | "category" | "recurring" | "transaction";
	onEdit?: () => void;
	onDelete?: () => void;
}

export default function Card({
	id,
	title,
	data,
	type,
	onEdit,
	onDelete,
}: CardProps) {
	const [expanded, setExpanded] = useState(false);

	const getCardContent = () => {
		switch (type) {
			case "budget": {
				const budgetData = data as BudgetData;
				return {
					subtitle: `${budgetData.year}-${budgetData.month
						.toString()
						.padStart(2, "0")}`,
					amount: budgetData.amount,
					color: "red",
					extraInfo: budgetData.note,
				};
			}
			case "category": {
				const categoryData = data as CategoryData;
				return {
					subtitle: `Custom: ${
						categoryData.custom.toString().charAt(0).toUpperCase() +
						categoryData.custom.toString().slice(1)
					}`,
					amount: null,
					color: null,
					extraInfo: null,
				};
			}
			case "recurring": {
				const recurringData = data as RecurringData;
				return {
					subtitle: `${recurringData.frequency} - Next: ${recurringData.nextRun}`,
					secondaryTitle: recurringData.secondaryCategory,
					amount: recurringData.amount,
					color:
						recurringData.mainCategory.toLowerCase() === "income"
							? "green"
							: "red",
					extraInfo: (
						<>
							{recurringData.startDate && (
								<p style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
									<strong>Start Date:</strong>{" "}
									{new Date(recurringData.startDate).toLocaleDateString()}
								</p>
							)}
							{recurringData.endDate && (
								<p style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
									<strong>End Date:</strong>{" "}
									{new Date(recurringData.endDate).toLocaleDateString()}
								</p>
							)}
							{recurringData.note && (
								<p style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
									<strong>Note:</strong> {recurringData.note}
								</p>
							)}
						</>
					),
				};
			}
			case "transaction": {
				const transactionData = data as TransactionData;
				return {
					subtitle: transactionData.date,
					secondaryTitle: transactionData.secondaryCategory,
					amount: transactionData.amount,
					color:
						transactionData.mainCategory.toLowerCase() === "income"
							? "green"
							: "red",
					extraInfo: transactionData.note,
				};
			}
		}
	};

	const content = getCardContent();
	const pathMap: Record<typeof type, string> = {
		budget: "budgets",
		transaction: "transactions",
		category: "categories",
		recurring: "recurring",
	};
	const detailsPath = `/${pathMap[type]}/${id}`;

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
					<p>
						<span style={{ fontWeight: "bold" }}>{title}:</span>{" "}
						{content.secondaryTitle && <span>{content.secondaryTitle}</span>}
					</p>
					<p style={{ fontSize: "0.9rem", color: "#555" }}>
						{content.subtitle}
					</p>
				</div>

				{content.amount !== null && (
					<div style={{ fontWeight: "bold", color: content.color || "black" }}>
						${content.amount.toFixed(2)}
					</div>
				)}
			</div>

			{/* Expanded Section */}
			{expanded && (
				<div style={{ marginTop: "0.75rem" }}>
					{typeof content.extraInfo === "string" && content.extraInfo && (
						<p style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
							<strong>Note:</strong> {content.extraInfo}
						</p>
					)}
					{typeof content.extraInfo !== "string" && content.extraInfo}

					<div style={{ display: "flex", gap: "0.75rem" }}>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit?.();
							}}
						>
							Edit
						</button>

						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete?.();
							}}
							style={{ color: "red" }}
						>
							Delete
						</button>

						<Link
							href={detailsPath}
							onClick={(e) => e.stopPropagation()}
							style={{ textDecoration: "underline" }}
						>
							View Details
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

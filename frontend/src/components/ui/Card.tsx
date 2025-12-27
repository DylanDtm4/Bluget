"use client";

import { useState } from "react";
import Link from "next/link";

type BudgetData = {
	amount: number;
	spent: number;
	remaining: number;
};

type CategoryData = {
	name: string;
	type: string;
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

	const renderContent = () => {
		switch (type) {
			case "budget":
				const budgetData = data as BudgetData;
				return (
					<>
						<p>Amount: ${budgetData.amount.toFixed(2)}</p>
						<p>Spent: ${budgetData.spent.toFixed(2)}</p>
						<p>Remaining: ${budgetData.remaining.toFixed(2)}</p>
					</>
				);
			case "category":
				const categoryData = data as CategoryData;
				return (
					<>
						<p>Name: {categoryData.name}</p>
						<p>Type: {categoryData.type}</p>
					</>
				);
			case "recurring": {
				const recurringData = data as RecurringData;
				const color =
					recurringData.mainCategory.toLowerCase() === "income"
						? "green"
						: "red";
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
									<span>{recurringData.secondaryCategory}</span>
								</p>
								<p style={{ fontSize: "0.9rem", color: "#555" }}>
									{recurringData.frequency} - Next: {recurringData.nextRun}
								</p>
							</div>

							<div style={{ fontWeight: "bold", color: color }}>
								${recurringData.amount.toFixed(2)}
							</div>
						</div>

						{/* Expanded Section */}
						{expanded && (
							<div style={{ marginTop: "0.75rem" }}>
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
										href={`/recurring/${id}`}
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
			case "transaction": {
				const transactionData = data as TransactionData;
				const color =
					transactionData.mainCategory.toLowerCase() === "income"
						? "green"
						: "red";
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
									<span>{transactionData.secondaryCategory}</span>
								</p>
								<p style={{ fontSize: "0.9rem", color: "#555" }}>
									{transactionData.date}
								</p>
							</div>

							<div style={{ fontWeight: "bold", color: color }}>
								${transactionData.amount.toFixed(2)}
							</div>
						</div>

						{/* Expanded Section */}
						{expanded && (
							<div style={{ marginTop: "0.75rem" }}>
								{transactionData.note && (
									<p style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
										<strong>Note:</strong> {transactionData.note}
									</p>
								)}

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
										href={`/transactions/${id}`}
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
		}
	};

	// For non-transaction types, use simpler card layout
	/*
	if (type !== "transaction") {
		return (
			<div className="card">
				<h3>{title}</h3>
				{renderContent()}
				<div className="actions">
					{onEdit && <button onClick={onEdit}>Edit</button>}
					{onDelete && <button onClick={onDelete}>Delete</button>}
				</div>
			</div>
		);
	} */

	return <>{renderContent()}</>;
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();

	const createOptions = [
		{ label: "Transaction", href: "/transactions/new", icon: "💰" },
		{ label: "Recurring Transaction", href: "/recurring/new", icon: "🔄" },
		{ label: "Budget", href: "/budgets/new", icon: "📊" },
		{ label: "Category", href: "/categories/new", icon: "🏷️" },
	];

	const handleOptionClick = (href: string) => {
		setIsModalOpen(false);
		router.push(href);
	};

	return (
		<>
			<header style={{ padding: "1rem", background: "#89ae3eff" }}>
				<nav>
					<Link href="/dashboard">Dashboard</Link> |{" "}
					<Link href="/budgets">Budgets</Link> |{" "}
					<Link href="/categories">Categories</Link> |{" "}
					<Link href="/transactions">Transactions</Link> |{" "}
					<Link href="/recurring">Recurring Transactions</Link> |{" "}
					<button
						onClick={() => setIsModalOpen(true)}
						style={{
							background: "none",
							border: "none",
							color: "inherit",
							cursor: "pointer",
							font: "inherit",
							padding: 0,
						}}
					>
						Create
					</button>{" "}
					| <Link href="/login">Login</Link> |{" "}
					<Link href="/settings">Settings</Link>
				</nav>
			</header>

			{/* Modal Overlay */}
			{isModalOpen && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
					}}
					onClick={() => setIsModalOpen(false)}
				>
					{/* Modal Content */}
					<div
						style={{
							backgroundColor: "white",
							borderRadius: "8px",
							padding: "2rem",
							maxWidth: "400px",
							width: "90%",
							boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Create New</h2>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.75rem",
							}}
						>
							{createOptions.map((option) => (
								<button
									key={option.href}
									onClick={() => handleOptionClick(option.href)}
									style={{
										padding: "1rem",
										border: "1px solid #ddd",
										borderRadius: "6px",
										backgroundColor: "white",
										cursor: "pointer",
										textAlign: "left",
										fontSize: "1rem",
										display: "flex",
										alignItems: "center",
										gap: "0.75rem",
										transition: "all 0.2s",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = "#f5f5f5";
										e.currentTarget.style.borderColor = "#89ae3eff";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "white";
										e.currentTarget.style.borderColor = "#ddd";
									}}
								>
									<span style={{ fontSize: "1.5rem" }}>{option.icon}</span>
									<span>{option.label}</span>
								</button>
							))}
						</div>

						<button
							onClick={() => setIsModalOpen(false)}
							style={{
								marginTop: "1.5rem",
								padding: "0.5rem 1rem",
								border: "1px solid #ddd",
								borderRadius: "6px",
								backgroundColor: "white",
								cursor: "pointer",
								width: "100%",
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
}

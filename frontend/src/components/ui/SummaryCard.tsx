"use client";

type SummaryCardProps = {
	title: string;
	amount: number;
	subtitle?: string;
	color?: string;
	trend?: {
		value: number;
		isPositive: boolean;
	};
};

export default function SummaryCard({
	title,
	amount,
	subtitle,
	color = "#89ae3eff",
	trend,
}: SummaryCardProps) {
	return (
		<div
			style={{
				borderTop: "1px solid #ccc",
				borderRight: "1px solid #ccc",
				borderBottom: "1px solid #ccc",
				borderLeft: `6px solid ${color}`,
				borderRadius: "8px",
				padding: "1.5rem",
				backgroundColor: "white",
			}}
		>
			<p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
				{title}
			</p>

			<div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
				<p
					style={{
						fontSize: "2rem",
						fontWeight: "bold",
						color: color,
						margin: 0,
					}}
				>
					$
					{amount.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>

				{trend && (
					<span
						style={{
							fontSize: "0.85rem",
							color: trend.isPositive ? "green" : "red",
						}}
					>
						{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
					</span>
				)}
			</div>

			{subtitle && (
				<p style={{ fontSize: "0.85rem", color: "#777", marginTop: "0.5rem" }}>
					{subtitle}
				</p>
			)}
		</div>
	);
}

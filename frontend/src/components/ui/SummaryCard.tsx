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
			className="border border-gray-300 rounded-lg p-6 bg-white"
			style={{ borderLeftWidth: "6px", borderLeftColor: color }}
		>
			<p className="text-sm text-gray-600 mb-2">{title}</p>

			<div className="flex items-baseline gap-2">
				<p className="text-3xl font-bold m-0" style={{ color }}>
					$
					{amount.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>

				{trend && (
					<span
						className={`text-sm ${
							trend.isPositive ? "text-green-600" : "text-red-600"
						}`}
					>
						{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
					</span>
				)}
			</div>

			{subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
		</div>
	);
}

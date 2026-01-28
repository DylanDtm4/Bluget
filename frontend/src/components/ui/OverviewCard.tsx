interface OverviewItem {
	label: string;
	value: string | number;
	sublabel?: string;
	color?: string;
	bgColor?: string;
	borderColor?: string;
}

interface OverviewCardProps {
	title: string;
	items: OverviewItem[];
	accentColor?: string;
	columns?: 1 | 2 | 3;
}

export default function OverviewCard({
	title,
	items,
	accentColor,
	columns = 2,
}: OverviewCardProps) {
	const gridCols = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-3",
	};

	return (
		<div
			className={`bg-white rounded-lg shadow-md border-2 p-4 sm:p-6 relative overflow-hidden`}
			style={{ borderColor: accentColor || "#E5E7EB" }}
		>
			{/* Colored accent bar */}
			{accentColor && (
				<div
					className="absolute top-0 left-0 right-0 h-1"
					style={{ backgroundColor: accentColor }}
				/>
			)}
			<h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 mt-1">
				{title}
			</h2>

			<div className={`grid ${gridCols[columns]} gap-4 sm:gap-6`}>
				{items.map((item, index) => (
					<div
						key={index}
						className="p-4 sm:p-5 rounded-lg border-2"
						style={{
							borderColor: item.borderColor || accentColor || "#E5E7EB",
							backgroundColor:
								item.bgColor || (accentColor ? `${accentColor}10` : "#F9FAFB"),
						}}
					>
						<div
							className="text-xs sm:text-sm font-medium mb-1"
							style={{ color: item.color || "#6B7280" }}
						>
							{item.label}
						</div>
						<div
							className="text-2xl sm:text-3xl font-bold"
							style={{ color: item.color || "#111827" }}
						>
							{item.value}
						</div>
						{item.sublabel && (
							<div className="text-xs text-gray-500 mt-1">{item.sublabel}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

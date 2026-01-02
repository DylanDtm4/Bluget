"use client";

import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

type ChartType = "line" | "bar" | "pie" | "progress";

type ChartDataPoint = {
	[key: string]: string | number;
};

type ProgressDataPoint = {
	name: string;
	value: number;
	max?: number; // Optional max value, defaults to 100
	color?: string; // Optional custom color per bar
};

type ChartProps = {
	title?: string;
	type: ChartType;
	data: ChartDataPoint[] | ProgressDataPoint[];
	dataKey?: string; // For line/bar charts (y-axis value)
	categoryKey?: string; // For x-axis or pie chart names
	colors?: string[]; // Custom colors for bars/pie slices
	height?: number;
	showLegend?: boolean;
	showGrid?: boolean;
};

const DEFAULT_COLORS = [
	"#8884d8",
	"#82ca9d",
	"#ffc658",
	"#ff7c7c",
	"#8dd1e1",
	"#d084d0",
];

export default function Chart({
	title,
	type,
	data,
	dataKey = "value",
	categoryKey = "name",
	colors = DEFAULT_COLORS,
	height = 300,
	showLegend = true,
	showGrid = true,
}: ChartProps) {
	const renderChart = () => {
		switch (type) {
			case "line":
				return (
					<ResponsiveContainer width="100%" height={height}>
						<LineChart data={data}>
							{showGrid && <CartesianGrid strokeDasharray="3 3" />}
							<XAxis dataKey={categoryKey} />
							<YAxis />
							<Tooltip />
							{showLegend && <Legend />}
							<Line
								type="monotone"
								dataKey={dataKey}
								stroke={colors[0]}
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				);

			case "bar":
				return (
					<ResponsiveContainer width="100%" height={height}>
						<BarChart data={data}>
							{showGrid && <CartesianGrid strokeDasharray="3 3" />}
							<XAxis dataKey={categoryKey} />
							<YAxis />
							<Tooltip />
							{showLegend && <Legend />}
							<Bar dataKey={dataKey} fill={colors[0]}>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={colors[index % colors.length]}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				);

			case "pie":
				return (
					<ResponsiveContainer width="100%" height={height}>
						<PieChart>
							<Pie
								data={data}
								dataKey={dataKey}
								nameKey={categoryKey}
								cx="50%"
								cy="50%"
								outerRadius={80}
								label
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={colors[index % colors.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							{showLegend && <Legend />}
						</PieChart>
					</ResponsiveContainer>
				);

			case "progress":
				return (
					<div
						style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
					>
						{(data as ProgressDataPoint[]).map((item, index) => {
							const maxValue = item.max || 100;
							const percentage = Math.min((item.value / maxValue) * 100, 100);
							const barColor = item.color || colors[index % colors.length];

							return (
								<div key={index}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: "0.25rem",
											fontSize: "0.9rem",
										}}
									>
										<span style={{ fontWeight: "500" }}>{item.name}</span>
										<span style={{ color: "#666" }}>
											{item.value} / {maxValue}
										</span>
									</div>
									<div
										style={{
											width: "100%",
											height: "24px",
											backgroundColor: "#e0e0e0",
											borderRadius: "12px",
											overflow: "hidden",
											position: "relative",
										}}
									>
										<div
											style={{
												width: `${percentage}%`,
												height: "100%",
												backgroundColor: barColor,
												transition: "width 0.3s ease",
												borderRadius: "12px",
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				);

			default:
				return <p>Unsupported chart type</p>;
		}
	};

	return (
		<div style={{ padding: "1rem", background: "white", borderRadius: "8px" }}>
			{title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
			{renderChart()}
		</div>
	);
}

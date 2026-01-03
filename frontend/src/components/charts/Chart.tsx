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
	max?: number;
	color?: string;
};

type LineConfig = {
	dataKey: string;
	color?: string;
	label?: string;
};

type ChartProps = {
	title?: string;
	type: ChartType;
	data: ChartDataPoint[] | ProgressDataPoint[];
	dataKey?: string; // For single line/bar charts
	lines?: LineConfig[]; // For multiple lines in line charts
	categoryKey?: string;
	colors?: string[];
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
	lines,
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
							{lines ? (
								// Multiple lines
								lines.map((line, index) => (
									<Line
										key={line.dataKey}
										type="monotone"
										dataKey={line.dataKey}
										name={line.label || line.dataKey}
										stroke={line.color || colors[index % colors.length]}
										strokeWidth={2}
									/>
								))
							) : (
								// Single line
								<Line
									type="monotone"
									dataKey={dataKey}
									stroke={colors[0]}
									strokeWidth={2}
								/>
							)}
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
					<div className="flex flex-col gap-4">
						{(data as ProgressDataPoint[]).map((item, index) => {
							const maxValue = item.max || 100;
							const percentage = Math.min((item.value / maxValue) * 100, 100);
							const barColor = item.color || colors[index % colors.length];

							return (
								<div key={index}>
									<div className="flex justify-between mb-1 text-sm">
										<span className="font-medium">{item.name}</span>
										<span className="text-gray-500">
											${item.value.toFixed(2)} / ${maxValue.toFixed(2)}
										</span>
									</div>
									<div className="w-full h-6 bg-gray-200 rounded-xl overflow-hidden relative">
										<div
											className="h-full rounded-xl transition-[width] duration-300 ease-in-out"
											style={{
												width: `${percentage}%`,
												backgroundColor: barColor,
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
		<div className="w-full">
			{title && <h3 className="mt-0 mb-4 text-lg font-semibold">{title}</h3>}
			{renderChart()}
		</div>
	);
}

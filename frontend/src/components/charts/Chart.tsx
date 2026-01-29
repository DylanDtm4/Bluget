import React, { useState } from "react";
import {
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

interface ChartData {
	[key: string]: string | number;
}

interface PieChartProps {
	type: "pie";
	data: Array<{ name: string; value: number; color: string }>;
	title?: string;
}

interface LineChartProps {
	type: "line";
	data: ChartData[];
	dataKey: string;
	xAxisKey: string;
	title: string;
	strokeColor?: string;
}

type ChartProps = PieChartProps | LineChartProps;

// Custom tooltip for pie chart
interface TooltipPayload {
	name: string;
	value: number;
	payload: {
		total: number;
		name: string;
		value: number;
		color: string;
	};
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: TooltipPayload[];
}

const CustomPieTooltip = ({ active, payload }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		const data = payload[0];
		const total = payload[0].payload.total;
		const percentage = ((data.value / total) * 100).toFixed(1);

		return (
			<div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
				<p className="font-semibold text-gray-800">{data.name}</p>
				<p className="text-blue-600 font-bold">
					${data.value.toLocaleString()}
				</p>
				<p className="text-sm text-gray-600">{percentage}% of total</p>
			</div>
		);
	}
	return null;
};

export default function Chart(props: ChartProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	if (props.type === "pie") {
		// Calculate total for percentage
		const total = props.data.reduce((sum, item) => sum + item.value, 0);
		const dataWithTotal = props.data.map((item) => ({ ...item, total }));

		return (
			<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
				<h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">
					{props.title}
				</h3>
				<ResponsiveContainer width="100%" height={180}>
					<PieChart>
						<Pie
							data={dataWithTotal}
							dataKey="value"
							cx="50%"
							cy="50%"
							outerRadius={70}
							onMouseEnter={(_, index) => setActiveIndex(index)}
							onMouseLeave={() => setActiveIndex(null)}
						>
							{dataWithTotal.map((entry, index) => (
								<Cell
									key={index}
									fill={entry.color}
									opacity={
										activeIndex === null || activeIndex === index ? 1 : 0.6
									}
									style={{ cursor: "pointer" }}
								/>
							))}
						</Pie>
						<Tooltip content={<CustomPieTooltip />} />
					</PieChart>
				</ResponsiveContainer>
				<div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-3">
					{props.data.map((item, i) => {
						const percentage = ((item.value / total) * 100).toFixed(1);
						return (
							<div
								key={i}
								className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
								onMouseEnter={() => setActiveIndex(i)}
								onMouseLeave={() => setActiveIndex(null)}
							>
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: item.color }}
								></div>
								<span className="text-xs sm:text-sm text-gray-600">
									{item.name} ({percentage}%)
								</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	if (props.type === "line") {
		return (
			<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
				<h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
					{props.title}
				</h3>
				<ResponsiveContainer width="100%" height={180}>
					<LineChart data={props.data}>
						<XAxis
							dataKey={props.xAxisKey}
							stroke="#94a3b8"
							style={{ fontSize: "12px" }}
						/>
						<YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
						<Tooltip
							contentStyle={{
								backgroundColor: "white",
								border: "1px solid #e5e7eb",
								borderRadius: "0.5rem",
								padding: "8px 12px",
							}}
							formatter={(value: number | string | undefined) => [
								value ?? "—",
								"Amount",
							]}
						/>
						<Line
							type="monotone"
							dataKey={props.dataKey}
							stroke={props.strokeColor || "#2563eb"}
							strokeWidth={2}
							dot={{ fill: props.strokeColor || "#2563eb", r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}

	return null;
}

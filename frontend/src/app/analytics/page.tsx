"use client";

import { useState, useMemo } from "react";
import {
	ComposedChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, BarChart2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

function fmt(n: number) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function monthLabel(s: string) {
	const [y, m] = s.split("-").map(Number);
	return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function currentMonth() {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function subtractMonths(yyyyMm: string, n: number): string {
	const [y, m] = yyyyMm.split("-").map(Number);
	const d = new Date(y, m - 1 - n, 1);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function startOfYear(yyyyMm: string): string {
	return `${yyyyMm.split("-")[0]}-01`;
}

const PERIODS = [
	{ id: "ytd", label: "YTD" },
	{ id: "1y", label: "1 Year" },
	{ id: "2y", label: "2 Years" },
	{ id: "5y", label: "5 Years" },
] as const;

type PeriodId = (typeof PERIODS)[number]["id"];

const BAR_COLORS = {
	income: "#22C55E",
	expenses: "#EF4444",
	investments: "#F59E0B",
	savings: "#A855F7",
};

const TOOLTIP_STYLE = {
	backgroundColor: "white",
	border: "1px solid #E5E7EB",
	borderRadius: "0.5rem",
	fontSize: "13px",
};

function SummaryCard({
	title,
	value,
	icon: Icon,
	bgColor,
	iconColor,
	isPositive,
}: {
	title: string;
	value: string;
	icon: React.ElementType;
	bgColor: string;
	iconColor: string;
	isPositive?: boolean;
}) {
	return (
		<div className="bg-white p-4 sm:p-5 rounded-lg shadow-md">
			<div className="flex items-center gap-3">
				<div className="flex-1 min-w-0">
					<p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{title}</p>
					<p className={`text-lg sm:text-xl font-bold ${isPositive === false ? "text-red-600" : "text-blue-900"}`}>
						{value}
					</p>
				</div>
				<div className={`${bgColor} p-2 sm:p-3 rounded-lg shrink-0`}>
					<Icon className={iconColor} size={18} />
				</div>
			</div>
		</div>
	);
}

export default function AnalyticsPage() {
	const [period, setPeriod] = useState<PeriodId>("ytd");
	const now = currentMonth();

	const { start, end } = useMemo(() => {
		if (period === "ytd") return { start: startOfYear(now), end: now };
		if (period === "1y") return { start: subtractMonths(now, 11), end: now };
		if (period === "2y") return { start: subtractMonths(now, 23), end: now };
		return { start: subtractMonths(now, 59), end: now };
	}, [period, now]);

	const { data, loading, error } = useAnalytics(start, end);

	const chartData = useMemo(
		() =>
			(data?.months ?? []).map((m) => ({
				name: monthLabel(m.month),
				income: m.totalIncome,
				expenses: m.totalExpenses,
				investments: m.totalInvestments,
				savings: m.totalSavings,
				net: m.net,
			})),
		[data]
	);

	const savingsRateData = useMemo(
		() =>
			(data?.months ?? []).map((m) => ({
				name: monthLabel(m.month),
				rate: m.totalIncome > 0 ? Math.round((m.net / m.totalIncome) * 100) : 0,
			})),
		[data]
	);

	const pieData = useMemo(
		() =>
			(data?.categoryBreakdown ?? [])
				.filter((c) => c.total > 0)
				.sort((a, b) => b.total - a.total)
				.slice(0, 10),
		[data]
	);

	const totals = data?.totals;
	const savingsRate = totals && totals.totalIncome > 0
		? Math.round((totals.net / totals.totalIncome) * 100)
		: 0;

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Analytics</h1>
				<p className="text-sm text-gray-500 mt-1">Financial overview across time</p>
			</div>

			{/* Period selector */}
			<div className="flex gap-2 mb-6 flex-wrap">
				{PERIODS.map((p) => (
					<button
						key={p.id}
						onClick={() => setPeriod(p.id)}
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
							period === p.id
								? "bg-blue-600 text-white shadow"
								: "bg-white text-gray-600 hover:bg-blue-50 shadow-sm"
						}`}
					>
						{p.label}
					</button>
				))}
				<span className="text-xs text-gray-400 self-center ml-2">
					{start} → {end}
				</span>
			</div>

			{loading && (
				<p className="text-sm text-gray-500 text-center py-16">Loading analytics...</p>
			)}
			{error && (
				<p className="text-sm text-red-500 text-center py-16">{error}</p>
			)}

			{!loading && !error && totals && (
				<>
					{/* Summary cards */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
						<SummaryCard title="Total Income" value={fmt(totals.totalIncome)} icon={TrendingUp} bgColor="bg-green-100" iconColor="text-green-600" isPositive={true} />
						<SummaryCard title="Total Expenses" value={fmt(totals.totalExpenses)} icon={TrendingDown} bgColor="bg-red-100" iconColor="text-red-600" />
						<SummaryCard title="Net" value={fmt(totals.net)} icon={Wallet} bgColor={totals.net >= 0 ? "bg-blue-100" : "bg-orange-100"} iconColor={totals.net >= 0 ? "text-blue-600" : "text-orange-600"} isPositive={totals.net >= 0} />
						<SummaryCard title="Investments" value={fmt(totals.totalInvestments)} icon={BarChart2} bgColor="bg-amber-100" iconColor="text-amber-600" isPositive={true} />
						<SummaryCard title="Savings" value={fmt(totals.totalSavings)} icon={PiggyBank} bgColor="bg-purple-100" iconColor="text-purple-600" isPositive={true} />
					</div>

					{/* Monthly trends */}
					<div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
						<h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-4">Monthly Trends</h3>
						<ResponsiveContainer width="100%" height={300}>
							<ComposedChart data={chartData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
								<XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#D1D5DB" />
								<YAxis
									tick={{ fontSize: 11 }}
									stroke="#D1D5DB"
									tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
								/>
								<Tooltip
									contentStyle={TOOLTIP_STYLE}
									formatter={(v: number, name: string) => [fmt(v), name.charAt(0).toUpperCase() + name.slice(1)]}
								/>
								<Legend wrapperStyle={{ fontSize: 12 }} />
								<Bar dataKey="income" name="Income" fill={BAR_COLORS.income} radius={[3, 3, 0, 0]} maxBarSize={32} />
								<Bar dataKey="expenses" name="Expenses" fill={BAR_COLORS.expenses} radius={[3, 3, 0, 0]} maxBarSize={32} />
								<Bar dataKey="investments" name="Investments" fill={BAR_COLORS.investments} radius={[3, 3, 0, 0]} maxBarSize={32} />
								<Bar dataKey="savings" name="Savings" fill={BAR_COLORS.savings} radius={[3, 3, 0, 0]} maxBarSize={32} />
								<Line type="monotone" dataKey="net" name="Net" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: "#3B82F6" }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
						{/* Category breakdown */}
						<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
							<h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-4">Spending by Category</h3>
							{pieData.length === 0 ? (
								<p className="text-sm text-gray-400 text-center py-8">No spending data</p>
							) : (
								<div className="flex gap-4 items-center">
									<div className="flex-1 min-w-0">
										<ResponsiveContainer width="100%" height={220}>
											<PieChart>
												<Pie data={pieData} dataKey="total" cx="50%" cy="50%" outerRadius={90} innerRadius={40}>
													{pieData.map((entry, i) => (
														<Cell key={i} fill={entry.color} />
													))}
												</Pie>
												<Tooltip
													contentStyle={TOOLTIP_STYLE}
													formatter={(v: number) => [fmt(v), "Total"]}
												/>
											</PieChart>
										</ResponsiveContainer>
									</div>
									<div className="w-40 shrink-0 flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
										{pieData.map((c, i) => {
											const total = pieData.reduce((s, x) => s + x.total, 0);
											return (
												<div key={i} className="flex items-center gap-1.5">
													<div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
													<span className="text-xs text-gray-600 truncate flex-1">{c.name}</span>
													<span className="text-xs font-semibold text-gray-700 shrink-0">
														{((c.total / total) * 100).toFixed(0)}%
													</span>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>

						{/* Savings rate trend */}
						<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-base sm:text-lg font-semibold text-blue-900">Savings Rate</h3>
								<span className={`text-sm font-bold px-3 py-1 rounded-full ${savingsRate >= 20 ? "bg-green-100 text-green-700" : savingsRate >= 10 ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
									Avg {savingsRate}%
								</span>
							</div>
							<ResponsiveContainer width="100%" height={200}>
								<AreaChart data={savingsRateData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
									<defs>
										<linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
											<stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
									<XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#D1D5DB" />
									<YAxis tick={{ fontSize: 11 }} stroke="#D1D5DB" tickFormatter={(v) => `${v}%`} />
									<Tooltip
										contentStyle={TOOLTIP_STYLE}
										formatter={(v: number) => [`${v}%`, "Savings Rate"]}
									/>
									<Area
										type="monotone"
										dataKey="rate"
										stroke="#3B82F6"
										strokeWidth={2}
										fill="url(#rateGrad)"
										dot={{ r: 3, fill: "#3B82F6" }}
									/>
								</AreaChart>
							</ResponsiveContainer>
							<p className="text-xs text-gray-400 mt-2">Net ÷ Income per month</p>
						</div>
					</div>

					{/* Top categories table */}
					<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
						<h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-4">Top Spending Categories</h3>
						{pieData.length === 0 ? (
							<p className="text-sm text-gray-400 text-center py-4">No data</p>
						) : (
							<div className="space-y-3">
								{pieData.map((c, i) => {
									const max = pieData[0].total;
									const pct = (c.total / max) * 100;
									return (
										<div key={i} className="flex items-center gap-3">
											<span className="text-xs text-gray-400 w-4 shrink-0">{i + 1}</span>
											<div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
											<span className="text-sm text-gray-700 w-28 shrink-0 truncate">{c.name}</span>
											<div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
												<div
													className="h-2 rounded-full transition-all"
													style={{ width: `${pct}%`, backgroundColor: c.color }}
												/>
											</div>
											<span className="text-sm font-semibold text-gray-800 w-20 text-right shrink-0">
												{fmt(c.total)}
											</span>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

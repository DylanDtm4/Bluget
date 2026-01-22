"use client";

import Chart from "@/components/charts/Chart";
import SummaryCard from "@/components/ui/SummaryCard";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  // Summary metrics
  const currentBalance = 3250.75;
  const monthlyIncome = 5000.0;
  const monthlyExpenses = 2800.0;
  const netIncome = monthlyIncome - monthlyExpenses;
  const savingsRate = ((netIncome / monthlyIncome) * 100).toFixed(1);

  // Chart data
  const spendingByCategory = [
    { name: "Groceries", value: 450 },
    { name: "Rent", value: 1200 },
    { name: "Entertainment", value: 200 },
    { name: "Transportation", value: 150 },
    { name: "Utilities", value: 300 },
    { name: "Other", value: 500 },
  ];

  const monthlyTrend = [
    { name: "Jan", income: 4800, expenses: 2600 },
    { name: "Feb", income: 5000, expenses: 2400 },
    { name: "Mar", income: 5200, expenses: 2800 },
    { name: "Apr", income: 5000, expenses: 3100 },
    { name: "May", income: 5000, expenses: 2700 },
    { name: "Jun", income: 5000, expenses: 2800 },
  ];

  const budgetProgress = [
    { name: "Groceries", value: 450, max: 600, color: "#82ca9d" },
    { name: "Rent", value: 1200, max: 1200, color: "#ff7c7c" },
    { name: "Entertainment", value: 200, max: 300, color: "#ffc658" },
    { name: "Transportation", value: 150, max: 200, color: "#8884d8" },
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: "1",
      title: "Grocery Store",
      data: {
        amount: 45.32,
        date: "2025-01-02",
        mainCategory: "Expense",
        secondaryCategory: "Groceries",
      },
    },
    {
      id: "2",
      title: "Paycheck",
      data: {
        amount: 2500.0,
        date: "2025-01-01",
        mainCategory: "Income",
        secondaryCategory: "Salary",
      },
    },
    {
      id: "3",
      title: "Gas Station",
      data: {
        amount: 35.0,
        date: "2024-12-31",
        mainCategory: "Expense",
        secondaryCategory: "Transportation",
      },
    },
  ];

  // Upcoming bills
  const upcomingBills = [
    {
      id: "1",
      title: "Rent",
      data: {
        amount: 1200.0,
        frequency: "Monthly",
        nextRun: "2025-01-05",
        mainCategory: "Expense",
        secondaryCategory: "Housing",
        startDate: new Date("2024-01-01"),
      },
    },
    {
      id: "2",
      title: "Netflix",
      data: {
        amount: 15.99,
        frequency: "Monthly",
        nextRun: "2025-01-12",
        mainCategory: "Expense",
        secondaryCategory: "Entertainment",
        startDate: new Date("2024-01-01"),
      },
    },
  ];

  const handleEditTransaction = (id: string) => {
    router.push(`/transactions/${id}/edit`);
  };

  const handleEditRecurring = (id: string) => {
    router.push(`/recurring/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete", id);
  };

  return (
    <div className="sm:p-2 md:p-4 p-8 bg-gray-100 min-h-screen overflow-y-auto">
      <h1 className="mb-8 text-gray-600">Dashboard</h1>

      {/* Summary Cards Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <SummaryCard
          title="Current Balance"
          amount={currentBalance}
          color="#8884d8"
          subtitle="Available now"
        />
        <SummaryCard
          title="Monthly Income"
          amount={monthlyIncome}
          color="#82ca9d"
          trend={{ value: 4.2, isPositive: true }}
        />
        <SummaryCard
          title="Monthly Expenses"
          amount={monthlyExpenses}
          color="#ff7c7c"
          trend={{ value: 3.5, isPositive: false }}
        />
        <SummaryCard
          title="Net Income"
          amount={netIncome}
          color={netIncome >= 0 ? "#82ca9d" : "#ff7c7c"}
          subtitle={`${savingsRate}% savings rate`}
        />
      </div>

      {/* Monthly Trend Line Chart - Full Width */}
      <div className="bg-white rounded-lg p-6 border border-gray-300 mb-8">
        <Chart
          title="Income vs Expenses (6 Months)"
          type="line"
          data={monthlyTrend}
          categoryKey="name"
          lines={[
            { dataKey: "income", color: "#82ca9d", label: "Income" },
            { dataKey: "expenses", color: "#ff7c7c", label: "Expenses" },
          ]}
          height={350}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <Chart
            title="Spending by Category"
            type="pie"
            data={spendingByCategory}
            dataKey="value"
            categoryKey="name"
          />
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <Chart
            title="Budget Progress"
            type="progress"
            data={budgetProgress}
          />
        </div>
      </div>

      {/* Bottom Row: Recent Transactions & Upcoming Bills */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <Link href="/transactions">
            <h3 className="mt-0 mb-4 text-gray-600">Recent Transactions</h3>
          </Link>
          {recentTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              id={transaction.id}
              title={transaction.title}
              data={transaction.data}
              type="transaction"
              onEdit={() => handleEditTransaction(transaction.id)}
              onDelete={() => handleDelete(transaction.id)}
            />
          ))}
        </div>

        {/* Upcoming Bills */}
        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <Link href="/transactions/#recurring">
            <h3 className="mt-0 mb-4 text-gray-600">Upcoming Bills</h3>
          </Link>
          {upcomingBills.map((bill) => (
            <Card
              key={bill.id}
              id={bill.id}
              title={bill.title}
              data={bill.data}
              type="recurring"
              onEdit={() => handleEditRecurring(bill.id)}
              onDelete={() => handleDelete(bill.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

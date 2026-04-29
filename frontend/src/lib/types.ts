export type User = {
  _id: string;
  name: string;
  email: string;
  currency?: string;
  timezone?: string;
  theme?: string;
};

export type Category = {
  _id: string;
  userId: string;
  name: string;
  color: string;
  icon: string;
};

export type Transaction = {
  _id: string;
  userId: string;
  amount: number;
  transactionType: "expense" | "income" | "investment" | "savings";
  category: string | null;
  categoryColor?: string;
  categoryIcon?: string;
  date: string;
  note?: string;
};

export type Budget = {
  _id: string;
  userId: string;
  category: string;
  amount: number;
  month: number | null;
  year: number | null;
  note?: string;
  recurring?: boolean;
};

export type RecurringTransaction = {
  _id: string;
  userId: string;
  amount: number;
  transactionType: "expense" | "income" | "investment" | "savings";
  category: string | null;
  categoryColor?: string;
  categoryIcon?: string;
  note?: string;
  frequency: "daily" | "weekly" | "monthly";
  nextRun: string;
  startDate: string;
  endDate: string;
};

export type MonthlySummary = {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  totalInvestments: number;
  totalSavings: number;
  net: number;
  categoryBreakdown: { _id: string; total: number }[];
  biggestExpense: { _id: string; amount: number } | null;
  topFiveExpenses: { _id: string; amount: number }[];
};

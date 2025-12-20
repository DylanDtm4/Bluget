export type User = {
  userId: string;
  email: string;
};

export type Transaction = {
  userId: string;
  amount: number;
  type: "income" | "expense" | "investment" | "savings";
  date: Date;
  note: string;
};

export type Budget = {
  userId: string;
  category: string;
  amount: number;
  month: number;
  year: number;
  note: string;
};

export type Category = {
  userId: string;
  category: string;
  custom: boolean;
};

export type RecurringTransaction = {
  userId: string;
  amount: number;
  type: "income" | "expense" | "investment" | "savings";
  category: string;
  note: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  nextRun: Date;
  startDate: Date;
  endDate: Date;
};

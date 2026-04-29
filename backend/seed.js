// Run: node seed.js <email>
// Seeds realistic transaction + budget data for March and April 2026

require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./src/models/Category");
const Transaction = require("./src/models/Transaction");
const Budget = require("./src/models/Budget");
const User = require("./src/models/User");

const EMAIL = process.argv[2];
if (!EMAIL) {
  console.error("Usage: node seed.js <email>");
  process.exit(1);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const user = await User.findOne({ email: EMAIL });
  if (!user) { console.error("User not found"); process.exit(1); }
  const userId = String(user._id);
  console.log("Seeding for:", user.email);

  // 1. Upsert categories
  const catDefs = [
    { name: "Paycheck",       color: "#22C55E", icon: "income" },
    { name: "Freelance",      color: "#84CC16", icon: "income" },
    { name: "Rent",           color: "#3B82F6", icon: "home" },
    { name: "Groceries",      color: "#10B981", icon: "shopping" },
    { name: "Utilities",      color: "#F59E0B", icon: "utilities" },
    { name: "Gas",            color: "#F97316", icon: "transport" },
    { name: "Dining Out",     color: "#EF4444", icon: "food" },
    { name: "Entertainment",  color: "#EC4899", icon: "other" },
    { name: "Subscriptions",  color: "#8B5CF6", icon: "subscriptions" },
    { name: "Healthcare",     color: "#06B6D4", icon: "other" },
    { name: "Clothing",       color: "#A855F7", icon: "shopping" },
    { name: "Gym",            color: "#14B8A6", icon: "fitness" },
    { name: "VOO",            color: "#F59E0B", icon: "investments" },
    { name: "Emergency Fund", color: "#10B981", icon: "savings" },
  ];

  const catMap = {};
  for (const c of catDefs) {
    const doc = await Category.findOneAndUpdate(
      { userId, name: c.name },
      { userId, ...c },
      { upsert: true, new: true }
    );
    catMap[c.name] = doc._id;
  }
  console.log(`${catDefs.length} categories ready`);

  // 2. Seed transactions (skip if already exist for those dates)
  const txDefs = [
    // ── March 2026 ──────────────────────────────────────────────
    { transactionType: "income",     category: "Paycheck",      amount: 2800, date: "2026-03-01", note: "Bi-weekly paycheck" },
    { transactionType: "income",     category: "Paycheck",      amount: 2800, date: "2026-03-15", note: "Bi-weekly paycheck" },
    { transactionType: "income",     category: "Freelance",     amount: 450,  date: "2026-03-20", note: "Design project" },
    { transactionType: "expense",    category: "Rent",          amount: 1350, date: "2026-03-01", note: "March rent" },
    { transactionType: "expense",    category: "Groceries",     amount: 95,   date: "2026-03-03", note: "Weekly shop" },
    { transactionType: "expense",    category: "Groceries",     amount: 112,  date: "2026-03-10", note: "Weekly shop" },
    { transactionType: "expense",    category: "Groceries",     amount: 88,   date: "2026-03-17", note: "Weekly shop" },
    { transactionType: "expense",    category: "Groceries",     amount: 104,  date: "2026-03-24", note: "Weekly shop" },
    { transactionType: "expense",    category: "Utilities",     amount: 145,  date: "2026-03-05", note: "Electric + water" },
    { transactionType: "expense",    category: "Gas",           amount: 62,   date: "2026-03-08", note: "Fill up" },
    { transactionType: "expense",    category: "Gas",           amount: 58,   date: "2026-03-22", note: "Fill up" },
    { transactionType: "expense",    category: "Dining Out",    amount: 45,   date: "2026-03-07", note: "Friday dinner" },
    { transactionType: "expense",    category: "Dining Out",    amount: 32,   date: "2026-03-14", note: "Lunch with team" },
    { transactionType: "expense",    category: "Dining Out",    amount: 78,   date: "2026-03-21", note: "Birthday dinner" },
    { transactionType: "expense",    category: "Subscriptions", amount: 48,   date: "2026-03-01", note: "Netflix, Spotify, iCloud" },
    { transactionType: "expense",    category: "Entertainment", amount: 36,   date: "2026-03-15", note: "Movie tickets" },
    { transactionType: "expense",    category: "Gym",           amount: 40,   date: "2026-03-01", note: "Monthly membership" },
    { transactionType: "expense",    category: "Healthcare",    amount: 25,   date: "2026-03-12", note: "Pharmacy" },
    { transactionType: "expense",    category: "Clothing",      amount: 110,  date: "2026-03-18", note: "Spring clothes" },
    { transactionType: "investment", category: "VOO",           amount: 300,  date: "2026-03-15", note: "Monthly contribution" },
    { transactionType: "savings",    category: "Emergency Fund",amount: 200,  date: "2026-03-01", note: "Monthly transfer" },
    // ── April 2026 ──────────────────────────────────────────────
    { transactionType: "income",     category: "Paycheck",      amount: 2800, date: "2026-04-01", note: "Bi-weekly paycheck" },
    { transactionType: "income",     category: "Paycheck",      amount: 2800, date: "2026-04-15", note: "Bi-weekly paycheck" },
    { transactionType: "income",     category: "Freelance",     amount: 650,  date: "2026-04-10", note: "Website build" },
    { transactionType: "expense",    category: "Rent",          amount: 1350, date: "2026-04-01", note: "April rent" },
    { transactionType: "expense",    category: "Groceries",     amount: 102,  date: "2026-04-06", note: "Weekly shop" },
    { transactionType: "expense",    category: "Groceries",     amount: 89,   date: "2026-04-13", note: "Weekly shop" },
    { transactionType: "expense",    category: "Groceries",     amount: 115,  date: "2026-04-20", note: "Weekly shop" },
    { transactionType: "expense",    category: "Groceries",     amount: 93,   date: "2026-04-27", note: "Weekly shop" },
    { transactionType: "expense",    category: "Utilities",     amount: 132,  date: "2026-04-05", note: "Electric + water" },
    { transactionType: "expense",    category: "Gas",           amount: 70,   date: "2026-04-09", note: "Fill up" },
    { transactionType: "expense",    category: "Gas",           amount: 64,   date: "2026-04-23", note: "Fill up" },
    { transactionType: "expense",    category: "Dining Out",    amount: 55,   date: "2026-04-04", note: "Friday dinner" },
    { transactionType: "expense",    category: "Dining Out",    amount: 28,   date: "2026-04-11", note: "Lunch" },
    { transactionType: "expense",    category: "Dining Out",    amount: 92,   date: "2026-04-19", note: "Anniversary dinner" },
    { transactionType: "expense",    category: "Subscriptions", amount: 48,   date: "2026-04-01", note: "Netflix, Spotify, iCloud" },
    { transactionType: "expense",    category: "Entertainment", amount: 85,   date: "2026-04-12", note: "Concert tickets" },
    { transactionType: "expense",    category: "Gym",           amount: 40,   date: "2026-04-01", note: "Monthly membership" },
    { transactionType: "expense",    category: "Healthcare",    amount: 150,  date: "2026-04-08", note: "Doctor visit + copay" },
    { transactionType: "investment", category: "VOO",           amount: 400,  date: "2026-04-15", note: "Monthly contribution" },
    { transactionType: "savings",    category: "Emergency Fund",amount: 250,  date: "2026-04-01", note: "Monthly transfer" },
  ];

  const txDocs = txDefs.map(({ category, ...rest }) => ({
    ...rest,
    userId,
    category: catMap[category],
    date: new Date(rest.date),
  }));

  const txResult = await Transaction.insertMany(txDocs);
  console.log(`${txResult.length} transactions inserted`);

  // 3. Seed budgets
  const budgetTemplates = [
    { category: "Rent",          amount: 1350 },
    { category: "Groceries",     amount: 400  },
    { category: "Utilities",     amount: 150  },
    { category: "Gas",           amount: 120  },
    { category: "Dining Out",    amount: 100  },
    { category: "Subscriptions", amount: 50   },
    { category: "Entertainment", amount: 60   },
    { category: "Gym",           amount: 40   },
    { category: "Healthcare",    amount: 50   },
    { category: "VOO",           amount: 350  },
    { category: "Emergency Fund",amount: 200  },
  ];

  let budgetsAdded = 0;
  for (const month of [3, 4]) {
    for (const tpl of budgetTemplates) {
      const exists = await Budget.findOne({ userId, category: tpl.category, month, year: 2026 });
      if (!exists) {
        await Budget.create({ userId, ...tpl, month, year: 2026 });
        budgetsAdded++;
      }
    }
  }
  console.log(`${budgetsAdded} budgets inserted`);

  await mongoose.disconnect();
  console.log("\nDone! Open the dashboard and switch to March or April 2026.");
}

run().catch((err) => {
  console.error(err.message ?? err);
  mongoose.disconnect();
  process.exit(1);
});

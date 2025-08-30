import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const { width } = Dimensions.get("window")

// Mock data based on the backend structure
const mockUser = {
  username: "Sarah Johnson",
  email: "sarah@example.com",
  netValue: 45750.32,
  incomeCategory: [
    { name: "Paycheck", amount: 4200, date: "2024-01-15" },
    { name: "Freelance", amount: 800, date: "2024-01-10" },
    { name: "Investment Returns", amount: 150, date: "2024-01-05" },
  ],
  expensesCategory: [
    { name: "Groceries", amount: 320, date: "2024-01-14" },
    { name: "Gas", amount: 85, date: "2024-01-12" },
    { name: "Food & Drink", amount: 180, date: "2024-01-11" },
  ],
  savingsCategory: [
    { name: "Emergency Fund", amount: 500, date: "2024-01-15" },
    { name: "Vacation", amount: 200, date: "2024-01-15" },
  ],
  investmentsCategory: [
    { name: "401k", amount: 600, date: "2024-01-15" },
    { name: "Roth IRA", amount: 500, date: "2024-01-15" },
    { name: "Brokerage", amount: 300, date: "2024-01-10" },
  ],
  budgets: [800, 400, 300, 200, 150], // groceries, gas, dining, entertainment, shopping
}

const mockTransactions = [
  { value: -45.32, category: "Groceries", date: "2024-01-14", note: "Weekly shopping" },
  { value: -12.5, category: "Coffee", date: "2024-01-14", note: "Morning coffee" },
  { value: 4200.0, category: "Paycheck", date: "2024-01-15", note: "Bi-weekly salary" },
  { value: -85.0, category: "Gas", date: "2024-01-12", note: "Fill up" },
  { value: -28.99, category: "Subscription", date: "2024-01-11", note: "Netflix" },
]

const BudgetDashboard = () => {
  const totalIncome = mockUser.incomeCategory.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = mockUser.expensesCategory.reduce((sum, item) => sum + item.amount, 0)
  const totalSavings = mockUser.savingsCategory.reduce((sum, item) => sum + item.amount, 0)
  const totalInvestments = mockUser.investmentsCategory.reduce((sum, item) => sum + item.amount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const CategoryCard = ({ title, amount, color, icon }: any) => (
    <View style={[styles.categoryCard, { borderLeftColor: color }]}>
      <Text style={styles.categoryIcon}>{icon}</Text>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={[styles.categoryAmount, { color }]}>{formatCurrency(amount)}</Text>
      </View>
    </View>
  )

  const TransactionItem = ({ transaction }: any) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionNote}>{transaction.note}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: transaction.value > 0 ? styles.incomeColor.color : styles.expenseColor.color },
          ]}
        >
          {transaction.value > 0 ? "+" : ""}
          {formatCurrency(transaction.value)}
        </Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </View>
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.username}>{mockUser.username}</Text>
      </View>

      {/* Net Worth Card */}
      <View style={styles.netWorthCard}>
        <Text style={styles.netWorthLabel}>Total Net Worth</Text>
        <Text style={styles.netWorthAmount}>{formatCurrency(mockUser.netValue)}</Text>
        <View style={styles.netWorthChange}>
          <Text style={styles.changeText}>+2.4% from last month</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Monthly Income</Text>
          <Text style={[styles.statAmount, styles.incomeColor]}>{formatCurrency(totalIncome)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Monthly Expenses</Text>
          <Text style={[styles.statAmount, styles.expenseColor]}>{formatCurrency(totalExpenses)}</Text>
        </View>
      </View>

      {/* Categories Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories Overview</Text>
        <CategoryCard title="Savings" amount={totalSavings} color="#4A90E2" icon="💰" />
        <CategoryCard title="Investments" amount={totalInvestments} color="#2E86AB" icon="📈" />
        <CategoryCard title="Expenses" amount={totalExpenses} color="#F39C12" icon="💳" />
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsList}>
          {mockTransactions.slice(0, 5).map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </View>
      </View>

      {/* Budget Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Progress</Text>
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetTitle}>Groceries</Text>
            <Text style={styles.budgetAmount}>$320 / $800</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "40%" }]} />
          </View>
          <Text style={styles.budgetRemaining}>$480 remaining</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#7B9BB8",
    fontWeight: "400",
  },
  username: {
    fontSize: 28,
    color: "#2E4A6B",
    fontWeight: "700",
    marginTop: 4,
  },
  netWorthCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#2E86AB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  netWorthLabel: {
    fontSize: 14,
    color: "#7B9BB8",
    fontWeight: "500",
    marginBottom: 8,
  },
  netWorthAmount: {
    fontSize: 36,
    color: "#2E4A6B",
    fontWeight: "800",
    marginBottom: 12,
  },
  netWorthChange: {
    backgroundColor: "#E8F4FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  changeText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "600",
  },
  quickStats: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#2E86AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E8F4FD",
    marginHorizontal: 20,
  },
  statLabel: {
    fontSize: 12,
    color: "#7B9BB8",
    fontWeight: "500",
    marginBottom: 8,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "700",
  },
  incomeColor: {
    color: "#27AE60",
  },
  expenseColor: {
    color: "#E74C3C",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#2E4A6B",
    fontWeight: "700",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "600",
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    shadowColor: "#2E86AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    color: "#2E4A6B",
    fontWeight: "600",
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 18,
    fontWeight: "700",
  },
  transactionsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#2E86AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F7FF",
  },
  transactionLeft: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    color: "#2E4A6B",
    fontWeight: "600",
    marginBottom: 2,
  },
  transactionNote: {
    fontSize: 12,
    color: "#7B9BB8",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#7B9BB8",
  },
  budgetCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#2E86AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  budgetTitle: {
    fontSize: 16,
    color: "#2E4A6B",
    fontWeight: "600",
  },
  budgetAmount: {
    fontSize: 14,
    color: "#7B9BB8",
    fontWeight: "500",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E8F4FD",
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4A90E2",
    borderRadius: 4,
  },
  budgetRemaining: {
    fontSize: 12,
    color: "#27AE60",
    fontWeight: "500",
  },
})

export default BudgetDashboard
// app/transactions/page.tsx (App Router) or pages/transactions.tsx
import TransactionForm from "@/components/forms/TransactionForm";

export default function TransactionsPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Transaction Form Preview</h1>
      <TransactionForm />
    </div>
  );
}

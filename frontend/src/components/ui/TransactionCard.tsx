// components/TransactionCard.tsx
import Link from "next/link";

type TransactionCardProps = {
  id: string; // transaction id
  type: string;
  date: string;
  amount: number;
};

export default function TransactionCard({
  id,
  type,
  date,
  amount,
}: TransactionCardProps) {
  const color = type.toLowerCase() === "income" ? "green" : "red";

  return (
    <Link href={`/transactions/${id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div>
          <p style={{ fontWeight: "bold" }}>{type}</p>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>{date}</p>
        </div>
        <div style={{ fontWeight: "bold", color }}>${amount.toFixed(2)}</div>
      </div>
    </Link>
  );
}

"use client"; // only if you need client hooks

import { useParams } from "next/navigation";

export default function TransactionDetailPage() {
  const { id } = useParams(); // will be "1", "2", etc.

  return (
    <div>
      <h1>Transaction Detail</h1>
      <p>Transaction ID: {id}</p>
      {/* Later: fetch transaction details from backend using id */}
    </div>
  );
}

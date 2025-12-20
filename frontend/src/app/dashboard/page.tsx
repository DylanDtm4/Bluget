"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) redirect("/login");

  return <div>Dashboard</div>;
}

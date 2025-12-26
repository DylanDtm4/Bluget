// components/Header.tsx
import Link from "next/link";

export default function Header() {
	return (
		<header style={{ padding: "1rem", background: "#89ae3eff" }}>
			<nav>
				<Link href="/dashboard">Dashboard</Link> |{" "}
				<Link href="/budgets">Budgets</Link> |{" "}
				<Link href="/categories">Categories</Link> |{" "}
				<Link href="/transactions">Transactions</Link> |{" "}
				<Link href="/recurring">Recurring Transactions</Link> |{" "}
				<Link href="/login">Login</Link>
			</nav>
		</header>
	);
}

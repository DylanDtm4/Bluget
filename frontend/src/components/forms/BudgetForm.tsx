import Link from "next/link";

// components/BudgetForm.tsx
export default function BudgetForm() {
	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				maxWidth: "500px",
				margin: "0 auto",
			}}
		>
			<div>
				<label>Category:</label>
				<select>
					<option value="expense">Expense</option>
					<option value="income">Income</option>
					<option value="investment">Investment</option>
					<option value="savings">Savings</option>
				</select>
			</div>
			<div>
				<label>Amount:</label>
				<input type="number" placeholder="0.0" />
			</div>

			<div>
				<label>Month:</label>
				<select>
					<option value="january">January</option>
					<option value="february">February</option>
					<option value="march">March</option>
					<option value="april">April</option>
					<option value="may">May</option>
					<option value="june">June</option>
					<option value="july">July</option>
					<option value="august">August</option>
					<option value="september">September</option>
					<option value="october">October</option>
					<option value="november">November</option>
					<option value="december">December</option>
				</select>
			</div>

			<div>
				<label>Year:</label>
				<input type="number" placeholder="2025" />
			</div>

			<div>
				<label>Note:</label>
				<textarea placeholder="Optional note" />
			</div>

			<Link href="/budgets">Add Budget</Link>
		</form>
	);
}

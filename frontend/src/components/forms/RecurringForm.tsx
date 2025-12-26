import Link from "next/link";

// components/RecurringForm.tsx
export default function RecurringForm() {
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
				<label>Amount:</label>
				<input type="number" placeholder="0.00" />
			</div>

			<div>
				<label>Type:</label>
				<select>
					<option value="expense">Expense</option>
					<option value="income">Income</option>
					<option value="investment">Investment</option>
					<option value="savings">Savings</option>
				</select>
			</div>

			<div>
				<label>Category:</label>
				<input type="text" placeholder="Category" />
			</div>

			<div>
				<label>Frequency:</label>
				<select>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="biweekly">Biweekly</option>
					<option value="monthly">Monthly</option>
				</select>
			</div>

			<div>
				<label>Note:</label>
				<textarea placeholder="Optional note" />
			</div>

			<Link href="/recurring">Add Recurring Transaction</Link>
		</form>
	);
}

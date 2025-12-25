import Link from "next/link";

// components/CategoryForm.tsx
export default function CategoryForm() {
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
				<input type="text" placeholder="Category" />
			</div>

			<Link href="/categories">Add Category</Link>
		</form>
	);
}

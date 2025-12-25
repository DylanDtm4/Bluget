// app/categories/new/page.tsx (App Router) or pages/categories/new.tsx
import CategoryForm from "@/components/forms/CategoryForm";

export default function CategoriesNewPage() {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>Category Form</h1>
			<CategoryForm />
		</div>
	);
}

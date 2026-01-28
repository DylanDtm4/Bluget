"use client";

import { useParams, useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";
import DetailPageLayout from "@/components/ui/DetailPageLayout";
import DetailHeader from "@/components/ui/DetailHeader";
import OverviewCard from "@/components/ui/OverviewCard";
import DetailsCard from "@/components/ui/DetailsCard";
import PlaceholderCard from "@/components/ui/PlaceholderCard";
import NotFound from "@/components/ui/NotFound";

type Transaction = {
	id: string;
	mainCategory: string;
	secondaryCategory: string;
	date: string;
	amount: number;
	note?: string;
	color?: string;
};

// Mock category data
const mockCategories = {
	Subscriptions: { icon: "subscriptions", color: "#8B5CF6" },
	Groceries: { icon: "shopping", color: "#10B981" },
	Rent: { icon: "home", color: "#3B82F6" },
	"Tennis Lessons": { icon: "fitness", color: "#14B8A6" },
	Utilities: { icon: "utilities", color: "#F59E0B" },
	Entertainment: { icon: "other", color: "#EC4899" },
	Gas: { icon: "transport", color: "#F97316" },
	Insurance: { icon: "other", color: "#6366F1" },
	"Gym Membership": { icon: "fitness", color: "#14B8A6" },
	"Phone Bill": { icon: "subscriptions", color: "#A855F7" },
};

const getCategoryDetails = (categoryName: string) => {
	return (
		mockCategories[categoryName as keyof typeof mockCategories] || {
			icon: "other",
			color: "#9CA3AF",
		}
	);
};

// Sample data
const sampleTransactions: Record<string, Transaction> = {
	"1": {
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck 1",
		date: "2025-12-20",
		amount: 200,
		note: "Weekly paycheck",
		color: "#10B981",
	},
	"2": {
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		date: "2025-12-21",
		amount: 50,
		note: "Weekly shopping at Kroger",
		color: "#EF4444",
	},
	"3": {
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Utilities",
		date: "2025-12-22",
		amount: 30.5,
		color: "#8B5CF6",
	},
};

export default function TransactionDetailPage() {
	const { id } = useParams();
	const router = useRouter();

	const transaction = sampleTransactions[id as string];

	if (!transaction) {
		return (
			<NotFound
				title="Transaction Not Found"
				message="The transaction you're looking for doesn't exist."
				backLink="/transactions"
				backLabel="Back to Transactions"
			/>
		);
	}

	const categoryDetails = getCategoryDetails(transaction.mainCategory);
	const CategoryIcon = CATEGORY_ICONS.find(
		(cat) => cat.id === categoryDetails.icon,
	)?.Icon;

	const handleEdit = () => {
		router.push(`/transactions/${id}/edit`);
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this transaction?")) {
			console.log("Delete transaction", id);
			router.push("/transactions");
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<DetailPageLayout backLink="/transactions" backLabel="Back to Transactions">
			<DetailHeader
				title={transaction.secondaryCategory}
				subtitle={transaction.mainCategory}
				icon={CategoryIcon}
				iconColor={transaction.color}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<OverviewCard
				title="Transaction Overview"
				accentColor={transaction.color}
				items={[
					{
						label: "Amount",
						value: `$${transaction.amount.toFixed(2)}`,
					},
					{
						label: "Transaction Date",
						value: formatDate(transaction.date),
						bgColor: "#EFF6FF",
						borderColor: "#93C5FD",
						color: "#1E40AF",
					},
				]}
			/>

			<DetailsCard
				title="Details"
				rows={[
					{
						label: "Type",
						value: transaction.mainCategory,
						icon: CategoryIcon && (
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center"
								style={{ backgroundColor: transaction.color }}
							>
								<CategoryIcon className="w-4 h-4 text-white" />
							</div>
						),
					},
					{
						label: "Category",
						value: transaction.secondaryCategory,
					},
					{
						label: "Amount",
						value: `$${transaction.amount.toFixed(2)}`,
					},
					{
						label: "Date",
						value: formatDate(transaction.date),
					},
				]}
				note={transaction.note}
			/>

			<PlaceholderCard
				title="Related Budget"
				description="Link this transaction to a budget category"
				message="Budget linking coming soon!"
				submessage="Connect transactions to budgets for better tracking"
				icon={Calendar}
			/>
		</DetailPageLayout>
	);
}

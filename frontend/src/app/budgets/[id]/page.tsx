"use client";

import { useParams, useRouter } from "next/navigation";
import { TrendingUp } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";
import DetailPageLayout from "@/components/ui/DetailPageLayout";
import DetailHeader from "@/components/ui/DetailHeader";
import OverviewCard from "@/components/ui/OverviewCard";
import DetailsCard from "@/components/ui/DetailsCard";
import PlaceholderCard from "@/components/ui/PlaceholderCard";
import NotFound from "@/components/ui/NotFound";

type Budget = {
	id: string;
	category: string;
	amount: number;
	month: number;
	year: number;
	note?: string;
};

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

const sampleBudgets: Record<string, Budget> = {
	"1": {
		id: "1",
		category: "Subscriptions",
		amount: 50,
		month: 12,
		year: 2025,
		note: "Netflix, Spotify, etc.",
	},
	"2": {
		id: "2",
		category: "Groceries",
		amount: 200,
		month: 12,
		year: 2025,
		note: "Weekly shopping",
	},
	"3": {
		id: "3",
		category: "Rent",
		amount: 1200,
		month: 12,
		year: 2025,
	},
};

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function BudgetDetailPage() {
	const { id } = useParams();
	const router = useRouter();

	const budget = sampleBudgets[id as string];

	if (!budget) {
		return (
			<NotFound
				title="Budget Not Found"
				message="The budget you're looking for doesn't exist."
				backLink="/budgets"
				backLabel="Back to Budgets"
			/>
		);
	}

	const categoryDetails = getCategoryDetails(budget.category);
	const CategoryIcon = CATEGORY_ICONS.find(
		(cat) => cat.id === categoryDetails.icon,
	)?.Icon;

	const handleEdit = () => {
		router.push(`/budgets/${id}/edit`);
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this budget?")) {
			console.log("Delete budget", id);
			router.push("/budgets");
		}
	};

	return (
		<DetailPageLayout backLink="/budgets" backLabel="Back to Budgets">
			<DetailHeader
				title={budget.category}
				subtitle={`${monthNames[budget.month - 1]} ${budget.year}`}
				icon={CategoryIcon}
				iconColor={categoryDetails.color}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<OverviewCard
				title="Budget Overview"
				accentColor={categoryDetails.color}
				items={[
					{
						label: "Budget Amount",
						value: `$${budget.amount.toFixed(2)}`,
					},
					{
						label: "Period",
						value: `${monthNames[budget.month - 1].slice(0, 3)} ${budget.year}`,
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
						label: "Category",
						value: budget.category,
						icon: CategoryIcon && (
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center"
								style={{ backgroundColor: categoryDetails.color }}
							>
								<CategoryIcon className="w-4 h-4 text-white" />
							</div>
						),
					},
					{
						label: "Amount",
						value: `$${budget.amount.toFixed(2)}`,
					},
					{
						label: "Period",
						value: `${monthNames[budget.month - 1]} ${budget.year}`,
					},
				]}
				note={budget.note}
			/>

			<PlaceholderCard
				title="Spending Tracker"
				description="Track your actual spending against this budget"
				message="Spending tracking coming soon!"
				submessage="Link transactions to see how much you've spent"
				icon={TrendingUp}
			/>
		</DetailPageLayout>
	);
}

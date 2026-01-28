"use client";

import { useParams, useRouter } from "next/navigation";
import { Repeat, Calendar } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";
import DetailPageLayout from "@/components/ui/DetailPageLayout";
import DetailHeader from "@/components/ui/DetailHeader";
import OverviewCard from "@/components/ui/OverviewCard";
import DetailsCard from "@/components/ui/DetailsCard";
import NotFound from "@/components/ui/NotFound";

type RecurringTransaction = {
	id: string;
	mainCategory: string;
	secondaryCategory: string;
	frequency: string;
	startDate: string;
	nextRun: string;
	endDate: string;
	amount: number;
	note?: string;
	color?: string;
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

const sampleRecurring: Record<string, RecurringTransaction> = {
	"1": {
		id: "1",
		mainCategory: "Income",
		secondaryCategory: "Paycheck",
		frequency: "Weekly",
		startDate: "2025-01-05",
		nextRun: "2025-01-12",
		endDate: "2026-01-04",
		amount: 200,
		note: "Biweekly salary deposit",
		color: "#10B981",
	},
	"2": {
		id: "2",
		mainCategory: "Expense",
		secondaryCategory: "Rent",
		frequency: "Monthly",
		startDate: "2025-01-01",
		nextRun: "2025-02-01",
		endDate: "2025-12-31",
		amount: 1200,
		note: "Monthly rent payment",
		color: "#3B82F6",
	},
	"3": {
		id: "3",
		mainCategory: "Expense",
		secondaryCategory: "Groceries",
		frequency: "Weekly",
		startDate: "2025-06-01",
		nextRun: "2025-06-08",
		endDate: "2026-05-31",
		amount: 75,
		color: "#EF4444",
	},
};

export default function RecurringDetailPage() {
	const { id } = useParams();
	const router = useRouter();

	const recurring = sampleRecurring[id as string];

	if (!recurring) {
		return (
			<NotFound
				title="Recurring Transaction Not Found"
				message="The recurring transaction you're looking for doesn't exist."
				backLink="/transactions"
				backLabel="Back to Transactions"
			/>
		);
	}

	const categoryDetails = getCategoryDetails(recurring.secondaryCategory);
	const CategoryIcon = CATEGORY_ICONS.find(
		(cat) => cat.id === categoryDetails.icon,
	)?.Icon;

	const handleEdit = () => {
		router.push(`/recurring/${id}/edit`);
	};

	const handleDelete = () => {
		if (
			confirm("Are you sure you want to delete this recurring transaction?")
		) {
			console.log("Delete recurring transaction", id);
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

	const calculateTotalOccurrences = () => {
		const start = new Date(recurring.startDate);
		const end = new Date(recurring.endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		switch (recurring.frequency.toLowerCase()) {
			case "daily":
				return diffDays;
			case "weekly":
				return Math.floor(diffDays / 7);
			case "monthly":
				return Math.floor(diffDays / 30);
			case "yearly":
				return Math.floor(diffDays / 365);
			default:
				return 0;
		}
	};

	const totalOccurrences = calculateTotalOccurrences();
	const totalAmount = totalOccurrences * recurring.amount;

	return (
		<DetailPageLayout backLink="/transactions" backLabel="Back to Transactions">
			<DetailHeader
				title={recurring.secondaryCategory}
				subtitle={recurring.mainCategory}
				icon={CategoryIcon}
				iconColor={recurring.color}
				badge={<Repeat className="text-blue-600" size={20} />}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<OverviewCard
				title="Recurring Overview"
				accentColor={recurring.color}
				columns={3}
				items={[
					{
						label: `Amount per ${recurring.frequency.toLowerCase()}`,
						value: `$${recurring.amount.toFixed(2)}`,
					},
					{
						label: "Frequency",
						value: recurring.frequency,
						bgColor: "#EFF6FF",
						borderColor: "#93C5FD",
						color: "#1E40AF",
					},
					{
						label: "Next Run",
						value: formatDate(recurring.nextRun),
						bgColor: "#F0FDF4",
						borderColor: "#86EFAC",
						color: "#166534",
					},
				]}
			/>

			<DetailsCard
				title="Details"
				rows={[
					{
						label: "Type",
						value: recurring.mainCategory,
						icon: CategoryIcon && (
							<div
								className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm"
								style={{ backgroundColor: recurring.color }}
							>
								<CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
							</div>
						),
					},
					{
						label: "Category",
						value: recurring.secondaryCategory,
					},
					{
						label: "Start Date",
						value: formatDate(recurring.startDate),
					},
					{
						label: "End Date",
						value: formatDate(recurring.endDate),
					},
				]}
				note={recurring.note}
			/>

			<div className="bg-linear-to-br from-purple-100 to-purple-50 rounded-lg shadow-md border-2 border-purple-300 p-4 sm:p-6">
				<div className="flex items-center gap-2 mb-4">
					<Calendar className="text-purple-600" size={20} />
					<h2 className="text-lg sm:text-xl font-bold text-blue-900">
						Transaction Projection
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white/70 p-4 rounded-lg border border-purple-200">
						<div className="text-sm font-medium text-gray-600 mb-1">
							Total Occurrences
						</div>
						<div className="text-2xl font-bold text-purple-900">
							{totalOccurrences}
						</div>
						<div className="text-xs text-gray-500 mt-1">
							From start to end date
						</div>
					</div>

					<div className="bg-white/70 p-4 rounded-lg border border-purple-200">
						<div className="text-sm font-medium text-gray-600 mb-1">
							Projected Total
						</div>
						<div className="text-2xl font-bold text-purple-900">
							${totalAmount.toFixed(2)}
						</div>
						<div className="text-xs text-gray-500 mt-1">
							{totalOccurrences} × ${recurring.amount.toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</DetailPageLayout>
	);
}

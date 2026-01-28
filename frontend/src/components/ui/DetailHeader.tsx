import { Edit, Trash2, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DetailHeaderProps {
	title: string;
	subtitle?: string;
	icon?: LucideIcon;
	iconColor?: string;
	badge?: ReactNode;
	onEdit: () => void;
	onDelete: () => void;
}

export default function DetailHeader({
	title,
	subtitle,
	icon: Icon,
	iconColor,
	badge,
	onEdit,
	onDelete,
}: DetailHeaderProps) {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						{/* Icon with color background */}
						{Icon && iconColor && (
							<div
								className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm"
								style={{ backgroundColor: iconColor }}
							>
								<Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
							</div>
						)}
						<h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
							{title}
						</h1>
						{badge}
					</div>
					{subtitle && (
						<p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
					)}
				</div>
				<div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
					<button
						onClick={onEdit}
						className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
					>
						<Edit size={16} />
						Edit
					</button>
					<button
						onClick={onDelete}
						className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
					>
						<Trash2 size={16} />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

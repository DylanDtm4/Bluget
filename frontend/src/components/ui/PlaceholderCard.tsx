import { LucideIcon } from "lucide-react";

interface PlaceholderCardProps {
	title: string;
	description: string;
	message: string;
	submessage: string;
	icon: LucideIcon;
	iconColor?: string;
	bgColor?: string;
	borderColor?: string;
}

export default function PlaceholderCard({
	title,
	description,
	message,
	submessage,
	icon: Icon,
	iconColor = "#3B82F6",
	bgColor = "from-blue-100 to-blue-50",
	borderColor = "#93C5FD",
}: PlaceholderCardProps) {
	return (
		<div
			className={`bg-linear-to-br ${bgColor} rounded-lg shadow-md border-2 p-4 sm:p-6`}
			style={{ borderColor }}
		>
			<div className="flex items-center gap-2 mb-2">
				<Icon
					className="text-blue-600"
					size={20}
					style={{ color: iconColor }}
				/>
				<h2 className="text-lg sm:text-xl font-bold text-blue-900">{title}</h2>
			</div>
			<p className="text-xs sm:text-sm text-gray-600 mb-4">{description}</p>

			<div className="text-center py-6 sm:py-8">
				<div className="mb-3" style={{ color: `${iconColor}50` }}>
					<svg
						className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<p className="text-gray-700 font-medium text-sm sm:text-base">
					{message}
				</p>
				<p className="text-xs sm:text-sm text-gray-600 mt-1">{submessage}</p>
			</div>
		</div>
	);
}

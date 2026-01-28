import Link from "next/link";

type EmptyStateVariant = "no-data" | "no-results";

interface EmptyStateProps {
	variant: EmptyStateVariant;
	icon: "document" | "recurring";
	message: string;
	action: {
		label: string;
		onClick?: () => void;
		href?: string;
	};
}

export default function EmptyState({
	variant,
	icon,
	message,
	action,
}: EmptyStateProps) {
	const iconPaths = {
		document:
			"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
		recurring:
			"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
	};

	const buttonStyles =
		variant === "no-results"
			? "bg-gray-100 hover:bg-gray-200 text-gray-700"
			: "bg-blue-600 hover:bg-blue-700 text-white shadow-md";

	return (
		<div className="text-center py-12 sm:py-16">
			<div className="text-blue-200 mb-4">
				<svg
					className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={iconPaths[icon]}
					/>
				</svg>
			</div>
			<p className="text-gray-600 mb-4 text-sm sm:text-base font-medium">
				{message}
			</p>
			{action.href ? (
				<Link href={action.href}>
					<button
						className={`${buttonStyles} font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base`}
					>
						{action.label}
					</button>
				</Link>
			) : (
				<button
					onClick={action.onClick}
					className={`${buttonStyles} font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base`}
				>
					{action.label}
				</button>
			)}
		</div>
	);
}

import Link from "next/link";

interface SectionHeaderProps {
	title: string;
	description?: string;
	badge?: {
		label: string;
		count: number;
	};
	action?: {
		label: string;
		href: string;
	};
}

export default function SectionHeader({
	title,
	description,
	badge,
	action,
}: SectionHeaderProps) {
	return (
		<div className="flex items-center justify-between gap-2">
			<div>
				<h2 className="text-md sm:text-xl font-bold text-blue-900 whitespace-nowrap">
					{title}
				</h2>
				{description && (
					<p className="hidden sm:block text-xs sm:text-sm text-gray-500">
						{description}
					</p>
				)}
			</div>

			<div className="flex items-center gap-3">
				{badge && (
					<span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
						{badge.count} {badge.label}
					</span>
				)}

				{action && (
					<Link
						href={action.href}
						className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
					>
						{action.label} →
					</Link>
				)}
			</div>
		</div>
	);
}

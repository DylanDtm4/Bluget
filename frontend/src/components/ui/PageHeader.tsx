import Link from "next/link";

interface PageHeaderProps {
	title: string;
	description?: string;
	actionButton?: {
		label: string;
		href: string;
	};
}

export default function PageHeader({
	title,
	description,
	actionButton,
}: PageHeaderProps) {
	return (
		<div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
			<div className="sm:ml-4">
				<h1 className="text-2xl md:text-3xl font-bold text-blue-900 whitespace-nowrap">
					{title}
				</h1>
				{description && (
					<p className="hidden sm:block text-sm sm:text-base text-gray-600">
						{description}
					</p>
				)}
			</div>
			{actionButton && (
				<Link href={actionButton.href} className="sm:mr-4">
					<button className="bg-[#354abd] hover:bg-[#1f1885] text-white font-semibold px-3 sm:px-6 py-2 rounded-lg transition-colors shadow-md text-xs sm:text-base whitespace-nowrap">
						{actionButton.label}
					</button>
				</Link>
			)}
		</div>
	);
}

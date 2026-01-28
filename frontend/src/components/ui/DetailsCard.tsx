import { ReactNode } from "react";

interface DetailRow {
	label: string;
	value: string | number | ReactNode;
	icon?: ReactNode;
}

interface DetailsCardProps {
	title: string;
	rows: DetailRow[];
	note?: string;
}

export default function DetailsCard({ title, rows, note }: DetailsCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
			<h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">
				{title}
			</h2>

			<div className="space-y-3 sm:space-y-4">
				{rows.map((row, index) => (
					<div
						key={index}
						className="flex justify-between items-center py-3 border-b border-gray-100"
					>
						<span className="text-gray-600 font-medium text-sm sm:text-base">
							{row.label}
						</span>
						<div className="flex items-center gap-2">
							{row.icon}
							<span className="text-gray-900 font-semibold text-sm sm:text-base">
								{row.value}
							</span>
						</div>
					</div>
				))}

				{/* Note */}
				{note && (
					<div className="py-3">
						<div className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
							Note
						</div>
						<div className="text-gray-900 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-sm sm:text-base">
							{note}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

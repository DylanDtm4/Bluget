import Link from "next/link";

interface NotFoundProps {
	title: string;
	message: string;
	backLink: string;
	backLabel: string;
}

export default function NotFound({
	title,
	message,
	backLink,
	backLabel,
}: NotFoundProps) {
	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center">
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
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
						{title}
					</h2>
					<p className="text-gray-600 mb-6 text-sm sm:text-base">{message}</p>
					<Link href={backLink}>
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md mb-4">
							{backLabel}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

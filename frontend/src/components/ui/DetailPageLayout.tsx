import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface DetailPageLayoutProps {
	children: ReactNode;
	backLink: string;
	backLabel: string;
}

export default function DetailPageLayout({
	children,
	backLink,
	backLabel,
}: DetailPageLayoutProps) {
	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
				{/* Back Button */}
				<Link href={backLink}>
					<button className="flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium text-sm sm:text-base mb-4">
						<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
						{backLabel}
					</button>
				</Link>

				{children}
			</div>
		</div>
	);
}

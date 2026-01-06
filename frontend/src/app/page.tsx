import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
			{/* Hero Section */}
			<div className="flex flex-col items-center justify-center min-h-screen px-4">
				<div className="text-center space-y-8 max-w-4xl">
					{/* Logo/Brand */}
					<div className="space-y-4">
						<h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
							Bluget
						</h1>
						<div className="h-1 w-24 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
					</div>

					{/* Tagline */}
					<p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
						Take control of your finances with smart budgeting, automated
						tracking, and insightful analytics.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
						<Link href="/signup">
							<Button variant="primary" size="large">
								Get Started Free
							</Button>
						</Link>
						<Link href="/login">
							<Button variant="secondary" size="large">
								Login
							</Button>
						</Link>
					</div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-3 gap-8 pt-16 text-left">
						<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
								<span className="text-2xl">💰</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Track Expenses
							</h3>
							<p className="text-gray-600 text-sm">
								Monitor your spending with easy categorization and detailed
								transaction history.
							</p>
						</div>

						<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
								<span className="text-2xl">🔄</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Recurring Transactions
							</h3>
							<p className="text-gray-600 text-sm">
								Automate your regular income and expenses with smart recurring
								transactions.
							</p>
						</div>

						<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
								<span className="text-2xl">📊</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Visual Insights
							</h3>
							<p className="text-gray-600 text-sm">
								Understand your financial patterns with intuitive charts and
								reports.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500">
				<p>Simple. Powerful. Budgeting made easy.</p>
			</footer>
		</main>
	);
}

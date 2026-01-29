"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-white">
			{/* Hero Section */}
			<div
				id="hero"
				className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
			>
				{/* Decorative background elements */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<div className="space-y-8">
							<div className="inline-block">
								<span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
									🎉 Smart budgeting made simple
								</span>
							</div>

							<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
								Your money,
								<br />
								<span className="text-blue-600">simplified</span>
							</h1>

							<p className="text-xl text-gray-600 leading-relaxed max-w-xl">
								Take control of your finances with automatic tracking, smart
								budgets, and insights that help you save more.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<Link href="/signup">
									<Button variant="primary" size="large">
										Get Started Free
									</Button>
								</Link>
								<Link href="/login">
									<Button variant="secondary" size="large">
										Sign In
									</Button>
								</Link>
							</div>

							<div className="flex items-center gap-8 pt-4 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>No credit card required</span>
								</div>
								<div className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-green-500"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Free forever</span>
								</div>
							</div>
						</div>

						{/* Right Image/Visual - Budget Progress Bars */}
						<div className="relative lg:h-[600px] hidden lg:block">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl transform rotate-3 opacity-10"></div>
							<div className="absolute inset-0 flex items-center justify-center p-4">
								<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform -rotate-2 hover:rotate-0 transition-transform duration-300">
									<h3 className="text-2xl font-bold text-gray-900 mb-6">
										January Budget
									</h3>

									<div className="space-y-5">
										{/* Housing */}
										<div>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<span className="text-xl">🏠</span>
													<span className="text-sm font-semibold text-gray-900">
														Housing
													</span>
												</div>
												<span className="text-sm font-bold text-gray-900">
													$1,200 / $1,200
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-3">
												<div
													className="bg-blue-600 h-3 rounded-full"
													style={{ width: "100%" }}
												></div>
											</div>
											<p className="text-xs text-gray-500 mt-1">100% used</p>
										</div>

										{/* Food */}
										<div>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<span className="text-xl">🍕</span>
													<span className="text-sm font-semibold text-gray-900">
														Food
													</span>
												</div>
												<span className="text-sm font-bold text-gray-900">
													$450 / $600
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-3">
												<div
													className="bg-green-500 h-3 rounded-full"
													style={{ width: "75%" }}
												></div>
											</div>
											<p className="text-xs text-gray-500 mt-1">75% used</p>
										</div>

										{/* Transport */}
										<div>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<span className="text-xl">🚗</span>
													<span className="text-sm font-semibold text-gray-900">
														Transport
													</span>
												</div>
												<span className="text-sm font-bold text-gray-900">
													$300 / $400
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-3">
												<div
													className="bg-yellow-500 h-3 rounded-full"
													style={{ width: "75%" }}
												></div>
											</div>
											<p className="text-xs text-gray-500 mt-1">75% used</p>
										</div>

										{/* Entertainment */}
										<div>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<span className="text-xl">🎬</span>
													<span className="text-sm font-semibold text-gray-900">
														Fun
													</span>
												</div>
												<span className="text-sm font-bold text-gray-900">
													$200 / $300
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-3">
												<div
													className="bg-purple-500 h-3 rounded-full"
													style={{ width: "67%" }}
												></div>
											</div>
											<p className="text-xs text-gray-500 mt-1">67% used</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Everything you need to
						<br />
						master your money
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Simple tools that make a big difference in your financial life
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="group">
						<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-full border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<span className="text-3xl">💰</span>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Track Expenses
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Simple, powerful budgeting made easy. Monitor your spending with
								easy categorization and detailed transaction history.
							</p>
						</div>
					</div>

					<div className="group">
						<div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 h-full border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-14 h-14 bg-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<span className="text-3xl">🔄</span>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Recurring Bills
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Never miss a payment. Automate your regular income and expenses
								with smart recurring transactions.
							</p>
						</div>
					</div>

					<div className="group">
						<div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 h-full border border-cyan-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<span className="text-3xl">📊</span>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Visual Insights
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Understand your financial patterns with intuitive charts and
								reports that make sense at a glance.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Section */}
			<div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-3 gap-12 text-center">
						<div>
							<p className="text-5xl font-bold mb-2">10K+</p>
							<p className="text-blue-200 text-lg">Active Users</p>
						</div>
						<div>
							<p className="text-5xl font-bold mb-2">$2M+</p>
							<p className="text-blue-200 text-lg">Money Tracked</p>
						</div>
						<div>
							<p className="text-5xl font-bold mb-2">95%</p>
							<p className="text-blue-200 text-lg">Satisfaction Rate</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
				<div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-xl">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Start managing your
						<br />
						money better today
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join thousands of people who&apos;ve already taken control of their
						finances with Bluget
					</p>
					<Link href="/signup">
						<Button variant="white" size="large">
							Get Started Free
						</Button>
					</Link>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-gray-50 border-t border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div>
							<h4 className="font-bold text-gray-900 mb-4">Bluget</h4>
							<p className="text-sm text-gray-600">
								Simple. Powerful. Budgeting made easy.
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 mb-4">Product</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									<Link href="/features" className="hover:text-blue-600">
										Features
									</Link>
								</li>
								<li>
									<Link href="/pricing" className="hover:text-blue-600">
										Pricing
									</Link>
								</li>
								<li>
									<Link href="/security" className="hover:text-blue-600">
										Security
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 mb-4">Company</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									<Link href="/about" className="hover:text-blue-600">
										About
									</Link>
								</li>
								<li>
									<Link href="/blog" className="hover:text-blue-600">
										Blog
									</Link>
								</li>
								<li>
									<Link href="/contact" className="hover:text-blue-600">
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									<Link href="/privacy" className="hover:text-blue-600">
										Privacy
									</Link>
								</li>
								<li>
									<Link href="/terms" className="hover:text-blue-600">
										Terms
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
						<p>© 2025 Bluget. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</main>
	);
}

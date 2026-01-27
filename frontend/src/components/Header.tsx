"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();

	const createOptions = [
		{ label: "Transaction", href: "/transactions/new", icon: "💰" },
		{ label: "Budget", href: "/budgets/new", icon: "📊" },
		{ label: "Category", href: "/categories/new", icon: "🏷️" },
	];

	const handleOptionClick = (href: string) => {
		setIsModalOpen(false);
		router.push(href);
	};

	return (
		<>
			<header className="bg-[#24292f] text-white border-b border-[#30363d]">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						{/* Left side - Logo & Navigation */}
						<div className="flex items-center gap-4">
							{/* Logo/Brand */}
							<Link href="/" className="font-bold text-xl mr-2">
								Bluget
							</Link>

							{/* Desktop Navigation */}
							<nav className="hidden md:flex items-center gap-4">
								<Link
									href="/dashboard"
									className="text-sm font-semibold hover:text-gray-300 transition-colors"
								>
									Dashboard
								</Link>
								<Link
									href="/budgets"
									className="text-sm font-semibold hover:text-gray-300 transition-colors"
								>
									Budgets
								</Link>
								<Link
									href="/categories"
									className="text-sm font-semibold hover:text-gray-300 transition-colors"
								>
									Categories
								</Link>
								<Link
									href="/transactions"
									className="text-sm font-semibold hover:text-gray-300 transition-colors"
								>
									Transactions
								</Link>
							</nav>
						</div>

						{/* Right side - Actions */}
						<div className="flex items-center gap-3">
							{/* Create Button */}
							<button
								onClick={() => setIsModalOpen(true)}
								className="hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-[#354abd] hover:bg-[#1f1885] rounded-md transition-colors"
							>
								<span className="text-lg leading-none">+</span>
								Create
							</button>

							{/* Settings */}
							<Link
								href="/settings"
								className="hidden md:block p-2 hover:bg-[#30363d] rounded-md transition-colors"
								title="Settings"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</Link>

							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="md:hidden p-2 hover:bg-[#30363d] rounded-md transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									{isMobileMenuOpen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									)}
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile Menu */}
					{isMobileMenuOpen && (
						<div className="md:hidden py-4 border-t border-[#30363d]">
							<nav className="flex flex-col gap-1">
								<Link
									href="/dashboard"
									className="px-3 py-2 text-sm font-semibold hover:bg-[#30363d] rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Dashboard
								</Link>
								<Link
									href="/budgets"
									className="px-3 py-2 text-sm font-semibold hover:bg-[#30363d] rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Budgets
								</Link>
								<Link
									href="/categories"
									className="px-3 py-2 text-sm font-semibold hover:bg-[#30363d] rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Categories
								</Link>
								<Link
									href="/transactions"
									className="px-3 py-2 text-sm font-semibold hover:bg-[#30363d] rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Transactions
								</Link>
								<button
									onClick={() => {
										setIsMobileMenuOpen(false);
										setIsModalOpen(true);
									}}
									className="px-3 py-2 text-sm font-semibold hover:bg-[#30363d] rounded-md transition-colors text-left"
								>
									Create
								</button>
								<Link
									href="/settings"
									className="px-3 py-2 text-sm font-semibold hover:bg-[#30363d] rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Settings
								</Link>
							</nav>
						</div>
					)}
				</div>
			</header>

			{/* Create Modal */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					onClick={() => setIsModalOpen(false)}
				>
					<div
						className="bg-white rounded-lg p-6 max-w-md w-11/12 shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className="mt-0 mb-6 text-xl font-semibold text-gray-900">
							Create New
						</h2>

						<div className="flex flex-col gap-2">
							{createOptions.map((option) => (
								<button
									key={option.href}
									onClick={() => handleOptionClick(option.href)}
									className="p-3 border border-gray-200 rounded-md bg-white cursor-pointer text-left text-sm flex items-center gap-3 transition-all hover:bg-gray-50 hover:border-gray-400"
								>
									<span className="text-xl">{option.icon}</span>
									<span className="text-gray-900">{option.label}</span>
								</button>
							))}
						</div>

						<button
							onClick={() => setIsModalOpen(false)}
							className="mt-6 p-2 px-4 border border-gray-300 rounded-md bg-white cursor-pointer w-full text-sm hover:bg-gray-50 text-gray-700"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
}

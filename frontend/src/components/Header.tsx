"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const createOptions = [
    { label: "Transaction", href: "/transactions/new", icon: "💰" },
    { label: "Recurring Transaction", href: "/recurring/new", icon: "🔄" },
    { label: "Budget", href: "/budgets/new", icon: "📊" },
    { label: "Category", href: "/categories/new", icon: "🏷️" },
  ];

  const handleOptionClick = (href: string) => {
    setIsModalOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className="p-4 bg-[#89ae3eff]">
        <nav className="flex items-center gap-2 flex-wrap">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <span>|</span>
          <Link href="/budgets" className="hover:underline">
            Budgets
          </Link>
          <span>|</span>
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
          <span>|</span>
          <Link href="/transactions" className="hover:underline">
            Transactions
          </Link>
          <span>|</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:underline cursor-pointer"
          >
            Create
          </button>
          <span>|</span>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <span>|</span>
          <Link href="/settings" className="hover:underline">
            Settings
          </Link>
        </nav>
      </header>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="text-gray-600 fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-lg p-8 max-w-md w-11/12 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mt-0 mb-6 text-xl font-semibold">Create New</h2>

            <div className="flex flex-col gap-3">
              {createOptions.map((option) => (
                <button
                  key={option.href}
                  onClick={() => handleOptionClick(option.href)}
                  className="p-4 border border-gray-300 rounded-md bg-white cursor-pointer text-left text-base flex items-center gap-3 transition-all hover:bg-gray-50 hover:border-[#89ae3eff]"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 p-2 px-4 border border-gray-300 rounded-md bg-white cursor-pointer w-full hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

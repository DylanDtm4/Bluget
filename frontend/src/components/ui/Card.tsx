"use client";

import { useState } from "react";
import Link from "next/link";

type BudgetData = {
  amount: number;
  month: number;
  year: number;
  note?: string;
};

type CategoryData = {
  color: string;
};

type RecurringData = {
  amount: number;
  frequency: string;
  nextRun: string;
  secondaryCategory: string;
  mainCategory: string;
  note?: string;
  startDate: Date;
  endDate?: Date;
};

type TransactionData = {
  amount: number;
  date: string;
  secondaryCategory: string;
  mainCategory: string;
  note?: string;
};

interface CardProps {
  id: string;
  title: string;
  data: BudgetData | CategoryData | RecurringData | TransactionData;
  type: "budget" | "category" | "recurring" | "transaction";
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Card({
  id,
  title,
  data,
  type,
  onEdit,
  onDelete,
}: CardProps) {
  const [expanded, setExpanded] = useState(false);

  const getCardContent = () => {
    switch (type) {
      case "budget": {
        const budgetData = data as BudgetData;
        return {
          subtitle: `${budgetData.year}-${budgetData.month
            .toString()
            .padStart(2, "0")}`,
          amount: budgetData.amount,
          color: "red",
          extraInfo: budgetData.note,
        };
      }
      case "category": {
        const categoryData = data as CategoryData;
        return {
          subtitle: null,
          amount: null,
          color: categoryData.color,
          extraInfo: null,
        };
      }
      case "recurring": {
        const recurringData = data as RecurringData;
        return {
          subtitle: `${recurringData.frequency} - Next: ${recurringData.nextRun}`,
          secondaryTitle: recurringData.secondaryCategory,
          amount: recurringData.amount,
          color:
            recurringData.mainCategory.toLowerCase() === "income"
              ? "green"
              : "red",
          extraInfo: (
            <>
              {recurringData.startDate && (
                <p className="text-sm mb-3">
                  <strong>Start Date:</strong>{" "}
                  {new Date(recurringData.startDate).toLocaleDateString()}
                </p>
              )}
              {recurringData.endDate && (
                <p className="text-sm mb-3">
                  <strong>End Date:</strong>{" "}
                  {new Date(recurringData.endDate).toLocaleDateString()}
                </p>
              )}
              {recurringData.note && (
                <p className="text-sm mb-3">
                  <strong>Note:</strong> {recurringData.note}
                </p>
              )}
            </>
          ),
        };
      }
      case "transaction": {
        const transactionData = data as TransactionData;
        return {
          subtitle: transactionData.date,
          secondaryTitle: transactionData.secondaryCategory,
          amount: transactionData.amount,
          color:
            transactionData.mainCategory.toLowerCase() === "income"
              ? "green"
              : "red",
          extraInfo: transactionData.note,
        };
      }
    }
  };

  const content = getCardContent();
  const pathMap: Record<typeof type, string> = {
    budget: "budgets",
    transaction: "transactions",
    category: "categories",
    recurring: "recurring",
  };
  const detailsPath = `/${pathMap[type]}/${id}`;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="border border-gray-300 rounded-lg p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      style={{
        borderLeftWidth: "6px",
        borderLeftColor: content.color ?? "#ccc",
      }}
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div>
          <p>
            <span className="font-bold text-gray-800">
              {title}
              {type !== "category" && type !== "budget" && ":"}
            </span>{" "}
            {content.secondaryTitle && (
              <span className="text-gray-600">{content.secondaryTitle}</span>
            )}
          </p>
          <p className="text-sm text-gray-400">{content.subtitle}</p>
        </div>

        {content.amount !== null && (
          <div
            className="font-bold"
            style={{ color: content.color || "black" }}
          >
            ${content.amount.toFixed(2)}
          </div>
        )}
      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-3">
          {typeof content.extraInfo === "string" && content.extraInfo && (
            <p className="text-sm mb-3">
              <strong>Note:</strong> {content.extraInfo}
            </p>
          )}
          {typeof content.extraInfo !== "string" && content.extraInfo}

          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
            >
              Delete
            </button>

            <Link
              href={detailsPath}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 text-blue-600 underline hover:text-blue-800"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

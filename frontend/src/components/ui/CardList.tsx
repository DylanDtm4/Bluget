import Card from "@/components/ui/Card";
import { useState } from "react";

type CardData = {
	// Transaction data
	amount?: number;
	date?: Date;
	mainCategory?: string;
	secondaryCategory?: string;
	// Recurring data
	frequency?: string;
	nextRun?: Date;
	startDate?: Date;
	endDate?: Date;
	// Budget data
	month?: number;
	year?: number;
	note?: string;
	// Common data
	color: string;
	icon: string;
};

interface CardListProps<T> {
	items: T[];
	getCardProps: (item: T) => {
		id: string;
		title: string;
		data: CardData;
		type: "transaction" | "recurring" | "budget" | "category";
	};
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

export default function CardList<T>({
	items,
	getCardProps,
	onEdit,
	onDelete,
}: CardListProps<T>) {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const handleToggle = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
	};

	return (
		<div className="space-y-3">
			{items.map((item) => {
				const cardProps = getCardProps(item);
				return (
					<Card
						key={cardProps.id}
						{...cardProps}
						expanded={expandedId === cardProps.id}
						onToggle={() => handleToggle(cardProps.id)}
						onEdit={() => onEdit(cardProps.id)}
						onDelete={() => onDelete(cardProps.id)}
					/>
				);
			})}
		</div>
	);
}

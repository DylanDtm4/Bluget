"use client";

import { CATEGORY_ICONS } from "@/lib/categoryIcons";

type IconPickerProps = {
	value: string;
	onChange: (iconId: string) => void;
	color?: string;
};

export default function IconPicker({
	value,
	onChange,
	color,
}: IconPickerProps) {
	return (
		<div className="grid grid-cols-5 gap-3">
			{CATEGORY_ICONS.map(({ id, Icon, label }) => {
				const selected = value === id;

				return (
					<button
						key={id}
						type="button"
						aria-label={label}
						onClick={() => onChange(id)}
						className={`
              flex items-center justify-center rounded-lg border p-3 transition
              hover:scale-105
              ${selected ? "border-black ring-2 ring-black/30" : "border-gray-300"}
            `}
					>
						<Icon
							size={24}
							strokeWidth={2}
							color={color ?? "#000"}
							className={selected ? "opacity-100" : "opacity-70"}
						/>
					</button>
				);
			})}
		</div>
	);
}

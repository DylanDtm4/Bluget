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
	color = "#FF5733",
}: IconPickerProps) {
	return (
		<div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 ">
			{CATEGORY_ICONS.map((iconOption) => {
				const IconComponent = iconOption.Icon;
				const isSelected = value === iconOption.id;

				return (
					<button
						key={iconOption.id}
						type="button"
						onClick={() => onChange(isSelected ? "" : iconOption.id)}
						className={`
                            w-full aspect-square
                            flex items-center justify-center
                            rounded-lg border-2 transition-all
                            hover:scale-105 active:scale-95
                            ${
															isSelected
																? "border-gray-800 bg-gray-50 shadow-md"
																: "border-gray-300 hover:border-gray-400"
														}
                        `}
						title={iconOption.label}
					>
						<IconComponent
							className="
    w-5 h-5
    sm:w-6 sm:h-6
    lg:w-7 lg:h-7
    xl:w-8 xl:h-8
    2xl:w-10 2xl:h-10
  "
							style={{ color: isSelected ? color : "#6B7280" }}
						/>
					</button>
				);
			})}
		</div>
	);
}

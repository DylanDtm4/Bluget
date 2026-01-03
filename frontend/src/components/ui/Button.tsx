import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "danger";
	size?: "small" | "medium" | "large";
}

export default function Button({
	children,
	variant = "primary",
	size = "medium",
	className = "",
	...props
}: ButtonProps) {
	return (
		<button
			className={`
				rounded-md cursor-pointer font-medium transition-all inline-block text-center border
				${size === "small" && "px-3 py-1.5 text-sm"}
				${size === "medium" && "px-4 py-2 text-base"}
				${size === "large" && "px-5 py-2.5 text-lg"}
				${
					variant === "primary" &&
					"bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 hover:border-blue-700"
				}
				${
					variant === "secondary" &&
					"bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50"
				}
				${
					variant === "danger" &&
					"bg-transparent text-red-600 border-red-600 hover:bg-red-50"
				}
				${className}
			`}
			{...props}
		>
			{children}
		</button>
	);
}

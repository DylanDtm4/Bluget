import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "danger";
	size?: "small" | "medium" | "large";
	href?: string;
}

export default function Button({
	children,
	variant = "primary",
	size = "medium",
	style,
	...props
}: ButtonProps) {
	const getVariantStyles = () => {
		switch (variant) {
			case "primary":
				return {
					backgroundColor: "transparent",
					color: "#007bff",
					border: "1px solid #007bff",
				};
			case "secondary":
				return {
					backgroundColor: "transparent",
					color: "#555",
					border: "1px solid #ccc",
				};
			case "danger":
				return {
					backgroundColor: "transparent",
					color: "#dc3545",
					border: "1px solid #dc3545",
				};
		}
	};

	const getSizeStyles = () => {
		switch (size) {
			case "small":
				return {
					padding: "0.375rem 0.75rem",
					fontSize: "0.875rem",
				};
			case "medium":
				return {
					padding: "0.5rem 1rem",
					fontSize: "0.9rem",
				};
			case "large":
				return {
					padding: "0.625rem 1.25rem",
					fontSize: "1rem",
				};
		}
	};

	const baseStyles = {
		borderRadius: "6px",
		cursor: "pointer",
		fontWeight: 500,
		transition: "all 0.2s ease",
		display: "inline-block",
		textDecoration: "none",
		textAlign: "center" as const,
		...getSizeStyles(),
		...getVariantStyles(),
	};

	return (
		<button
			style={{ ...baseStyles, ...style }}
			onMouseEnter={(e) => {
				const target = e.currentTarget;
				if (variant === "primary") {
					target.style.backgroundColor = "#f0f8ff";
					target.style.borderColor = "#0056b3";
					target.style.color = "#0056b3";
				} else if (variant === "secondary") {
					target.style.backgroundColor = "#f8f9fa";
				} else if (variant === "danger") {
					target.style.backgroundColor = "#fff5f5";
				}
			}}
			onMouseLeave={(e) => {
				const target = e.currentTarget;
				if (variant === "primary") {
					target.style.backgroundColor = "transparent";
					target.style.borderColor = "#007bff";
					target.style.color = "#007bff";
				} else if (variant === "secondary") {
					target.style.backgroundColor = "transparent";
				} else if (variant === "danger") {
					target.style.backgroundColor = "transparent";
				}
			}}
			{...props}
		>
			{children}
		</button>
	);
}

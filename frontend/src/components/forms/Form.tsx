"use client";

import { useState } from "react";
import Button from "../ui/Button";

type FieldType = "text" | "number" | "date" | "select" | "textarea" | "color";
type SelectOption = { label: string; value: string };

type FormField = {
	name: string;
	label: string;
	type: FieldType;
	required?: boolean;
	options?: SelectOption[]; // For select fields
	placeholder?: string;
};

type FormData = Record<string, string | number>;

type FormProps = {
	title: string;
	fields: FormField[];
	onSubmit: (data: FormData) => void;
	onCancel?: () => void;
	initialData?: FormData;
};

export default function Form({
	title,
	fields,
	onSubmit,
	onCancel,
	initialData = {},
}: FormProps) {
	const [formData, setFormData] = useState<FormData>(initialData);

	const handleChange = (name: string, value: string | number) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	// Shared input classes
	const inputClasses =
		"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

	const renderField = (field: FormField) => {
		switch (field.type) {
			case "select":
				return (
					<select
						value={formData[field.name] || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						required={field.required}
						className={inputClasses}
					>
						<option value="">Select...</option>
						{field.options?.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				);

			case "textarea":
				return (
					<textarea
						value={formData[field.name] || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						placeholder={field.placeholder}
						required={field.required}
						className={`${inputClasses} min-h-[100px] resize-y`}
					/>
				);

			case "number":
				return (
					<input
						type="number"
						value={formData[field.name] || ""}
						onChange={(e) =>
							handleChange(field.name, parseFloat(e.target.value) || 0)
						}
						placeholder={field.placeholder}
						required={field.required}
						step="0.01"
						className={inputClasses}
					/>
				);

			case "date":
				return (
					<input
						type="date"
						value={formData[field.name] || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						required={field.required}
						className={inputClasses}
					/>
				);

			case "color":
				return (
					<div className="flex items-center gap-2">
						<input
							type="color"
							value={formData[field.name] || "#FF5733"}
							onChange={(e) => handleChange(field.name, e.target.value)}
							required={field.required}
							className="w-16 h-10 cursor-pointer rounded border border-gray-300"
						/>
						<input
							type="text"
							value={formData[field.name] || "#FF5733"}
							onChange={(e) => handleChange(field.name, e.target.value)}
							placeholder={field.placeholder}
							pattern="^#[0-9A-Fa-f]{6}$"
							className={`${inputClasses} flex-1`}
						/>
					</div>
				);
			default: // text
				return (
					<input
						type="text"
						value={formData[field.name] || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						placeholder={field.placeholder}
						required={field.required}
						className={inputClasses}
					/>
				);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="bg-white rounded-lg shadow-md p-8">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					{fields.map((field) => (
						<div key={field.name}>
							<label className="block mb-2 font-semibold text-gray-700">
								{field.label}
								{field.required && <span className="text-red-500 ml-1">*</span>}
							</label>
							{renderField(field)}
						</div>
					))}

					<div className="flex gap-3 pt-4">
						<Button type="submit" variant="primary" size="medium">
							Submit
						</Button>
						{onCancel && (
							<Button
								type="button"
								onClick={onCancel}
								variant="secondary"
								size="medium"
							>
								Cancel
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

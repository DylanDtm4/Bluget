"use client";

import { useState } from "react";
import Button from "../ui/Button";
import IconPicker from "../ui/IconPicker";

type FieldType =
	| "text"
	| "number"
	| "date"
	| "year"
	| "select"
	| "textarea"
	| "color"
	| "icon";
type SelectOption = { label: string; value: string };

type FormField = {
	name: string;
	label: string;
	type: FieldType;
	required?: boolean;
	options?: SelectOption[]; // For select fields
	placeholder?: string;
	showOnlyWhenRecurring?: boolean; // Show this field only when recurring is checked
	hideWhenRecurring?: boolean; // Hide this field when recurring is checked
};

type FormData = Record<string, string | number>;

type FormProps = {
	title: string;
	fields: FormField[];
	onSubmit: (data: FormData) => void;
	onCancel?: () => void;
	initialData?: FormData;
	enableRecurring?: boolean; // Enable the recurring checkbox feature
	recurringLocked?: boolean; // Lock recurring checkbox in checked state (for editing)
};

export default function Form({
	title,
	fields,
	onSubmit,
	onCancel,
	initialData = {},
	enableRecurring = false,
	recurringLocked = false,
}: FormProps) {
	const [formData, setFormData] = useState<FormData>(initialData);
	const [isRecurring, setIsRecurring] = useState(recurringLocked);

	const handleChange = (name: string, value: string | number) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	// Shared input classes
	const inputClasses =
		"text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

	const renderField = (field: FormField) => {
		switch (field.type) {
			case "year":
				return (
					<input
						type="number"
						value={formData[field.name] || ""}
						onChange={(e) =>
							handleChange(field.name, parseInt(e.target.value, 10) || 0)
						}
						placeholder={field.placeholder || "YYYY"}
						required={field.required}
						min={1900}
						max={2100}
						step={1}
						className={inputClasses}
					/>
				);

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
			case "icon":
				return (
					<IconPicker
						value={(formData[field.name] as string) || ""}
						onChange={(iconId) => handleChange(field.name, iconId)}
						color={
							typeof formData.color === "string" ? formData.color : "#FF5733"
						}
					/>
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
					{enableRecurring && (
						<div className="flex items-center gap-2 pb-2 border-b border-gray-200">
							<input
								type="checkbox"
								id="recurring-checkbox"
								checked={isRecurring}
								onChange={(e) => setIsRecurring(e.target.checked)}
								disabled={recurringLocked}
								className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<label
								htmlFor="recurring-checkbox"
								className="font-semibold text-gray-700 cursor-pointer"
							>
								Recurring {recurringLocked && "(locked for editing)"}
							</label>
						</div>
					)}

					{fields
						.filter((field) => {
							// If field should only show when recurring, hide it when not recurring
							if (field.showOnlyWhenRecurring && !isRecurring) return false;
							// If field should hide when recurring, hide it when recurring
							if (field.hideWhenRecurring && isRecurring) return false;
							return true;
						})
						.map((field) => (
							<div key={field.name}>
								<label className="block mb-2 font-semibold text-gray-700">
									{field.label}
									{field.required && (
										<span className="text-red-500 ml-1">*</span>
									)}
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

"use client";

import { useState } from "react";

type FieldType = "text" | "number" | "date" | "select" | "textarea";

type FormField = {
	name: string;
	label: string;
	type: FieldType;
	required?: boolean;
	options?: string[]; // For select fields
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

	const renderField = (field: FormField) => {
		switch (field.type) {
			case "select":
				return (
					<select
						value={formData[field.name] || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						required={field.required}
					>
						<option value="">Select...</option>
						{field.options?.map((option) => (
							<option key={option} value={option}>
								{option}
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
					/>
				);

			case "date":
				return (
					<input
						type="date"
						value={formData[field.name] || ""}
						onChange={(e) => handleChange(field.name, e.target.value)}
						required={field.required}
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
					/>
				);
		}
	};

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
			<h2>{title}</h2>
			<form onSubmit={handleSubmit}>
				{fields.map((field) => (
					<div key={field.name} style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								marginBottom: "0.25rem",
								fontWeight: "bold",
							}}
						>
							{field.label}
							{field.required && <span style={{ color: "red" }}>*</span>}
						</label>
						{renderField(field)}
					</div>
				))}

				<div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
					<button type="submit">Submit</button>
					{onCancel && (
						<button type="button" onClick={onCancel}>
							Cancel
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

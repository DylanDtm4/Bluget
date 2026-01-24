"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";

type AuthFieldType = "email" | "password" | "text";

type AuthField = {
	name: string;
	label: string;
	type: AuthFieldType;
	placeholder?: string;
	required?: boolean;
};

type AuthFormData = Record<string, string>;

type AuthFormProps = {
	title: string;
	subtitle?: string;
	fields: AuthField[];
	onSubmit: (data: AuthFormData) => void;
	submitButtonText: string;
	footerText?: string;
	footerLinkText?: string;
	footerLinkHref?: string;
	showBlugetBranding?: boolean;
};

export default function AuthForm({
	title,
	subtitle,
	fields,
	onSubmit,
	submitButtonText,
	footerText,
	footerLinkText,
	footerLinkHref,
	showBlugetBranding = true,
}: AuthFormProps) {
	const [formData, setFormData] = useState<AuthFormData>({});

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const inputClasses =
		"w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900";

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
			<div className="max-w-md w-full">
				{/* Bluget Branding */}
				{showBlugetBranding && (
					<div className="text-center mb-8">
						<h1 className="text-4xl font-bold text-gray-900 mb-2">Bluget</h1>
						<div className="h-1 w-16 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
					</div>
				)}

				{/* Auth Card */}
				<div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
					{/* Title & Subtitle */}
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
						{subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-5">
						{fields.map((field) => (
							<div key={field.name}>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									{field.label}
									{field.required && (
										<span className="text-red-500 ml-1">*</span>
									)}
								</label>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={(e) => handleChange(field.name, e.target.value)}
									placeholder={field.placeholder}
									required={field.required}
									className={inputClasses}
								/>
							</div>
						))}

						<div className="pt-2 flex items-center justify-center ">
							<Button type="submit" variant="primary" size="large">
								{submitButtonText}
							</Button>
						</div>
					</form>

					{/* Footer Link */}
					{footerText && footerLinkText && footerLinkHref && (
						<div className="mt-6 text-center">
							<p className="text-sm text-gray-600">
								{footerText}{" "}
								<Link
									href={footerLinkHref}
									className="text-blue-600 hover:text-blue-700 font-semibold"
								>
									{footerLinkText}
								</Link>
							</p>
						</div>
					)}
				</div>

				{/* Back to Home */}
				<div className="text-center mt-6">
					<Link
						href="/"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						← Back to home
					</Link>
				</div>
			</div>
		</div>
	);
}

"use client";

import { useState } from "react";
import Form from "@/components/forms/Form";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function SettingsPage() {
	const { user, refreshUser } = useAuth();
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const [saved, setSaved] = useState(false);

	const settingsFields = [
		{
			name: "name",
			label: "Name",
			type: "text" as const,
			required: true,
			placeholder: "Your full name",
		},
		{
			name: "email",
			label: "Email (read-only)",
			type: "text" as const,
			required: false,
			placeholder: "you@example.com",
		},
		{
			name: "currency",
			label: "Currency",
			type: "select" as const,
			required: false,
			options: [
				{ label: "USD - $", value: "USD" },
				{ label: "EUR - €", value: "EUR" },
				{ label: "GBP - £", value: "GBP" },
				{ label: "CAD - $", value: "CAD" },
				{ label: "AUD - $", value: "AUD" },
				{ label: "JPY - ¥", value: "JPY" },
				{ label: "CHF - CHF", value: "CHF" },
				{ label: "CNY - ¥", value: "CNY" },
				{ label: "INR - ₹", value: "INR" },
				{ label: "MXN - $", value: "MXN" },
			],
		},
		{
			name: "timezone",
			label: "Timezone",
			type: "select" as const,
			required: false,
			options: [
				{ label: "UTC-12:00", value: "UTC-12" },
				{ label: "UTC-08:00 (Pacific)", value: "UTC-8" },
				{ label: "UTC-07:00 (Mountain)", value: "UTC-7" },
				{ label: "UTC-06:00 (Central)", value: "UTC-6" },
				{ label: "UTC-05:00 (Eastern)", value: "UTC-5" },
				{ label: "UTC-04:00 (Atlantic)", value: "UTC-4" },
				{ label: "UTC+00:00 (GMT)", value: "UTC+0" },
				{ label: "UTC+01:00 (CET)", value: "UTC+1" },
				{ label: "UTC+02:00 (EET)", value: "UTC+2" },
				{ label: "UTC+05:30 (IST)", value: "UTC+5:30" },
				{ label: "UTC+08:00 (CST)", value: "UTC+8" },
				{ label: "UTC+09:00 (JST)", value: "UTC+9" },
				{ label: "UTC+10:00 (AEST)", value: "UTC+10" },
				{ label: "UTC+12:00 (NZST)", value: "UTC+12" },
			],
		},
		{
			name: "theme",
			label: "Theme",
			type: "select" as const,
			required: false,
			options: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" },
			],
		},
	];

	const initialData = {
		name: user?.name ?? "",
		email: user?.email ?? "",
		currency: user?.currency ?? "USD",
		timezone: user?.timezone ?? "UTC-5",
		theme: user?.theme ?? "light",
	};

	const handleSubmit = async (data: Record<string, string | number>) => {
		setError(undefined);
		setSaved(false);
		setIsLoading(true);
		try {
			await api.put("/auth/settings", {
				name: data.name,
				currency: data.currency,
				timezone: data.timezone,
				theme: data.theme,
			});
			await refreshUser();
			setSaved(true);
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Failed to save settings.";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 sm:p-6 rounded-xl min-h-screen">
			<div className="max-w-2xl mx-auto">
				{saved && (
					<div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
						Settings saved successfully.
					</div>
				)}
				<Form
					title="Settings"
					fields={settingsFields}
					onSubmit={handleSubmit}
					initialData={initialData}
					error={error}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

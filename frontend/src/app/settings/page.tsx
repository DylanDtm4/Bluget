"use client";

import Form from "@/components/forms/Form";
import { useRouter } from "next/navigation";

type FormData = Record<string, string | number>;

export default function SettingsPage() {
	const router = useRouter();

	// Example initial user data (replace with API fetch later)

	// Define all fields
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
			label: "Email",
			type: "text" as const,
			required: true,
			placeholder: "you@example.com",
		},
		{
			name: "currency",
			label: "Currency",
			type: "select" as const,
			required: true,
			options: [
				{ label: "USD - $", value: "USD" },
				{ label: "EUR - €", value: "EUR" },
				{ label: "GBP - £", value: "GBP" },
				{ label: "JPY - ¥", value: "JPY" },
			],
		},
		{
			name: "timezone",
			label: "Timezone",
			type: "select" as const,
			required: true,
			options: [
				{ label: "GMT-12", value: "GMT-12" },
				{ label: "GMT-6", value: "GMT-6" },
				{ label: "GMT-5", value: "GMT-5" },
				{ label: "GMT+0", value: "GMT+0" },
				{ label: "GMT+1", value: "GMT+1" },
			],
		},
		{
			name: "theme",
			label: "Theme",
			type: "select" as const,
			required: true,
			options: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" },
				{ label: "System Default", value: "system" },
			],
		},
		{
			name: "defaultView",
			label: "Dashboard Default View",
			type: "select" as const,
			required: true,
			options: [
				{ label: "Month", value: "month" },
				{ label: "Week", value: "week" },
				{ label: "Year", value: "year" },
			],
		},
	];

	const handleSubmit = (data: FormData) => {
		console.log("Settings submitted:", data);

		// TODO: Replace with API call
		// fetch('/api/settings', { method: 'POST', body: JSON.stringify(data) })

		alert("Settings saved!");
	};

	const handleCancel = () => {
		router.push("/"); // Redirect to dashboard or homepage
	};

	return (
		<Form
			title="Settings"
			fields={settingsFields}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);
}

"use client";

import { useState } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
	const router = useRouter();
	const { register } = useAuth();
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	const signupFields = [
		{
			name: "name",
			label: "Full Name",
			type: "text" as const,
			placeholder: "John Doe",
			required: true,
		},
		{
			name: "email",
			label: "Email",
			type: "email" as const,
			placeholder: "you@example.com",
			required: true,
		},
		{
			name: "password",
			label: "Password",
			type: "password" as const,
			placeholder: "••••••••",
			required: true,
		},
		{
			name: "confirmPassword",
			label: "Confirm Password",
			type: "password" as const,
			placeholder: "••••••••",
			required: true,
		},
	];

	const handleSignup = async (data: Record<string, string>) => {
		setError(undefined);

		if (data.password !== data.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setIsLoading(true);
		try {
			await register(data.name, data.email, data.password);
			router.push("/dashboard");
		} catch (err: unknown) {
			const msg =
				(err as { response?: { data?: { error?: string } } })?.response?.data
					?.error ?? "Registration failed. Please try again.";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthForm
			title="Create Account"
			subtitle="Start managing your finances today"
			fields={signupFields}
			onSubmit={handleSignup}
			submitButtonText="Sign Up"
			footerText="Already have an account?"
			footerLinkText="Sign in"
			footerLinkHref="/login"
			error={error}
			isLoading={isLoading}
		/>
	);
}

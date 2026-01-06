"use client";

import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();

	const loginFields = [
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
	];

	const handleLogin = (data: Record<string, string>) => {
		console.log("Login:", data);
		// Add your login logic here
		// Then redirect to dashboard
		router.push("/dashboard");
	};

	return (
		<AuthForm
			title="Welcome Back"
			subtitle="Sign in to your account"
			fields={loginFields}
			onSubmit={handleLogin}
			submitButtonText="Sign In"
			footerText="Don't have an account?"
			footerLinkText="Sign up"
			footerLinkHref="/signup"
		/>
	);
}

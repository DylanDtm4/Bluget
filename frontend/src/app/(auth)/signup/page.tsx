"use client";

import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/navigation";

export default function SignupPage() {
	const router = useRouter();

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

	const handleSignup = (data: Record<string, string>) => {
		console.log("Signup:", data);
		// Add your signup logic here
		// Then redirect to dashboard
		router.push("/dashboard");
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
		/>
	);
}

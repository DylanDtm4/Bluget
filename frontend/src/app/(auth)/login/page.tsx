"use client";
import axios from "axios";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
	const router = useRouter();
	const { login } = useAuth();

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

	const handleLogin = async (data: Record<string, string>) => {
		try {
			await login(data.email, data.password);
			router.push("/dashboard");
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				alert(err.response?.data?.error || "Login failed");
			} else {
				alert("Login failed");
			}
		}
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

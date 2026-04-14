"use client";
import axios from "axios";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
	const router = useRouter();
	const { login } = useAuth();

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
		try {
			// ✅ Optional: validate passwords match
			if (data.password !== data.confirmPassword) {
				alert("Passwords do not match");
				return;
			}

			// ✅ Register
			await api.post("/auth/register", {
				name: data.name,
				email: data.email,
				password: data.password,
			});

			// ✅ Auto login using context
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

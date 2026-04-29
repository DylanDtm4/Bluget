"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_PATHS = ["/", "/login", "/signup"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const isPublic = PUBLIC_PATHS.includes(pathname);

	useEffect(() => {
		if (loading) return;
		if (!user && !isPublic) {
			router.replace("/login");
		}
		if (user && (pathname === "/login" || pathname === "/signup")) {
			router.replace("/dashboard");
		}
	}, [loading, user, isPublic, pathname, router]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-sm">Loading...</div>
			</div>
		);
	}

	if (!user && !isPublic) {
		return null;
	}

	return <>{children}</>;
}

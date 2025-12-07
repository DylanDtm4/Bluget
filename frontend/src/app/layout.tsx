import "./styles/globals.css";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata = {
	title: "Bluget",
	description: "Budgeting app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}

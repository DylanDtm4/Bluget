import "./styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
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
				<AuthProvider>
					<Header />
					<main>{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}

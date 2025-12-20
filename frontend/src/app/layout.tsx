import "./styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Head from "next/head";
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
          <main style={{ padding: "2rem" }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

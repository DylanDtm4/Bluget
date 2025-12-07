import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen gap-4">
			<h1 className="text-3xl font-bold">Bluget</h1>

			<Link href="/login" className="text-blue-600 underline">
				Login
			</Link>

			<Link href="/signup" className="text-blue-600 underline">
				Sign Up
			</Link>
		</main>
	);
}

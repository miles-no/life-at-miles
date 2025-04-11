import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router"

import blobBackgroundStylesheetUrl from "./styles/blobBackground.css?url"
import fontsStylesheetUrl from "./styles/fonts.css?url"
import globalStylesheetUrl from "./styles/global.css?url"
import tailwindStylesheetUrl from "./styles/tailwind.css?url"

import type { Route } from "./+types/root"

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: blobBackgroundStylesheetUrl },
	{ rel: "stylesheet", href: tailwindStylesheetUrl },
	{ rel: "stylesheet", href: globalStylesheetUrl },
	{ rel: "stylesheet", href: fontsStylesheetUrl },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href:
			"https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
	},
]

export default function App() {
	return (
		<html lang="en" data-theme="miles-light" style={{ height: "100%" }}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<title>Life@Miles</title>
			</head>
			<body className="bg-base-200 min-h-screen">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!"
	let details = "An unexpected error occurred."
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error"
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}

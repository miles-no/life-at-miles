import { Link, redirect, useLoaderData } from "react-router";
import { getCurrentUser } from "~/services/auth.server";
import type { Route } from "./+types/login";
import { LifeAtMiles } from "~/components/LifeAtMiles";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await getCurrentUser(request);
	if (user) redirect("/");

	return { user };
};

export default function Login({ }: Route.ComponentProps) {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="flex justify-center">
					<LifeAtMiles />
				</div>
				<h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<Link to="/auth/google" className="w-full">
					<div className="flex w-full justify-center items-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
						<svg aria-label="Google logo" role="img" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
							<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
							<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
							<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
							<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
							<path fill="none" d="M0 0h48v48H0z" />
						</svg>
						Sign in with Google
					</div>
				</Link>

				<p className="mt-8 text-center text-sm text-gray-500">
					Only available for Miles employees
				</p>
			</div>
		</div>
	);
}
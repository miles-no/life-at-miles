import { Link, redirect, useLoaderData } from "react-router"
import { LifeAtMiles } from "~/components/LifeAtMiles"
import { getCurrentUser } from "~/services/auth.server"
import type { Route } from "./+types/login"

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await getCurrentUser(request)
	return { user }
}

export default function Login() {
	const { user } = useLoaderData()

	if (user) {
		redirect("/")
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="flex flex-col justify-center items-center border rounded-2xl p-32">
				<LifeAtMiles />
				<Link to="/auth/google">
					<button
						type="button"
						className="btn bg-base-100 text-base-content border-neutral-content hover:bg-base-200 mt-2"
					>
						<svg
							aria-labelledby="googleLogoTitle"
							className="w-4 h-4 mr-2"
							height="512"
							width="512"
							viewBox="0 0 512 512"
						>
							<title id="googleLogoTitle">Google Logo</title>
							<g>
								<path d="m0 0H512V512H0" fill="#fff" />
								<path
									fill="#34a853"
									d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
								/>
								<path
									fill="#4285f4"
									d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
								/>
								<path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
								<path
									fill="#ea4335"
									d="m90 170a208 187 0 01356-51l-62 48A122 122 0 00153 219"
								/>
							</g>
						</svg>
						Login with Google
					</button>
				</Link>
			</div>
		</div>
	)
}

import { handleGoogleCallback } from "~/services/auth.server"
import type { Route } from "./+types/auth.google.callback"

export const loader = async ({ request }: Route.LoaderArgs) => {
	return handleGoogleCallback(request)
}

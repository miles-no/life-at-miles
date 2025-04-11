import { logout } from "~/services/auth.server"
import type { Route } from "./+types/logout"

export const action = async ({ request }: Route.ActionArgs) => {
	return logout(request)
}

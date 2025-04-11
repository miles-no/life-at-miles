import { redirect } from "react-router"
import { getGoogleAuthUrl } from "~/services/auth.server"

export const loader = async () => {
	const authUrl = getGoogleAuthUrl()
	return redirect(authUrl)
}

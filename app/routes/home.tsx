import ExternalLinks from "~/components/ExternalLinks";
import Header from "~/components/Header";
import type { Route } from "./+types/home";
import { getExternalLinksAsync } from "~/services/externalLinks.server";
import InternalProjects from "~/components/InternalProjects";
import { getInternalProjectsAsync } from "~/services/internalProjects.server";
import { requireAuth } from "~/services/auth.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await requireAuth(request);
  const externalLinks = await getExternalLinksAsync();
  const internalProjects = await getInternalProjectsAsync();
  return { externalLinks, internalProjects, user };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { externalLinks, internalProjects, user } = loaderData;
  return (
    <div>
      <Header name={user.given_name} />
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-7xl">
          <ExternalLinks externalLinks={externalLinks} />
          <InternalProjects internalProjects={internalProjects} />
        </div>
      </div>
    </div>
  )
}

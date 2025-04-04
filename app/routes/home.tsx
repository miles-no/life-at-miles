import ExternalLinks from "~/components/ExternalLinks";
import Header from "~/components/Header";
import type { Route } from "./+types/home";
import { getExternalLinksAsync } from "~/services/externalLinks";
import InternalProjects from "~/components/InternalProjects";
import { getInternalProjectsAsync } from "~/services/internalProjects";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const externalLinks = await getExternalLinksAsync();
  const internalProjects = await getInternalProjectsAsync();
  return { externalLinks, internalProjects };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { externalLinks, internalProjects } = loaderData;
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[1360px]">
          <ExternalLinks externalLinks={externalLinks} />
          <InternalProjects internalProjects={internalProjects} />
        </div>
      </div>
    </div>
  )
}

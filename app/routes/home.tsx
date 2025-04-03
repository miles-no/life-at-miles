import ExternalLinks from "~/components/ExternalLinks";
import Header from "~/components/Header";
import type { Route } from "./+types/home";
import { getExternalLinksAsync } from "~/services/externalLinks";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const externalLinks = await getExternalLinksAsync();
  return { externalLinks };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { externalLinks } = loaderData;
  return (
    <div>
      <Header />
      <ExternalLinks externalLinks={externalLinks} />
    </div>
  )
}

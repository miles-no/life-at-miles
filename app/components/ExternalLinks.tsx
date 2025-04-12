import ExternalLinkIcon from "~/icons/ExternalLinkIcon"
import HjerteMilesOutlinedIcon from "~/icons/HjerteMilesOutlinedIcon"
import type { ExternalLink } from "~/types/ExternalLink"

type ExternalLinksProps = {
  externalLinks: Array<ExternalLink>
}

type ExternalLinkCardProps = {
  link: ExternalLink
}

function ExternalLinkCard(props: ExternalLinkCardProps) {
  const { link } = props
  return (
    <a
      href={link.url}
      className="card relative group max-w-md h-80 border-2 rounded-3xl"
    >
      <div className="card-body">
        <h1 className="card-title text-4xl font-semibold">{link.title}</h1>
        <p className="text-xl">{link.description}</p>
      </div>
      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLinkIcon />
      </div>
      <div className="absolute bottom-6 right-6">
        <HjerteMilesOutlinedIcon />
      </div>
    </a>
  )
}

export default function ExternalLinks({ externalLinks }: ExternalLinksProps) {
  return (
    <div className="flex justify-center mt-16 pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {externalLinks.map((link) => (
          <ExternalLinkCard key={link.url} link={link} />
        ))}
      </div>
    </div>
  )
}

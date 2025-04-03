import ExternalLinkIcon from "~/icons/ExternalLinkIcon"
import HjerteMilesOutlinedIcon from "~/icons/HjerteMilesOutlinedIcon"
import type { ExternalLink } from "~/types/ExternalLink"

type ExternalLinksProps = {
    externalLinks: Array<ExternalLink>
}

type ExternalLinkCardProps = {
    index: number
    link: ExternalLink
}

function ExternalLinkCard(props: ExternalLinkCardProps) {
    const { index, link } = props
    return (
        <a id={`externallink-${index}`} href={link.url} className="card relative group w-[393px] h-[317px] border-3 rounded-[30px] ">
            <div className="card-body">
                <h1 className="card-title text-[36px] font-[600]">{link.title}</h1>
                <p className="text-[20px]">{link.description}</p>
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

export default function ExternalLinks({externalLinks}: ExternalLinksProps) {
    return (
        <div className="flex justify-center mt-[64px] pb-[64px]">
        <div className="flex flex-wrap gap-x-16 gap-y-8 justify-center max-w-[1460px]">
            {externalLinks.map((link, index) => (
                    <ExternalLinkCard key={index} index={index} link={link} />
            ))}
        </div>
        </div>
    )
}
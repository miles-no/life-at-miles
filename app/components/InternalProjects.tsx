import type { InternalProject, Tag } from "~/types/InternalProject"

type InternalProjectsProps = {
    internalProjects: Array<InternalProject>
}

type InternalProjectCardProps = {
    index: number
    project: InternalProject
}

type InternalProjectTagProps = {
    label: string
    borderColor: string
    textColor: string
}

type CardStyleTheme = {
    titleColor: string
    textColor: string
    backgroundColor: string
    buttonColor: string
    buttonTextColor: string
    buttonHover: string
    tagBorderColor: string
    tagTextColor: string
}

const generateCardStyleTheme = (index: number): CardStyleTheme => {
    switch (index % 6) {
        case 0:
        case 2:
        case 4:
        case 5:
            return {
                titleColor: "text-secondary",
                textColor: "",
                backgroundColor: "bg-base-200",
                buttonColor: "bg-secondary",
                buttonHover: "hover:bg-secondary-content",
                buttonTextColor: "text-base-200",
                tagBorderColor: "border-secondary",
                tagTextColor: ""
            }
        case 1:
            return {
                titleColor: "text-base-200",
                textColor: "text-base-200",
                backgroundColor: "bg-primary",
                buttonColor: "bg-base-200",
                buttonHover: "hover:bg-base-300",
                buttonTextColor: "",
                tagBorderColor: "border-base-200",
                tagTextColor: "text-base-200"
            }
        case 3:
            return {
                titleColor: "text-base-200",
                textColor: "text-base-200",
                backgroundColor: "bg-secondary",
                buttonColor: "bg-base-200",
                buttonHover: "hover:bg-base-300",
                buttonTextColor: "",
                tagBorderColor: "border-tertiary",
                tagTextColor: "text-base-200"
            }
        default:
            return {
                titleColor: "text-secondary",
                textColor: "",
                backgroundColor: "bg-base-200",
                buttonColor: "bg-secondary",
                buttonHover: "hover:bg-secondary-content",
                buttonTextColor: "text-base-100",
                tagBorderColor: "border-secondary",
                tagTextColor: ""
            }
    }
}

function InternalProjectTag(props: InternalProjectTagProps) {
    const { label, borderColor, textColor } = props;
    return (
        <div className={`border-2 rounded-[50px] px-[16px] py-[8px] ${borderColor} ${textColor}`}>
            {label}
        </div>
    )
}

function InternalProjectCard(props: InternalProjectCardProps) {
    const { index, project } = props

    const cardStyle = generateCardStyleTheme(index)

    const handleButtonClick = () => {
        window.location.href = project.contactUrl;
    }

    return (
        <a id={`externallink-${index}`}  className={`card max-w-[393px] h-[542px] border-1 rounded-[30px] ${cardStyle.backgroundColor}`}>
            <div className="card-body">
                <h1 className={`card-title flex flex-col items-start text-start h-[196px] text-[36px] font-[600] ${cardStyle.titleColor}`}>{project.title}</h1>
                <button
                    onClick={handleButtonClick}
                    className={`inline-block rounded-[50px] mt-[128px] pt-[16px] pb-[16px] pl-[24px] pr-[24px] w-[133px] ${cardStyle.buttonColor} ${cardStyle.buttonTextColor} ${cardStyle.buttonHover} cursor-pointer`}>
                        Ta kontakt!
                </button>
                <div className={`${cardStyle.textColor} mt-[16px]`}>For deg som er interessert i:</div>
                <div className="flex flex-row gap-[8px]">
                    {project.tags.map((tag: Tag, index: number) => (
                        <InternalProjectTag key={index} label={tag.label} borderColor={cardStyle.tagBorderColor} textColor={cardStyle.tagTextColor} />
                    ))}
                </div>
            </div>
        </a>
    )
}

export default function ExternalProjects ({ internalProjects }: InternalProjectsProps) {
    return (
        <div>
            <div className="ml-[32px] text-[36px] font-[500] mb-[32px]">
                <div>Her er de interne prosjekter vi jobber i mellom oppdrag.</div>
                <div className="text-secondary">Vil du bli med?</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {internalProjects.map((project, index) => (
                        <InternalProjectCard key={index} index={index} project={project} />
                ))}
            </div>
        </div>
    )
}
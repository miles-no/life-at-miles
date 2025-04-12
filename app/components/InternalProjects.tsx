import type { InternalProject, Tag } from "~/types/InternalProject"

type InternalProjectsProps = {
  internalProjects: Array<InternalProject>
}

type InternalProjectCardProps = {
  index: number
  project: InternalProject
}

type CardStyleTheme = {
  titleColor: string
  textColor: string
  backgroundColor: string
  buttonColor: string
  tagBorderColor: string
  tagTextColor: string
}

const generateCardStyleTheme = (index: number): CardStyleTheme => {
  if (index % 6 === 1)
    return {
      titleColor: "text-primary-content",
      textColor: "text-primary-content",
      backgroundColor: "bg-primary",
      buttonColor: "btn-primary-content",
      tagBorderColor: "border-primary-content",
      tagTextColor: "text-primary-content",
    }

  if (index % 6 === 3)
    return {
      titleColor: "text-accent-content",
      textColor: "text-accent-content",
      backgroundColor: "bg-accent",
      buttonColor: "btn-accent-content",
      tagBorderColor: "border-accent-content",
      tagTextColor: "text-accent-content",
    }

  return {
    titleColor: "text-accent",
    textColor: "text-base-content",
    backgroundColor: "bg-base",
    buttonColor: "btn-accent",
    tagBorderColor: "border-accent",
    tagTextColor: "text-base-content",
  }
}

function InternalProjectCard(props: InternalProjectCardProps) {
  const { index, project } = props

  const cardStyle = generateCardStyleTheme(index)

  return (
    <a
      id={`externallink-${index}`}
      href={project.contactUrl}
      className={`card max-w-md h-2xl border rounded-3xl ${cardStyle.backgroundColor}`}
    >
      <div className="card-body">
        <h1
          className={`card-title flex flex-col items-start text-start h-48 text-4xl font-semibold ${cardStyle.titleColor}`}
        >
          {project.title}
        </h1>
        <a
          href={project.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn rounded-full w-32 ${cardStyle.buttonColor}`}
        >
          Ta kontakt!
        </a>
        <div className={`${cardStyle.textColor} mt-4`}>
          For deg som er interessert i:{" "}
        </div>
        <div className="flex flex-row gap-2">
          {project.tags.map((tag: Tag) => (
            <p
              className={`badge px-4 py-2 badge-outline badge-neutral ${cardStyle.tagBorderColor} ${cardStyle.tagTextColor}`}
              key={tag.label}
            >
              {tag.label}
            </p>
          ))}
        </div>
      </div>
    </a>
  )
}

export default function InternalProjects({
  internalProjects,
}: InternalProjectsProps) {
  return (
    <div>
      <div className="ml-8 text-4xl font-medium mb-8">
        <div>Her er de interne prosjekter vi jobber i mellom oppdrag.</div>
        <div className="text-accent">Vil du bli med?</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {internalProjects.map((project, index) => (
          <InternalProjectCard
            key={project.contactUrl}
            index={index}
            project={project}
          />
        ))}
      </div>
    </div>
  )
}

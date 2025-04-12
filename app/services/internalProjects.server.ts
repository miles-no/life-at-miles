import type { InternalProject } from "~/types/InternalProject"

export async function getInternalProjectsAsync(): Promise<
  Array<InternalProject>
> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  return [
    {
      title: "Paycheck - hold oversikt over lønnslipper",
      contactUrl: "https://miles-no.slack.com/team/U037JA5CV35",
      tags: [{ label: "UX/UI" }, { label: "Frontend" }, { label: "Backend" }],
    },
    {
      title: "Integrering av Logit i Paycheck",
      contactUrl: "https://miles-no.slack.com/team/U037JA5CV35",
      tags: [{ label: "UX/UI" }, { label: "Frontend" }, { label: "Backend" }],
    },
    {
      title: "Optimalisering av Meet",
      contactUrl: "https://miles-no.slack.com/team/U037JA5CV35",
      tags: [{ label: "UX/UI" }, { label: "Frontend" }, { label: "Backend" }],
    },
    {
      title: "Kabinizer - automatisering av hyttetrekning",
      contactUrl: "https://miles-no.slack.com/team/U037JA5CV35",
      tags: [{ label: "UX/UI" }, { label: "Frontend" }, { label: "Backend" }],
    },
    {
      title: "UX portfolio- hjelp Salgsteam for å selge UX kompetanse.",
      contactUrl: "https://miles-no.slack.com/team/U037JA5CV35",
      tags: [
        { label: "UX/UI" },
        { label: "Tjenestedesign" },
        { label: "Salg" },
      ],
    },
  ]
}

import type { ExternalLink } from "~/types/ExternalLink"

export async function getExternalLinksAsync(): Promise<Array<ExternalLink>> {
	await new Promise((resolve) => setTimeout(resolve, 200))

	const externalLinks = [
		{
			title: "Paycheck",
			url: "https://paycheck.miles.no/",
			description:
				"Hold oversikt over tidligere lønnsslipper og se hva som venter på den neste utbetaling. 💰",
		},
		{
			title: "Logit",
			url: "https://logit.miles.no/timesheet/daily",
			description: "Registrer arbeidstimer på en enkel og oversiktlig måte. ⏱️",
		},
		{
			title: "XLedger",
			url: "https://www.xledger.net/auth/signin",
			description:
				"Hold orden på økonomien med registrering av utgifter, reiser og timer. Få full oversikt over økonomiske detaljer på en effektiv og oversiktlig måte. 📊",
		},
		{
			title: "Flowcase",
			url: "https://miles.cvpartner.com/dashboard",
			description:
				"Oppdater og finpuss CV-en din for spennende nye muligheter. ✍️",
		},
		{
			title: "Simployer",
			url: "https://portal.simployer.com/",
			description:
				"Finn praktisk informasjon og ressurser for å støtte deg i arbeidslivet. 📚",
		},
		{
			title: "Slack",
			url: "http://miles-no.slack.com/",
			description:
				"Hold kontakten med teamet ditt og bli med i diskusjoner i våre Slack-kanaler. 💬",
		},
		{
			title: "Konferanser",
			url: "https://links.miles.no/konf",
			description:
				"Finn oversikt over konferanser som kollegaene dine skal på. 👩‍🏫",
		},
		{
			title: "Camp",
			url: "https://camp.miles.no/",
			description: "Finn informasjon om Camp i Miles. 🏕️",
		},
		{
			title: "Personportalen",
			url: "https://personportalen.inbrin.com/Personportal2.html?kundeNr=bba3d818-4e11-4a05-9c16-9ff6a1052b33",
			description: "Få oversikt over dine personforsikringer. 📄",
		},
		{
			title: "Miles",
			url: "https://www.miles.no/",
			description: "Hjemmesiden til Miles. ❤️",
		},
		{
			title: "SMiles Kalender",
			url: "https://calendar.google.com/calendar/u/0/embed?src=miles.no_kfeao8qeve0kugq0se1gi92cu4@group.calendar.google.com&ctz=Europe/Oslo&pli=1",
			description:
				"Se hvilke SMiles-arrangementer som skjer i nærmeste fremtid. 📅",
		},
		{
			title: "iteam Kundeservice",
			url: "https://kundesenternordvest.myportallogin.co.uk/",
			description: "Få it-hjelp og support fra iTeam. 💻",
		},
		{
			title: "Miles Systems",
			url: "https://sites.google.com/miles.no/systems?pli=1",
			description:
				"TFinn alle systemer, programvare, lisenser og andre verktøy du har standard tilgang til i Miles, samt de som administreres og finansieres av selskapet.👾",
		},
	]

	return externalLinks
}

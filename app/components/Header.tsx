import { LifeAtMiles } from "./LifeAtMiles"

type HeaderProps = {
    name: string
}

export default function Header({ name }: HeaderProps) {
    return (
        <div className="flex flex-col w-full bg-base-300">
            <div className="flex flex-col sm:flex-row justify-between pt-6 sm:pt-16 px-4 sm:px-16 w-full">
                <LifeAtMiles />
                <form method="post" action="/logout" className="mt-4 sm:mt-0">
                    <button className="hover:cursor-pointer" type="submit">Logg ut</button>
                </form>
            </div>
            <div className="flex flex-col items-center justify-center pt-6 sm:pt-8 px-4 text-center">
                <div className="text-2xl sm:text-4xl font-medium">{`Hei ${name}, velkommen til en enklere hverdag i Miles! 🌟`}</div>
                <div className="pt-3 sm:pt-3 pb-6 sm:pb-16 text-lg sm:text-2xl font-normal w-full sm:w-[774px]">
                    Alt på ett sted, slik at du kan bruke mer tid på det som
                    virkelig betyr noe. Her har du enkel tilgang til alt du trenger
                    for å trives og vokse – både i arbeid og fritid. Utforsk, klikk
                    rundt, og gjør deg kjent!
                </div>
            </div>
        </div>
    )
}
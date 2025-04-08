import { LifeAtMiles } from "./LifeAtMiles"

type HeaderProps = {
    name: string
}

export default function Header({ name }: HeaderProps) { 
    return (
        <div className="flex flex-col w-full bg-base-300">
            <div className="flex flex-row justify-between pt-[64px] pl-[64px] pr-[64px] w-full">
                <LifeAtMiles />
                <form method="post" action="/logout">
                    <button className="on-hover: cursor-pointer" type="submit">Logg ut</button>
                </form>
            </div>
            <div className="flex flex-col items-center justify-center pt-[32px]">
                <div className="text-[35px] font-[500]">{`Hei ${name}, velkommen til en enklere hverdag i Miles! 🌟`}</div>
                <div className="pt-[12px] pb-[64px] text-[28px] font-[400] w-[774px]">
                    Alt på ett sted, slik at du kan bruke mer tid på det som 
                    virkelig betyr noe. Her har du enkel tilgang til alt du trenger 
                    for å trives og vokse – både i arbeid og fritid. Utforsk, klikk 
                    rundt, og gjør deg kjent!
                </div>
            </div>
        </div>
    )
}
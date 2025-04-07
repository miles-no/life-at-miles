import MilesIcon from "~/icons/MilesIcon";

export function LifeAtMiles () {
    return (
        <div className="flex flex-row items-center text-[35px]">
            <div className="pt-[6px]">Life</div>
            <div>@</div>
            <MilesIcon />
        </div>
    )
}
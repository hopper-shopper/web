import * as Progress from "components/progress/Progress"
import { formatPercent } from "formatters/number"
import { Hopper } from "models/Hopper"
import { getHopperMaxTadpoleChance, getTadpoleChance } from "utils/fertility"

type HopperBreedingChancesProps = {
    hopper: Hopper
}

export default function HopperBreedingChances(props: HopperBreedingChancesProps) {
    const { hopper } = props

    const maxChance = getHopperMaxTadpoleChance(hopper)
    const currentChance = getTadpoleChance(hopper)

    const render75 = maxChance > 0.75

    return (
        <Progress.Root size="lg">
            <Progress.Step at={0.25}>25 %</Progress.Step>
            <Progress.Step at={0.5}>50 %</Progress.Step>
            {render75 && <Progress.Step at={0.75}>75 %</Progress.Step>}
            <Progress.Step at={maxChance}>
                max{" "}
                {formatPercent(maxChance, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                })}
            </Progress.Step>

            <Progress.Indicator percent={currentChance}>
                {formatPercent(currentChance)}
            </Progress.Indicator>
        </Progress.Root>
    )
}

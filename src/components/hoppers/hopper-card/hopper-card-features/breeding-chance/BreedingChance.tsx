import { useHopperContext } from "contexts/HopperContext"
import { getPercentFormatter } from "formatters/number"
import { styled } from "theme"
import { calculateTadpoleChanceAtLevel } from "utils/fertility"
import * as Feature from "../HopperCardFeature"

export default function BreedingChance() {
    const { hopper } = useHopperContext()

    const breedingChance = calculateTadpoleChanceAtLevel(hopper.level, hopper)

    return (
        <Feature.Root>
            <Feature.Title>Breeding chance</Feature.Title>
            <StyledChance>{percentFormatter(breedingChance)}</StyledChance>
        </Feature.Root>
    )
}

const percentFormatter = getPercentFormatter({
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

const StyledChance = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
})

import { useHopperContext } from "contests/HopperContext"
import { styled } from "theme"
import { HOPPER_STATS_SCALE } from "utils/hopper"
import * as Feature from "../HopperCardFeature"

type BaseStatsListProps = {
    /**
     * @default false
     */
    title?: boolean
}

export default function BaseStatsList(props: BaseStatsListProps) {
    const { title = false } = props
    const { hopper } = useHopperContext()

    return (
        <Feature.Root>
            {title && <Feature.Title>Base stats</Feature.Title>}
            <StyledBaseStatsList>
                <BaseStat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.strength) }}>
                    {hopper.strength}
                </BaseStat>
                <BaseStat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.agility) }}>
                    {hopper.agility}
                </BaseStat>
                <BaseStat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.vitality) }}>
                    {hopper.vitality}
                </BaseStat>
                <BaseStat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.intelligence) }}>
                    {hopper.intelligence}
                </BaseStat>
                <BaseStat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.fertility) }}>
                    {hopper.fertility}
                </BaseStat>
            </StyledBaseStatsList>
        </Feature.Root>
    )
}

const StyledBaseStatsList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    columnGap: "0.5rem",
})
const BaseStat = styled("div", {
    borderRadius: "$sm",
    padding: "0.125rem",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    color: "$gray12",
})

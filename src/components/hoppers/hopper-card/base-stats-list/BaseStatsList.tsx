import { Hopper } from "models/Hopper"
import { styled } from "theme"
import { HOPPER_STATS_SCALE } from "utils/hopper"

type BaseStatsListProps = {
    hopper: Hopper
}

export default function BaseStatsList(props: BaseStatsListProps) {
    const { hopper } = props

    return (
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

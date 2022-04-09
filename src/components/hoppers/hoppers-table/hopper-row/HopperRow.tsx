import { grassDark, tomatoDark } from "@radix-ui/colors"
import { Cell } from "components/table/Table"
import { scaleQuantize } from "d3-scale"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating } from "formatters/rating"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import {
    calculateMaxRatingPrice,
    getBaseFlyByAdventure,
    getRatingByAdventure,
} from "utils/adventures"
import {
    calculateHopperLevelAtTadpoleChange,
    calculateMaxFertilityRatingPrice,
} from "utils/fertility"
import { calculateLevelUpCosts } from "utils/level"
import {
    HoppersTableConfigFilters,
    HoppersTableConfiguration,
} from "../configure-hoppers-table/ConfigureHoppersTable"

type HopperRowProps = {
    hopper: Hopper
    index: number
    config: HoppersTableConfiguration
}

export default function HopperRow(props: HopperRowProps) {
    const { hopper, index, config } = props

    return (
        <>
            <Cell>
                <Center>
                    <Image src={hopper.image} />
                </Center>
            </Cell>
            <Cell align="center">{hopper.tokenId}</Cell>
            <Cell align="center">{hopper.level}</Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: colorScale(hopper.strength) }}>
                    {hopper.strength}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: colorScale(hopper.agility) }}>
                    {hopper.agility}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: colorScale(hopper.vitality) }}>
                    {hopper.vitality}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: colorScale(hopper.intelligence) }}>
                    {hopper.intelligence}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: colorScale(hopper.fertility) }}>
                    {hopper.fertility}
                </Value>
            </Cell>
            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                <StyledRatingCell align="center" striped={index % 2 === 0}>
                    {formatRating(getRatingByAdventure(config.permit, hopper))}
                </StyledRatingCell>
            )}
            <Cell align="right">{formatCurrency(hopper.listing.price, Currency.AVAX)}</Cell>
            <Cell align="right">{formatCurrency(hopper.levelCosts, Currency.AVAX)}</Cell>
            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                <Cell align="right">
                    {formatCurrency(calculateMaxRatingPrice(config.permit, hopper), Currency.AVAX)}
                </Cell>
            )}

            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                <Cell align="right">
                    {formatCurrency(getBaseFlyByAdventure(config.permit, hopper), Currency.FLY)}
                </Cell>
            )}

            {config.type === HoppersTableConfigFilters.FERTILITY && (
                <>
                    <Cell align="right">
                        {formatCurrency(calculateMaxFertilityRatingPrice(hopper), Currency.AVAX)}
                    </Cell>
                    <Cell align="right">
                        {formatCurrency(
                            calculateLevelUpCosts(
                                hopper.level,
                                calculateHopperLevelAtTadpoleChange(0.5, hopper),
                            ),
                            Currency.FLY,
                        )}
                    </Cell>
                </>
            )}
        </>
    )
}

const colorScale = scaleQuantize([
    tomatoDark.tomato5,
    tomatoDark.tomato6,
    tomatoDark.tomato7,
    tomatoDark.tomato8,
    tomatoDark.tomato9,
    grassDark.grass5,
    grassDark.grass6,
    grassDark.grass7,
    grassDark.grass8,
    grassDark.grass9,
]).domain([1, 10])

const Center = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})
const Image = styled("img", {
    display: "block",
    size: 50,
    borderRadius: "$sm",
})
const Value = styled("div", {
    display: "inline-flex",
    width: 100,
    borderRadius: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem 0.5rem",
})

const StyledRatingCell = styled(Cell, {
    color: "$blue12",
    variants: {
        striped: {
            true: {
                backgroundColor: "$blue2",
            },
            false: {
                backgroundColor: "$blue1",
            },
        },
    },
})

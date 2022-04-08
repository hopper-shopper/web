import { grassDark, tomatoDark } from "@radix-ui/colors"
import { scaleQuantize } from "d3-scale"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating } from "formatters/rating"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import { Adventure, calculateMaxRatingPrice, getBaseFlyByAdventure } from "utils/adventures"
import {
    calculateHopperLevelAtTadpoleChange,
    calculateMaxFertilityRatingPrice,
} from "utils/fertility"
import { calculateLevelUpCosts } from "utils/level"
import { HoppersTableConfiguration } from "../configure-hoppers-table/ConfigureHoppersTable"

type HopperRowProps = {
    hopper: Hopper
    index: number
    config: HoppersTableConfiguration
}

export default function HopperRow(props: HopperRowProps) {
    const { hopper, index, config } = props

    return (
        <>
            <TableCell>
                <Center>
                    <Image src={hopper.image} />
                </Center>
            </TableCell>
            <TableCell>{hopper.tokenId}</TableCell>
            <TableCell>{hopper.level}</TableCell>
            <TableCell>
                <Value style={{ backgroundColor: colorScale(hopper.strength) }}>
                    {hopper.strength}
                </Value>
            </TableCell>
            <TableCell>
                <Value style={{ backgroundColor: colorScale(hopper.agility) }}>
                    {hopper.agility}
                </Value>
            </TableCell>
            <TableCell>
                <Value style={{ backgroundColor: colorScale(hopper.vitality) }}>
                    {hopper.vitality}
                </Value>
            </TableCell>
            <TableCell>
                <Value style={{ backgroundColor: colorScale(hopper.intelligence) }}>
                    {hopper.intelligence}
                </Value>
            </TableCell>
            <TableCell>
                <Value style={{ backgroundColor: colorScale(hopper.fertility) }}>
                    {hopper.fertility}
                </Value>
            </TableCell>
            {config.permit === Adventure.POND && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.pond)}
                </StyledRatingCell>
            )}
            {config.permit === Adventure.STREAM && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.stream)}
                </StyledRatingCell>
            )}
            {config.permit === Adventure.SWAMP && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.swamp)}
                </StyledRatingCell>
            )}
            {config.permit === Adventure.RIVER && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.river)}
                </StyledRatingCell>
            )}
            {config.permit === Adventure.FOREST && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.forest)}
                </StyledRatingCell>
            )}
            {config.permit === Adventure.GREAT_LAKE && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.greatLake)}
                </StyledRatingCell>
            )}
            <TableCell align="right">
                {formatCurrency(hopper.listing.price, Currency.AVAX)}
            </TableCell>
            <TableCell align="right">{formatCurrency(hopper.levelCosts, Currency.AVAX)}</TableCell>
            {config.permit === Adventure.POND && (
                <TableCell align="right">
                    {formatCurrency(calculateMaxRatingPrice(Adventure.POND, hopper), Currency.AVAX)}
                </TableCell>
            )}
            {config.permit === Adventure.STREAM && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.STREAM, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.permit === Adventure.SWAMP && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.SWAMP, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.permit === Adventure.RIVER && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.RIVER, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.permit === Adventure.FOREST && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.FOREST, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.permit === Adventure.GREAT_LAKE && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.GREAT_LAKE, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}

            {config.permit && (
                <TableCell align="right">
                    {formatCurrency(getBaseFlyByAdventure(config.permit, hopper), Currency.FLY)}
                </TableCell>
            )}

            {config.fertility && (
                <>
                    <TableCell align="right">
                        {formatCurrency(calculateMaxFertilityRatingPrice(hopper), Currency.AVAX)}
                    </TableCell>
                    <TableCell align="right">
                        {formatCurrency(
                            calculateLevelUpCosts(
                                hopper.level,
                                calculateHopperLevelAtTadpoleChange(0.5, hopper),
                            ),
                            Currency.FLY,
                        )}
                    </TableCell>
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
const TableCell = styled("td", {
    color: "$gray12",
    padding: "0.5rem 1rem",
    whiteSpace: "nowrap",
    variants: {
        align: {
            left: {
                textAlign: "left",
            },
            center: {
                textAlign: "center",
            },
            right: {
                textAlign: "right",
            },
        },
    },
    defaultVariants: {
        align: "center",
    },
})
const Value = styled("div", {
    display: "inline-flex",
    width: 100,
    borderRadius: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem 0.5rem",
})

const StyledRatingCell = styled(TableCell, {
    color: "$blue12",
    variants: {
        even: {
            true: {
                backgroundColor: "$blue2",
            },
            false: {
                backgroundColor: "$blue1",
            },
        },
    },
})

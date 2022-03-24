import { grassDark, tomatoDark } from "@radix-ui/colors"
import { scaleQuantize } from "d3-scale"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating, formatRatingPremium } from "formatters/rating"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import { Adventure, calculateMaxRatingPrice } from "utils/adventures"
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
            {config.showRatingPond && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.pond)}
                </StyledRatingCell>
            )}
            {config.showRatingStream && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.stream)}
                </StyledRatingCell>
            )}
            {config.showRatingSwamp && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.swamp)}
                </StyledRatingCell>
            )}
            {config.showRatingRiver && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.river)}
                </StyledRatingCell>
            )}
            {config.showRatingForest && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.forest)}
                </StyledRatingCell>
            )}
            {config.showRatingGreatLake && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.greatLake)}
                </StyledRatingCell>
            )}
            <TableCell align="right">
                {formatCurrency(hopper.listing.price, Currency.AVAX)}
            </TableCell>
            {config.showRatingPond && (
                <TableCell align="right">
                    {formatCurrency(calculateMaxRatingPrice(Adventure.POND, hopper), Currency.AVAX)}
                </TableCell>
            )}
            {config.showRatingStream && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.STREAM, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.showRatingSwamp && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.SWAMP, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.showRatingRiver && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.RIVER, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.showRatingForest && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.FOREST, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.showRatingGreatLake && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.GREAT_LAKE, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}

            {config.showRatingPond && (
                <TableCell align="right">{formatRatingPremium(Adventure.POND, hopper)}</TableCell>
            )}
            {config.showRatingStream && (
                <TableCell align="right">{formatRatingPremium(Adventure.STREAM, hopper)}</TableCell>
            )}
            {config.showRatingSwamp && (
                <TableCell align="right">{formatRatingPremium(Adventure.SWAMP, hopper)}</TableCell>
            )}
            {config.showRatingRiver && (
                <TableCell align="right">{formatRatingPremium(Adventure.RIVER, hopper)}</TableCell>
            )}
            {config.showRatingForest && (
                <TableCell align="right">{formatRatingPremium(Adventure.FOREST, hopper)}</TableCell>
            )}
            {config.showRatingGreatLake && (
                <TableCell align="right">
                    {formatRatingPremium(Adventure.GREAT_LAKE, hopper)}
                </TableCell>
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
    width: 50,
    height: 50,
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

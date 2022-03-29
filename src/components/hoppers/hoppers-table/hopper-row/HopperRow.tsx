import { grassDark, tomatoDark } from "@radix-ui/colors"
import { scaleQuantize } from "d3-scale"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating } from "formatters/rating"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import { Adventure, calculateMaxRatingPrice, getBaseFlyByAdventure } from "utils/adventures"
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
            {config.adventure === Adventure.POND && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.pond)}
                </StyledRatingCell>
            )}
            {config.adventure === Adventure.STREAM && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.stream)}
                </StyledRatingCell>
            )}
            {config.adventure === Adventure.SWAMP && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.swamp)}
                </StyledRatingCell>
            )}
            {config.adventure === Adventure.RIVER && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.river)}
                </StyledRatingCell>
            )}
            {config.adventure === Adventure.FOREST && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.forest)}
                </StyledRatingCell>
            )}
            {config.adventure === Adventure.GREAT_LAKE && (
                <StyledRatingCell even={index % 2 === 0}>
                    {formatRating(hopper.rating.greatLake)}
                </StyledRatingCell>
            )}
            <TableCell align="right">
                {formatCurrency(hopper.listing.price, Currency.AVAX)}
            </TableCell>
            {config.adventure === Adventure.POND && (
                <TableCell align="right">
                    {formatCurrency(calculateMaxRatingPrice(Adventure.POND, hopper), Currency.AVAX)}
                </TableCell>
            )}
            {config.adventure === Adventure.STREAM && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.STREAM, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.adventure === Adventure.SWAMP && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.SWAMP, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.adventure === Adventure.RIVER && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.RIVER, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.adventure === Adventure.FOREST && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.FOREST, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}
            {config.adventure === Adventure.GREAT_LAKE && (
                <TableCell align="right">
                    {formatCurrency(
                        calculateMaxRatingPrice(Adventure.GREAT_LAKE, hopper),
                        Currency.AVAX,
                    )}
                </TableCell>
            )}

            <TableCell align="right">
                {formatCurrency(getBaseFlyByAdventure(config.adventure, hopper), Currency.FLY)}
            </TableCell>
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

import { grassDark, tomatoDark } from "@radix-ui/colors"
import MarketIndicator from "components/hoppers/market-indicator/MarketIndicator"
import { scaleQuantize } from "d3-scale"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating } from "formatters/rating"
import { Hopper } from "models/Hopper"
import { styled } from "theme"

type HopperRowProps = {
    hopper: Hopper
    index: number
}

export default function HopperRow(props: HopperRowProps) {
    const { hopper, index } = props

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
            <StyledRatingCell even={index % 2 === 0}>
                {formatRating(hopper.rating.pond)}
            </StyledRatingCell>
            <StyledRatingCell even={index % 2 === 0}>
                {formatRating(hopper.rating.stream)}
            </StyledRatingCell>
            <StyledRatingCell even={index % 2 === 0}>
                {formatRating(hopper.rating.swamp)}
            </StyledRatingCell>
            <StyledRatingCell even={index % 2 === 0}>
                {formatRating(hopper.rating.river)}
            </StyledRatingCell>
            <StyledRatingCell even={index % 2 === 0}>
                {formatRating(hopper.rating.forest)}
            </StyledRatingCell>
            <StyledRatingCell even={index % 2 === 0}>
                {formatRating(hopper.rating.greatLake)}
            </StyledRatingCell>
            <TableCell>
                <Center>
                    <MarketIndicator onMarket={hopper.listing.active} />
                </Center>
            </TableCell>
            <TableCell>{formatCurrency(hopper.listing.price, Currency.AVAX)}</TableCell>
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
    textAlign: "center",
    padding: "0.5rem 0",
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

import { Currency, formatCurrency } from "formatters/currency"
import { Hopper } from "models/Hopper"
import { useMemo } from "react"
import { styled } from "theme"

type FloorPriceProps = {
    hoppers: Hopper[]
}

export default function FloorPrice(props: FloorPriceProps) {
    const { hoppers } = props

    const min = useMemo(() => {
        const prices: number[] = []

        for (let i = 0; i < hoppers.length; i++) {
            const hopper = hoppers[i]
            if (hopper.listing.active) {
                prices.push(hopper.listing.price)
            }
        }

        return Math.min(...prices)
    }, [hoppers])

    return (
        <Container>
            <StyledLabel>Floor price</StyledLabel>
            <StyledValue>{formatCurrency(min, Currency.AVAX)}</StyledValue>
        </Container>
    )
}

const Container = styled("div", {})
const StyledLabel = styled("h4", {
    fontSize: "1rem",
    color: "$gray11",
    lineHeight: 1.25,
    fontWeight: 400,
})
const StyledValue = styled("h3", {
    fontSize: "2rem",
    lineHeight: 1.5,
    color: "$gray12",
    fontWeight: 500,
})

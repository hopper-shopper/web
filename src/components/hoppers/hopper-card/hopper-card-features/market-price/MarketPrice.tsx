import { useHopperContext } from "contests/HopperContext"
import { Currency, formatCurrency } from "formatters/currency"
import { styled } from "theme"
import * as Feature from "../HopperCardFeature"

export default function MarketPrice() {
    const { hopper } = useHopperContext()

    return (
        <Feature.Root>
            <Feature.Title>Market Price</Feature.Title>
            <StyledPrice>
                {hopper.price > 0 ? formatCurrency(hopper.price, Currency.AVAX) : "Not on market"}
            </StyledPrice>
        </Feature.Root>
    )
}

const StyledPrice = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
})

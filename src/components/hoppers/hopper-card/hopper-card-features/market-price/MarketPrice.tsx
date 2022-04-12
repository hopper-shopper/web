import { Currency, formatCurrency } from "formatters/currency"
import { styled } from "theme"
import { useHopperCardContext } from "../../HopperCardContext"
import * as Feature from "../HopperCardFeature"

export default function MarketPrice() {
    const { hopper } = useHopperCardContext()

    return (
        <Feature.Root>
            <Feature.Title>Market Price</Feature.Title>
            <StyledPrice>
                {hopper.listing.active
                    ? formatCurrency(hopper.listing.price, Currency.AVAX)
                    : "Not on market"}
            </StyledPrice>
        </Feature.Root>
    )
}

const StyledPrice = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
})
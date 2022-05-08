import { useHopperContext } from "contexts/HopperContext"
import { Currency, formatCurrency } from "formatters/currency"
import { Listing } from "models/Listing"
import { SortListingBy, sortListings } from "sorters/listings"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import * as Features from "../HopperCardFeature"

type BoughtForProps = {
    listings: Listing[]
}

export default function BoughtFor(props: BoughtForProps) {
    const { hopper } = useHopperContext()
    const { listings } = props

    const boughtForPrice = ((): number => {
        if (listings.length === 0) {
            return 1.75
        }

        const listingsByHopper = sortListings(
            listings.filter(listing => listing.tokenId === hopper.tokenId),
            {
                by: SortListingBy.TIMESTAMP,
                direction: SortDirection.DESC,
            },
        )
        const latestPrice = listingsByHopper[0]?.price ?? 1.75

        return latestPrice
    })()

    return (
        <Features.Root>
            <Features.Title>Bought for</Features.Title>
            <StyledPrice>{formatCurrency(boughtForPrice, Currency.AVAX)}</StyledPrice>
        </Features.Root>
    )
}

const StyledPrice = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
})

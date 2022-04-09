import { Currency, formatCurrency } from "formatters/currency"
import { Hopper } from "models/Hopper"
import { Listing } from "models/Listing"
import { SortListingBy, sortListings } from "sorters/listings"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"

type BoughtForProps = {
    hopper: Hopper
    listings: Listing[]
}

export default function BoughtFor(props: BoughtForProps) {
    const { hopper, listings } = props

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

    return <StyledPrice>{formatCurrency(boughtForPrice, Currency.AVAX)}</StyledPrice>
}

const StyledPrice = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
})

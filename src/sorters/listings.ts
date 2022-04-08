import { Listing } from "models/Listing"
import { SortDirection, SortOptions } from "./_common"

export enum SortListingBy {
    TIMESTAMP = "TIMESTAMP",
}

export type ListingSortOptions = SortOptions<SortListingBy>

export function sortListings(listings: Listing[], options: ListingSortOptions): Listing[] {
    const { by, direction } = options

    let sorted: Listing[] = [...listings]

    switch (by) {
        case SortListingBy.TIMESTAMP:
            sorted = sortByTimestamp(listings)
            break
    }

    switch (direction) {
        case SortDirection.ASC:
            return sorted
        case SortDirection.DESC:
            return sorted.reverse()
    }
}

function sortByTimestamp(listings: Listing[]): Listing[] {
    return [...listings].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
}

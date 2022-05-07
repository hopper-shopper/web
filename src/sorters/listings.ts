import { Listing } from "models/Listing"
import { applySortDirection, Sorter, SortOptions } from "./_common"

export enum SortListingBy {
    TIMESTAMP = "TIMESTAMP",
}

const SORT_MAPPING: Record<SortListingBy, Sorter<Listing>> = {
    [SortListingBy.TIMESTAMP]: sortByTimestamp,
}

export type ListingSortOptions = SortOptions<SortListingBy>

export function sortListings(listings: Listing[], options: ListingSortOptions): Listing[] {
    const { by, direction } = options

    const sorted = SORT_MAPPING[by]([...listings])

    return applySortDirection(sorted, direction)
}

function sortByTimestamp(listings: Listing[]): Listing[] {
    return [...listings].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
}

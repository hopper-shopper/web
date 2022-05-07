import { FlySupply } from "models/FlySupply"
import { applySortDirection, Sorter, SortOptions } from "./_common"

export enum SortFlySupplyBy {
    DATE = "DATE",
}

const SORT_MAPPING: Record<SortFlySupplyBy, Sorter<FlySupply>> = {
    [SortFlySupplyBy.DATE]: sortByDate,
}

export type FlySupplySortOptions = SortOptions<SortFlySupplyBy>

export function sortFlySupply(flySupply: FlySupply[], options: FlySupplySortOptions): FlySupply[] {
    const { by, direction } = options

    const sorted = SORT_MAPPING[by]([...flySupply])

    return applySortDirection(sorted, direction)
}

function sortByDate(flySupply: FlySupply[]): FlySupply[] {
    return [...flySupply].sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
    })
}

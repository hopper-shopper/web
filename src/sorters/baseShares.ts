import { BaseShare } from "models/BaseShare"
import { SortDirection, SortOptions } from "./_common"

export enum SortBaseShareBy {
    BASE_SHARE = "BASE_SHARE",
    DATETIME = "DATETIME",
}

export type BaseShareSortOptions = SortOptions<SortBaseShareBy>

export function sortBaseShares(
    baseShares: BaseShare[],
    options: BaseShareSortOptions,
): BaseShare[] {
    const { by, direction } = options

    let sorted = [...baseShares]

    switch (by) {
        case SortBaseShareBy.BASE_SHARE:
            sorted = sortByBaseShare(baseShares)
            break
        case SortBaseShareBy.DATETIME:
            sorted = sortByDatetime(baseShares)
            break
    }

    switch (direction) {
        case SortDirection.ASC:
            return sorted
        case SortDirection.DESC:
            return sorted.reverse()
    }
}

function sortByBaseShare(baseShares: BaseShare[]): BaseShare[] {
    return [...baseShares].sort((a, b) => a.baseShares - b.baseShares)
}
function sortByDatetime(baseShares: BaseShare[]): BaseShare[] {
    return [...baseShares].sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime))
}

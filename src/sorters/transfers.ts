import { Transfer } from "models/Transfer"
import { applySortDirection, Sorter, SortOptions } from "./_common"

export enum SortTransferBy {
    TIMESTAMP = "TIMESTAMP",
}

const SORT_MAPPING: Record<SortTransferBy, Sorter<Transfer>> = {
    [SortTransferBy.TIMESTAMP]: sortByTimestamp,
}

export type TransferSortOptions = SortOptions<SortTransferBy>

export function sortTransfers(transfers: Transfer[], options: TransferSortOptions): Transfer[] {
    const { by, direction } = options

    const sorted = SORT_MAPPING[by]([...transfers])

    return applySortDirection(sorted, direction)
}

function sortByTimestamp(transfers: Transfer[]): Transfer[] {
    return [...transfers].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
}

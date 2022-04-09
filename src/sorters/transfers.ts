import { Transfer } from "models/Transfer"
import { SortDirection, SortOptions } from "./_common"

export enum SortTransferBy {
    TIMESTAMP = "TIMESTAMP",
}

export type TransferSortOptions = SortOptions<SortTransferBy>

export function sortTransfers(transfers: Transfer[], options: TransferSortOptions): Transfer[] {
    const { by, direction } = options

    let sorted: Transfer[] = [...transfers]

    switch (by) {
        case SortTransferBy.TIMESTAMP:
            sorted = sortByTimestamp(transfers)
            break
    }

    switch (direction) {
        case SortDirection.ASC:
            return sorted
        case SortDirection.DESC:
            return sorted.reverse()
    }
}

function sortByTimestamp(transfers: Transfer[]): Transfer[] {
    return [...transfers].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
}

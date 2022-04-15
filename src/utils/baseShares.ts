import { BaseShare } from "models/BaseShare"
import { SortBaseShareBy, sortBaseShares } from "sorters/baseShares"
import { SortDirection } from "sorters/_common"
import { avg } from "./numbers"

export function getBaseSharesChange(history: BaseShare[]): number {
    if (history.length === 0) {
        return 0
    }

    const sorted = sortBaseShares(history, {
        by: SortBaseShareBy.DATETIME,
        direction: SortDirection.DESC,
    })

    const changes: number[] = []
    for (let index = 0; index < sorted.length; index++) {
        const current = sorted[index]
        const previous = index > 0 ? sorted[index - 1] : current

        const change = current.baseShares / previous.baseShares - 1
        changes.push(change)
    }

    return avg(changes)
}

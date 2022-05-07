import { endOfDay, isWithinInterval, startOfDay, subDays } from "date-fns"
import useSort from "hooks/useSort"
import { Transfer } from "models/Transfer"
import { useMemo } from "react"
import { SortTransferBy, sortTransfers } from "sorters/transfers"
import { SortDirection } from "sorters/_common"
import { Adventure } from "utils/adventures"
import { toIsoDate } from "utils/date"
import { getAdventureForTransfer } from "utils/transfer"
import { IsoDate } from "utils/types"

type UseClaimedChartDataOptions = {
    days: number
}

export default function useClaimedChartData(
    transfers: Transfer[],
    options: UseClaimedChartDataOptions,
): ClaimedChartData[] {
    const { days } = options

    const { sorted: sortedTransfers } = useSort({
        collection: transfers,
        sorter: sortTransfers,
        initial: {
            by: SortTransferBy.TIMESTAMP,
            direction: SortDirection.ASC,
        },
    })

    const data: ClaimedChartData[] = useMemo(() => {
        const data: ClaimedChartData[] = []

        for (let i = 1; i <= days; i++) {
            const pointerStart = startOfDay(subDays(new Date(), days - i))
            const pointerEnd = endOfDay(pointerStart)

            const dayTransfers = transfers.filter(transfer => {
                const date = Date.parse(transfer.timestamp)
                return isWithinInterval(date, {
                    start: pointerStart,
                    end: pointerEnd,
                })
            })

            data.push({
                date: toIsoDate(pointerStart),
                claimedPond: sumClaimed(filterByAdventure(Adventure.POND, dayTransfers)),
                claimedStream: sumClaimed(filterByAdventure(Adventure.STREAM, dayTransfers)),
                claimedSwamp: sumClaimed(filterByAdventure(Adventure.SWAMP, dayTransfers)),
                claimedRiver: sumClaimed(filterByAdventure(Adventure.RIVER, dayTransfers)),
                claimedForest: sumClaimed(filterByAdventure(Adventure.FOREST, dayTransfers)),
                claimedGreatLake: sumClaimed(filterByAdventure(Adventure.GREAT_LAKE, dayTransfers)),
            })
        }

        return data
    }, [sortedTransfers, days])

    return data
}

// Types
export type ClaimedChartData = {
    date: IsoDate
    claimedPond: number
    claimedStream: number
    claimedSwamp: number
    claimedRiver: number
    claimedForest: number
    claimedGreatLake: number
}

function filterByAdventure(adventure: Adventure, transfers: Transfer[]): Transfer[] {
    return transfers.filter(transfer => {
        const transferAdventure = getAdventureForTransfer(transfer)
        if (!transferAdventure) {
            return false
        }

        return transferAdventure === adventure
    })
}
function sumClaimed(transfers: Transfer[]): number {
    return transfers.reduce((acc, cur) => acc + cur.amount, 0)
}

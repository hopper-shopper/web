import { addDays, setHours } from "date-fns"
import useSort from "hooks/useSort"
import { FlySupply } from "models/FlySupply"
import { useMemo } from "react"
import { sortFlySupply, SortFlySupplyBy } from "sorters/fly-supply"
import { SortDirection } from "sorters/_common"
import { fromIsoDate } from "utils/date"

export default function useFlySupplyChartData(supplies: FlySupply[]): FlySupplyChartData[] {
    const { sorted: sortedSupplies } = useSort({
        collection: supplies,
        sorter: sortFlySupply,
        initial: {
            by: SortFlySupplyBy.DATE,
            direction: SortDirection.ASC,
        },
    })

    const data: FlySupplyChartData[] = useMemo(() => {
        const data: FlySupplyChartData[] = []

        for (const snapshot of sortedSupplies) {
            data.push({
                date: setHours(fromIsoDate(snapshot.date), 12),
                minted: snapshot.minted,
                burned: snapshot.burned,
                staked: snapshot.staked,
                circulating: snapshot.circulating,
                free: snapshot.free,
            })
        }

        if (data.length > 0) {
            const lastItem = data[data.length - 1]
            data.push({
                ...lastItem,
                date: addDays(lastItem.date, 1),
            })
        }

        return data
    }, [sortedSupplies])

    return data
}

export type FlySupplyChartData = {
    date: Date
    minted: number
    burned: number
    circulating: number
    staked: number
    free: number
}

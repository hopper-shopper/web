import { addDays, setHours } from "date-fns"
import useSort from "hooks/useSort"
import { FlySupply } from "models/FlySupply"
import { useMemo } from "react"
import { sortFlySupply, SortFlySupplyBy } from "sorters/fly-supply"
import { SortDirection } from "sorters/_common"
import { fromIsoDate } from "utils/date"
import { IsoDate, IsoDatetime } from "utils/types"

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
                total: snapshot.supply,
                burned: snapshot.burned,
                staked: snapshot.staked,
                available: snapshot.available,
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
    total: number
    burned: number
    staked: number
    available: number
    free: number
}

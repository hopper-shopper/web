import { HoppersFilter, AdventureFilter, PermitFilter, MarketFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import ConfigureHoppersTable, {
    HoppersTableConfiguration,
} from "components/hoppers/hoppers-table/configure-hoppers-table/ConfigureHoppersTable"
import FloorPrice from "components/hoppers/hoppers-table/floor-price/FloorPrice"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import { getHoppersAdventureFilter, getHoppersRatingFilter } from "filters/hoppers"
import { NumberComparison } from "filters/_common"
import useFilter, { UseFilterPipeline } from "hooks/useFilter"
import useSort, { SortContext } from "hooks/useSort"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import { sortHoppers, SortHopperBy } from "sorters/hoppers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { Adventure } from "utils/adventures"

export default function StorePage() {
    const [hoppersFilter, setHoppersFilter] = useState<Required<HoppersFilter>>({
        adventure: AdventureFilter.ANY,
        permit: PermitFilter.ANY,
        market: MarketFilter.ON,
        tokenIds: [],
        owner: "",
    })
    const { hoppers } = useHoppers(hoppersFilter)

    const [config, setConfig] = useState<HoppersTableConfiguration>({
        permit: Adventure.RIVER,
        ratingGe: 0,
        fertility: false,
    })
    const updateConfig = (config: Partial<HoppersTableConfiguration>) => {
        setConfig(prev => ({
            ...prev,
            ...config,
        }))
    }

    const hopperFilters: UseFilterPipeline<Hopper> = (() => {
        if (config.permit !== null) {
            return [
                getHoppersAdventureFilter(config.permit),
                getHoppersRatingFilter(config.permit, NumberComparison.GE, config.ratingGe),
            ]
        }

        return []
    })()
    const filteredHoppers = useFilter(hopperFilters, hoppers)

    const {
        sorted: sortedHoppers,
        setBy: setSortBy,
        by: sortBy,
        direction: sortDirection,
    } = useSort({
        collection: filteredHoppers,
        sorter: sortHoppers,
        initial: {
            by: SortHopperBy.TOKEN_ID,
            direction: SortDirection.ASC,
        },
    })

    return (
        <>
            <Filter>
                <ConfigureHoppersTable configuration={config} onChange={updateConfig} />
                <FloorPrice hoppers={filteredHoppers} />
            </Filter>

            <SortContext.Provider
                value={{ active: sortBy, direction: sortDirection, update: setSortBy }}>
                <HoppersTable config={config} hoppers={sortedHoppers} />
            </SortContext.Provider>
        </>
    )
}

const Filter = styled("div", {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
})

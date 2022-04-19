import { AdventureFilter, HoppersFilter, MarketFilter, PermitFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import FloorPrice from "components/hoppers/hoppers-table/floor-price/FloorPrice"
import HoppersTableConfiguration, {
    ALL_HOPPER_TABLE_COLUMNS,
    HoppersTableConfig,
} from "components/hoppers/hoppers-table/hoppers-table-configuration/HoppersTableConfiguration"
import HoppersTableFilter, {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "components/hoppers/hoppers-table/hoppers-table-filter/HoppersTableFilter"
import useHoppersTableFilter from "components/hoppers/hoppers-table/hoppers-table-filter/useHoppersTableFilter"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import {
    getHoppersFertilityFilter,
    getHoppersPermitFilter,
    getHoppersRatingFilter,
} from "filters/hoppers"
import { NumberComparison } from "filters/_common"
import useFilter, { UseFilterPipeline } from "hooks/useFilter"
import useSort, { SortContext } from "hooks/useSort"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import { SortHopperBy, sortHoppers } from "sorters/hoppers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"

export default function MarketPage() {
    const { hoppers } = useHoppers(HOPPERS_FILTER)

    const [filter, setFilter] = useHoppersTableFilter(DEFAULT_TABLE_FILTER)
    const [config, setConfig] = useState(DEFAULT_TABLE_CONFIG)

    const hopperFilters: UseFilterPipeline<Hopper> = (() => {
        if (filter.type === HoppersTableConfigFilters.PERMIT) {
            return [
                getHoppersPermitFilter(filter.permit),
                getHoppersRatingFilter(filter.permit, NumberComparison.GE, filter.ratingGe),
            ]
        } else if (filter.type === HoppersTableConfigFilters.FERTILITY) {
            return [getHoppersFertilityFilter(NumberComparison.GE, filter.fertilityGe)]
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
                <HoppersTableFilter filter={filter} onChange={setFilter} />
                <FloorPrice hoppers={filteredHoppers} />
            </Filter>

            <Config>
                <HoppersTableConfiguration config={config} onChange={setConfig} />
            </Config>

            <SortContext.Provider
                value={{ active: sortBy, direction: sortDirection, update: setSortBy }}>
                <HoppersTable filter={filter} config={config} hoppers={sortedHoppers} />
            </SortContext.Provider>
        </>
    )
}

// Constants
const HOPPERS_FILTER: Required<HoppersFilter> = {
    adventure: AdventureFilter.ANY,
    permit: PermitFilter.ANY,
    market: MarketFilter.ON,
    tokenIds: [],
    owner: "",
}
const DEFAULT_TABLE_FILTER: HoppersTableAnyFilter = {
    type: HoppersTableConfigFilters.NONE,
}

const DEFAULT_TABLE_CONFIG: HoppersTableConfig = {
    columns: ALL_HOPPER_TABLE_COLUMNS,
}

// Components
const Filter = styled("div", {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
})
const Config = styled("div", {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
})

import { AdventureFilter, HoppersFilter, MarketFilter, PermitFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import ConfigureHoppersTable, {
    HoppersTableConfigFilters,
    HoppersTableConfiguration,
} from "components/hoppers/hoppers-table/configure-hoppers-table/ConfigureHoppersTable"
import useHoppersTableConfiguration from "components/hoppers/hoppers-table/configure-hoppers-table/useHoppersTableConfiguration"
import FloorPrice from "components/hoppers/hoppers-table/floor-price/FloorPrice"
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
import { SortHopperBy, sortHoppers } from "sorters/hoppers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"

export default function MarketPage() {
    const { hoppers } = useHoppers(HOPPERS_FILTER)

    const [configState, setConfig] = useHoppersTableConfiguration(DEFAULT_TABLE_CONFIGURATION)
    const config = configState as HoppersTableConfiguration

    const hopperFilters: UseFilterPipeline<Hopper> = (() => {
        if (config.type === HoppersTableConfigFilters.PERMIT) {
            return [
                getHoppersPermitFilter(config.permit),
                getHoppersRatingFilter(config.permit, NumberComparison.GE, config.ratingGe),
            ]
        } else if (config.type === HoppersTableConfigFilters.FERTILITY) {
            return [getHoppersFertilityFilter(NumberComparison.GE, config.fertilityGe)]
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
                <ConfigureHoppersTable configuration={config} onChange={setConfig} />
                <FloorPrice hoppers={filteredHoppers} />
            </Filter>

            <SortContext.Provider
                value={{ active: sortBy, direction: sortDirection, update: setSortBy }}>
                <HoppersTable config={config} hoppers={sortedHoppers} />
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
const DEFAULT_TABLE_CONFIGURATION: HoppersTableConfiguration = {
    type: HoppersTableConfigFilters.NONE,
}

// Components
const Filter = styled("div", {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
})

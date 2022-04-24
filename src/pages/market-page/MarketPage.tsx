import { AdventureFilter, HoppersFilter, MarketFilter, PermitFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import FloorPrice from "components/hoppers/hoppers-table/floor-price/FloorPrice"
import HoppersTableFilter, {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "components/hoppers/hoppers-table/hoppers-table-filter/HoppersTableFilter"
import useHoppersTableFilter from "components/hoppers/hoppers-table/hoppers-table-filter/useHoppersTableFilter"
import HoppersTableSortSelect from "components/hoppers/hoppers-table/hoppers-table-sort-select/HoppersTableSortSelect"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Label from "components/inputs/label/Label"
import Screen from "components/layout/screen/Screen"
import MarketHelpDialog from "components/market/market-help-dialog/MarketHelpDialog"
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

    const [filter, setFilter] = useHoppersTableFilter(DEFAULT_TABLE_FILTER)

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
        setDirection: setSortDirection,
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

            <HelpContainer>
                <MarketHelpDialog />
            </HelpContainer>

            <Screen bp="xl" constraint="max">
                <Fieldset css={{ marginBottom: "2rem" }}>
                    <Label htmlFor="sort">Sort Hoppers by</Label>
                    <HoppersTableSortSelect
                        id="sort"
                        filter={filter}
                        active={sortBy}
                        direction={sortDirection}
                        onChange={(sortBy, direction) => {
                            setSortBy(sortBy)
                            setSortDirection(direction)
                        }}
                    />
                </Fieldset>
            </Screen>

            <SortContext.Provider
                value={{ active: sortBy, direction: sortDirection, update: setSortBy }}>
                <HoppersTable filter={filter} hoppers={sortedHoppers} />
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

// Components
const Filter = styled("div", {
    marginBottom: "2rem",
    display: "grid",
    rowGap: "3rem",
    "@lg": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
})
const HelpContainer = styled("div", {
    display: "flex",
    marginBottom: "1rem",
    "@md": {
        justifyContent: "flex-end",
    },
})

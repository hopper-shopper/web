import { HoppersFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import SortableTableHeader, {
    StyledTableHeader,
} from "components/sorting/sortable-table-header/SortableTableHeader"
import { getHoppersAdventureFilter, getHoppersRatingFilter } from "filters/hoppers"
import { NumberComparison } from "filters/_common"
import useFilter, { UseFilterPipeline } from "hooks/useFilter"
import useSort, { SortContext } from "hooks/useSort"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import { TableVirtuoso } from "react-virtuoso"
import { SortHopperBy, sortHoppers } from "sorters/hoppers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { Adventure } from "utils/adventures"
import ConfigureHoppersTable, {
    HoppersTableConfiguration,
} from "./configure-hoppers-table/ConfigureHoppersTable"
import FloorPrice from "./floor-price/FloorPrice"
import HopperRow from "./hopper-row/HopperRow"

type HoppersTableProps = {
    filter: HoppersFilter
}

export default function HoppersTable(props: HoppersTableProps) {
    const { filter } = props

    const { hoppers } = useHoppers(filter)
    const [config, setConfig] = useState<HoppersTableConfiguration>({
        permit: Adventure.RIVER,
        ratingGe: 0,
        fertility: false,
    })

    const { permit: adventure, ratingGe, fertility } = config
    const hopperFilters: UseFilterPipeline<Hopper> = (() => {
        if (adventure !== null) {
            return [
                getHoppersAdventureFilter(adventure),
                getHoppersRatingFilter(adventure, NumberComparison.GE, ratingGe),
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

    const updateConfig = (config: Partial<HoppersTableConfiguration>) => {
        setConfig(prev => ({
            ...prev,
            ...config,
        }))
    }

    return (
        <>
            <TableHeader>
                <ConfigureHoppersTable configuration={config} onChange={updateConfig} />
                <FloorPrice hoppers={filteredHoppers} />
            </TableHeader>

            <TableVirtuoso
                useWindowScroll
                data={sortedHoppers}
                totalCount={sortedHoppers.length}
                components={{
                    Table: ({ style, ...props }) => <StyledTable {...props} style={style} />,
                    TableRow: props => (
                        <StyledTableRow even={props["data-index"] % 2 === 0} {...props} />
                    ),
                }}
                fixedHeaderContent={() => {
                    return (
                        <SortContext.Provider
                            value={{ active: sortBy, direction: sortDirection, update: setSortBy }}>
                            <tr>
                                <TableHeaderCell css={{ width: 90 }}>Image</TableHeaderCell>
                                <SortableTableHeader
                                    css={{ width: 120 }}
                                    sortBy={SortHopperBy.TOKEN_ID}>
                                    Token-Id
                                </SortableTableHeader>
                                <SortableTableHeader
                                    css={{ width: 100 }}
                                    sortBy={SortHopperBy.LEVEL}>
                                    Level
                                </SortableTableHeader>
                                <SortableTableHeader
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.STRENGTH}>
                                    Strength
                                </SortableTableHeader>
                                <SortableTableHeader
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.AGILITY}>
                                    Agility
                                </SortableTableHeader>
                                <SortableTableHeader
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.VITALITY}>
                                    Vitality
                                </SortableTableHeader>
                                <SortableTableHeader
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.INTELLIGENCE}>
                                    Intelligence
                                </SortableTableHeader>
                                <SortableTableHeader
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.FERTILITY}>
                                    Fertility
                                </SortableTableHeader>
                                {config.permit && (
                                    <SortableTableHeader sortBy={RatingSortPreset[config.permit]}>
                                        Rating
                                    </SortableTableHeader>
                                )}
                                <SortableTableHeader align="right" sortBy={SortHopperBy.PRICE}>
                                    Price
                                </SortableTableHeader>
                                <SortableTableHeader
                                    align="right"
                                    sortBy={SortHopperBy.LEVEL_COSTS}>
                                    Level costs
                                </SortableTableHeader>
                                {config.permit && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={MaxPriceSortPreset[config.permit]}>
                                        Max. Price
                                    </SortableTableHeader>
                                )}

                                {config.permit && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={BaseFlySortPreset[config.permit]}>
                                        Base Fly
                                    </SortableTableHeader>
                                )}

                                {config.fertility && (
                                    <>
                                        <SortableTableHeader
                                            align="right"
                                            sortBy={SortHopperBy.MAX_PRICE_FERTILITY}>
                                            Max. Price Fertility
                                        </SortableTableHeader>
                                        <TableHeaderCell css={{ textAlign: "right" }}>
                                            Cost 50 % chance
                                        </TableHeaderCell>
                                    </>
                                )}
                            </tr>
                        </SortContext.Provider>
                    )
                }}
                itemContent={(index, hopper) => (
                    <HopperRow index={index} hopper={hopper} config={config} />
                )}
            />
        </>
    )
}

// Styles
const TableHeader = styled("div", {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
})
const StyledTable = styled("table", {
    width: "100%",
    borderSpacing: 0,
    color: "$gray12",
    tableLayout: "fixed",
    "& thead tr th:first-child": {
        borderTopLeftRadius: "0.5rem",
        borderLeft: "1px solid $gray6",
    },
    "& thead tr th:last-child": {
        borderTopRightRadius: "0.5rem",
        borderRight: "1px solid $gray6",
    },
    "& thead tr th": {
        borderTop: "1px solid $gray6",
        borderBottom: "1px solid $gray6",
    },
    "& tbody tr td:first-child": {
        borderLeft: "1px solid $gray6",
    },
    "& tbody tr td:last-child": {
        borderRight: "1px solid $gray6",
    },
})
const TableHeaderCell = styled("th", {
    color: "$gray11",
    fontWeight: 500,
    backgroundColor: "$gray3",
    padding: "0.5rem 1rem",
    cursor: "default",
})
const StyledTableRow = styled("tr", {
    variants: {
        even: {
            true: {
                backgroundColor: "$gray2",
            },
            false: {
                backgroundColor: "$gray1",
            },
        },
    },
})

// Sort presets
type SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy
    [Adventure.STREAM]: SortHopperBy
    [Adventure.SWAMP]: SortHopperBy
    [Adventure.RIVER]: SortHopperBy
    [Adventure.FOREST]: SortHopperBy
    [Adventure.GREAT_LAKE]: SortHopperBy
}

const RatingSortPreset: SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy.RATING_POND,
    [Adventure.STREAM]: SortHopperBy.RATING_STREAM,
    [Adventure.SWAMP]: SortHopperBy.RATING_SWAMP,
    [Adventure.RIVER]: SortHopperBy.RATING_RIVER,
    [Adventure.FOREST]: SortHopperBy.RATING_FOREST,
    [Adventure.GREAT_LAKE]: SortHopperBy.RATING_GREAT_LAKE,
}
const MaxPriceSortPreset: SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy.MAX_PRICE_POND,
    [Adventure.STREAM]: SortHopperBy.MAX_PRICE_STREAM,
    [Adventure.SWAMP]: SortHopperBy.MAX_PRICE_SWAMP,
    [Adventure.RIVER]: SortHopperBy.MAX_PRICE_RIVER,
    [Adventure.FOREST]: SortHopperBy.MAX_PRICE_FOREST,
    [Adventure.GREAT_LAKE]: SortHopperBy.MAX_PRICE_GREAT_LAKE,
}
const BaseFlySortPreset: SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy.BASE_FLY_POND,
    [Adventure.STREAM]: SortHopperBy.BASE_FLY_STREAM,
    [Adventure.SWAMP]: SortHopperBy.BASE_FLY_SWAMP,
    [Adventure.RIVER]: SortHopperBy.BASE_FLY_RIVER,
    [Adventure.FOREST]: SortHopperBy.BASE_FLY_FOREST,
    [Adventure.GREAT_LAKE]: SortHopperBy.BASE_FLY_GREAT_LAKE,
}

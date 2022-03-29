import { HoppersFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import SortableTableHeader from "components/sorting/sortable-table-header/SortableTableHeader"
import { getHoppersAdventureFilter, getHoppersRatingFilter } from "filters/hoppers"
import { NumberComparison } from "filters/_common"
import useFilter from "hooks/useFilter"
import useSort, { SortContext } from "hooks/useSort"
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
        adventure: Adventure.RIVER,
        ratingGe: 0,
    })

    const filteredHoppers = useFilter(
        [
            getHoppersAdventureFilter(config.adventure),
            getHoppersRatingFilter(config.adventure, NumberComparison.GE, config.ratingGe),
        ],
        hoppers,
    )
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

    const baseFlySorting = ((): SortHopperBy => {
        switch (config.adventure) {
            case Adventure.POND:
                return SortHopperBy.BASE_FLY_POND
            case Adventure.STREAM:
                return SortHopperBy.BASE_FLY_STREAM
            case Adventure.SWAMP:
                return SortHopperBy.BASE_FLY_SWAMP
            case Adventure.RIVER:
                return SortHopperBy.BASE_FLY_RIVER
            case Adventure.FOREST:
                return SortHopperBy.BASE_FLY_FOREST
            case Adventure.GREAT_LAKE:
                return SortHopperBy.BASE_FLY_GREAT_LAKE
        }
    })()

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
                                <StyledTableHeader css={{ width: 90 }}>Image</StyledTableHeader>
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
                                {config.adventure === Adventure.POND && (
                                    <SortableTableHeader sortBy={SortHopperBy.RATING_POND}>
                                        Rating Pond
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.STREAM && (
                                    <SortableTableHeader sortBy={SortHopperBy.RATING_STREAM}>
                                        Rating Stream
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.SWAMP && (
                                    <SortableTableHeader sortBy={SortHopperBy.RATING_SWAMP}>
                                        Rating Swamp
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.RIVER && (
                                    <SortableTableHeader sortBy={SortHopperBy.RATING_RIVER}>
                                        Rating River
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.FOREST && (
                                    <SortableTableHeader sortBy={SortHopperBy.RATING_FOREST}>
                                        Rating Forest
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.GREAT_LAKE && (
                                    <SortableTableHeader sortBy={SortHopperBy.RATING_GREAT_LAKE}>
                                        Rating Great Lake
                                    </SortableTableHeader>
                                )}
                                <SortableTableHeader align="right" sortBy={SortHopperBy.PRICE}>
                                    Price
                                </SortableTableHeader>
                                {config.adventure === Adventure.POND && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_POND}>
                                        Max. Price Pond
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.STREAM && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_STREAM}>
                                        Max. Price Stream
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.SWAMP && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_SWAMP}>
                                        Max. Price Swamp
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.RIVER && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_RIVER}>
                                        Max. Price River
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.FOREST && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_FOREST}>
                                        Max. Price Forest
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.GREAT_LAKE && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_GREAT_LAKE}>
                                        Max. Price Great Lake
                                    </SortableTableHeader>
                                )}

                                <SortableTableHeader align="right" sortBy={baseFlySorting}>
                                    Base Fly
                                </SortableTableHeader>
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
const StyledTableHeader = styled("th", {
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

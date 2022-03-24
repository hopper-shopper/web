import { HoppersFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import SortableTableHeader from "components/sorting/sortable-table-header/SortableTableHeader"
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
import HopperRow from "./hopper-row/HopperRow"

type HoppersTableProps = {
    filter: HoppersFilter
}

export default function HoppersTable(props: HoppersTableProps) {
    const { filter } = props

    const { hoppers } = useHoppers(filter)
    const [config, setConfig] = useState<HoppersTableConfiguration>({
        adventure: Adventure.RIVER,
    })

    const {
        sorted: sortedHoppers,
        setBy: setSortBy,
        by: sortBy,
        direction: sortDirection,
    } = useSort({
        collection: hoppers,
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
            <ConfigurationContainer>
                <ConfigureHoppersTable configuration={config} onChange={updateConfig} />
            </ConfigurationContainer>

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

                                {config.adventure === Adventure.POND && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.PRICE_MULTIPLIER_POND}>
                                        Multiplier Pond
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.STREAM && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.PRICE_MULTIPLIER_STREAM}>
                                        Multiplier Stream
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.SWAMP && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.PRICE_MULTIPLIER_SWAMP}>
                                        Multiplier Swamp
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.RIVER && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.PRICE_MULTIPLIER_RIVER}>
                                        Multiplier River
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.FOREST && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.PRICE_MULTIPLIER_FOREST}>
                                        Multiplier Forest
                                    </SortableTableHeader>
                                )}
                                {config.adventure === Adventure.GREAT_LAKE && (
                                    <SortableTableHeader
                                        align="right"
                                        sortBy={SortHopperBy.PRICE_MULTIPLIER_GREAT_LAKE}>
                                        Multiplier Great Lake
                                    </SortableTableHeader>
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
const ConfigurationContainer = styled("div", {
    marginBottom: "2rem",
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

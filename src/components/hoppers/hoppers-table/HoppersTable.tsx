import SortableTableHeader from "components/sorting/sortable-table-header/SortableTableHeader"
import { Hopper } from "models/Hopper"
import { TableVirtuoso } from "react-virtuoso"
import { SortHopperBy } from "sorters/hoppers"
import { styled } from "theme"
import { Adventure } from "utils/adventures"
import { HoppersTableConfiguration } from "./configure-hoppers-table/ConfigureHoppersTable"
import HopperRow from "./hopper-row/HopperRow"

type HoppersTableProps = {
    config: HoppersTableConfiguration
    hoppers: Hopper[]
}

export default function HoppersTable(props: HoppersTableProps) {
    const { config, hoppers } = props

    return (
        <>
            <TableVirtuoso
                useWindowScroll
                data={hoppers}
                totalCount={hoppers.length}
                components={{
                    Table: ({ style, ...props }) => <StyledTable {...props} style={style} />,
                    TableRow: props => (
                        <StyledTableRow even={props["data-index"] % 2 === 0} {...props} />
                    ),
                }}
                fixedHeaderContent={() => {
                    return (
                        <tr>
                            <TableHeaderCell css={{ width: 90 }}>Image</TableHeaderCell>
                            <SortableTableHeader
                                css={{ width: 120 }}
                                sortBy={SortHopperBy.TOKEN_ID}>
                                Token-Id
                            </SortableTableHeader>
                            <SortableTableHeader css={{ width: 100 }} sortBy={SortHopperBy.LEVEL}>
                                Level
                            </SortableTableHeader>
                            <SortableTableHeader
                                css={{ width: 135 }}
                                sortBy={SortHopperBy.STRENGTH}>
                                Strength
                            </SortableTableHeader>
                            <SortableTableHeader css={{ width: 135 }} sortBy={SortHopperBy.AGILITY}>
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
                            <SortableTableHeader align="right" sortBy={SortHopperBy.LEVEL_COSTS}>
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
const StyledTable = styled("table", {
    width: "100%",
    borderSpacing: 0,
    color: "$gray12",
    tableLayout: "fixed",
    paddingBottom: "2rem",
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
    "& tbody tr:last-child td": {
        borderBottom: "1px solid $gray6",
        "&:first-child": {
            borderBottomLeftRadius: "$md",
        },
        "&:last-child": {
            borderBottomRightRadius: "$md",
        },
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

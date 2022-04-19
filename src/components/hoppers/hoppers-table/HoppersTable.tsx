import * as Table from "components/table/Table"
import { Hopper } from "models/Hopper"
import { TableVirtuoso } from "react-virtuoso"
import { SortHopperBy } from "sorters/hoppers"
import { Adventure } from "utils/adventures"
import HopperRow from "./hopper-row/HopperRow"
import {
    HoppersTableColumn,
    HoppersTableConfig,
} from "./hoppers-table-configuration/HoppersTableConfiguration"
import {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "./hoppers-table-filter/HoppersTableFilter"

type HoppersTableProps = {
    filter: HoppersTableAnyFilter
    config: HoppersTableConfig
    hoppers: Hopper[]
}

export default function HoppersTable(props: HoppersTableProps) {
    const { filter, config, hoppers } = props

    return (
        <>
            <TableVirtuoso
                useWindowScroll
                data={hoppers}
                totalCount={hoppers.length}
                components={{
                    Table: ({ style, ...props }) => <Table.Root {...props} style={style} />,
                    TableRow: props => (
                        <Table.Row striped={props["data-index"] % 2 === 1} {...props} />
                    ),
                }}
                fixedHeaderContent={() => {
                    return (
                        <Table.Row>
                            {config.columns.includes(HoppersTableColumn.IMAGE) && (
                                <Table.HeaderCell css={{ width: 90 }}>Image</Table.HeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.HOPPER_ID) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 120 }}
                                    sortBy={SortHopperBy.TOKEN_ID}>
                                    Hopper-ID
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.LEVEL) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 100 }}
                                    sortBy={SortHopperBy.LEVEL}>
                                    Level
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.STRENGTH) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.STRENGTH}>
                                    Strength
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.AGILITY) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.AGILITY}>
                                    Agility
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.VITALITY) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.VITALITY}>
                                    Vitality
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.INTELLIGENCE) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.INTELLIGENCE}>
                                    Intelligence
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.FERTILITY) && (
                                <Table.SortableHeaderCell
                                    css={{ width: 135 }}
                                    sortBy={SortHopperBy.FERTILITY}>
                                    Fertility
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.RATING) &&
                                filter.type === HoppersTableConfigFilters.PERMIT &&
                                filter.permit && (
                                    <Table.SortableHeaderCell
                                        sortBy={RatingSortPreset[filter.permit]}>
                                        Rating
                                    </Table.SortableHeaderCell>
                                )}
                            {config.columns.includes(HoppersTableColumn.PRICE) && (
                                <Table.SortableHeaderCell align="right" sortBy={SortHopperBy.PRICE}>
                                    Price
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.LEVEL_COSTS) && (
                                <Table.SortableHeaderCell
                                    align="right"
                                    sortBy={SortHopperBy.LEVEL_COSTS}>
                                    Level costs
                                </Table.SortableHeaderCell>
                            )}
                            {config.columns.includes(HoppersTableColumn.MAX_PRICE) && (
                                <>
                                    {filter.type === HoppersTableConfigFilters.FERTILITY && (
                                        <Table.SortableHeaderCell
                                            align="right"
                                            sortBy={SortHopperBy.MAX_PRICE_FERTILITY}>
                                            Max. Price Fertility
                                        </Table.SortableHeaderCell>
                                    )}
                                    {filter.type === HoppersTableConfigFilters.PERMIT &&
                                        filter.permit && (
                                            <Table.SortableHeaderCell
                                                align="right"
                                                sortBy={MaxPriceSortPreset[filter.permit]}>
                                                Max. Price
                                            </Table.SortableHeaderCell>
                                        )}
                                </>
                            )}

                            {config.columns.includes(HoppersTableColumn.BASE_FLY) &&
                                filter.type === HoppersTableConfigFilters.PERMIT &&
                                filter.permit && (
                                    <Table.SortableHeaderCell
                                        align="right"
                                        sortBy={BaseFlySortPreset[filter.permit]}>
                                        Base Fly / Level
                                    </Table.SortableHeaderCell>
                                )}

                            {config.columns.includes(HoppersTableColumn.FERTILITY_50) &&
                                filter.type === HoppersTableConfigFilters.FERTILITY && (
                                    <Table.HeaderCell css={{ textAlign: "right" }}>
                                        Cost 50 % chance
                                    </Table.HeaderCell>
                                )}

                            <Table.HeaderCell css={{ width: 80 }} />
                        </Table.Row>
                    )
                }}
                itemContent={(index, hopper) => (
                    <HopperRow
                        key={hopper.tokenId}
                        index={index}
                        hopper={hopper}
                        filter={filter}
                        config={config}
                    />
                )}
            />
        </>
    )
}

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

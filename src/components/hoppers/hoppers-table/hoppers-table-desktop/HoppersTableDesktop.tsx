import * as Table from "components/table/Table"
import { TableVirtuoso } from "react-virtuoso"
import { SortHopperBy } from "sorters/hoppers"
import { HoppersTableConfigFilters } from "../hoppers-table-filter/HoppersTableFilter"
import { HoppersTableProps } from "../HoppersTable"
import { BaseFlySortPreset, MaxPriceSortPreset, RatingSortPreset } from "../hoppersTable.utils"
import HopperRow from "./hopper-row/HopperRow"

export default function HoppersTableDesktop(props: HoppersTableProps) {
    const { filter, hoppers } = props

    return (
        <TableVirtuoso
            useWindowScroll
            data={hoppers}
            components={{
                Table: ({ style, ...props }) => <Table.Root {...props} style={style} />,
                TableRow: props => <Table.Row striped={props["data-index"] % 2 === 1} {...props} />,
            }}
            fixedHeaderContent={() => {
                return (
                    <Table.Row>
                        <Table.HeaderCell css={{ width: 90 }}>Image</Table.HeaderCell>
                        <Table.SortableHeaderCell
                            css={{ width: 120 }}
                            sortBy={SortHopperBy.TOKEN_ID}>
                            Hopper-ID
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell css={{ width: 100 }} sortBy={SortHopperBy.LEVEL}>
                            Level
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell
                            css={{ width: 135 }}
                            sortBy={SortHopperBy.STRENGTH}>
                            Strength
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell
                            css={{ width: 135 }}
                            sortBy={SortHopperBy.AGILITY}>
                            Agility
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell
                            css={{ width: 135 }}
                            sortBy={SortHopperBy.VITALITY}>
                            Vitality
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell
                            css={{ width: 135 }}
                            sortBy={SortHopperBy.INTELLIGENCE}>
                            Intelligence
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell
                            css={{ width: 135 }}
                            sortBy={SortHopperBy.FERTILITY}>
                            Fertility
                        </Table.SortableHeaderCell>
                        {filter.type === HoppersTableConfigFilters.PERMIT && (
                            <Table.SortableHeaderCell sortBy={RatingSortPreset[filter.permit]}>
                                Rating
                            </Table.SortableHeaderCell>
                        )}
                        <Table.SortableHeaderCell align="right" sortBy={SortHopperBy.PRICE}>
                            Price
                        </Table.SortableHeaderCell>
                        <Table.SortableHeaderCell align="right" sortBy={SortHopperBy.LEVEL_COSTS}>
                            Level costs
                        </Table.SortableHeaderCell>
                        {filter.type === HoppersTableConfigFilters.PERMIT && (
                            <Table.SortableHeaderCell
                                align="right"
                                sortBy={MaxPriceSortPreset[filter.permit]}>
                                Max. Price
                            </Table.SortableHeaderCell>
                        )}
                        {filter.type === HoppersTableConfigFilters.FERTILITY && (
                            <Table.SortableHeaderCell
                                align="right"
                                sortBy={SortHopperBy.MAX_PRICE_FERTILITY}>
                                Max. Price Fertility
                            </Table.SortableHeaderCell>
                        )}

                        {filter.type === HoppersTableConfigFilters.PERMIT && (
                            <Table.SortableHeaderCell
                                align="right"
                                sortBy={BaseFlySortPreset[filter.permit]}>
                                Base Fly / Level
                            </Table.SortableHeaderCell>
                        )}

                        {filter.type === HoppersTableConfigFilters.FERTILITY && (
                            <Table.HeaderCell css={{ textAlign: "right" }}>
                                Cost 50 % chance
                            </Table.HeaderCell>
                        )}

                        <Table.HeaderCell css={{ width: 80 }} />
                    </Table.Row>
                )
            }}
            itemContent={(index, hopper) => (
                <HopperRow key={hopper.tokenId} index={index} hopper={hopper} filter={filter} />
            )}
        />
    )
}

import { IconStar } from "@tabler/icons"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import * as Table from "components/table/Table"
import { Hopper } from "models/Hopper"
import { TableVirtuoso } from "react-virtuoso"
import { SortHopperBy } from "sorters/hoppers"
import { Adventure } from "utils/adventures"
import {
    HoppersTableConfigFilters,
    HoppersTableConfiguration,
} from "./configure-hoppers-table/ConfigureHoppersTable"
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
                    Table: ({ style, ...props }) => <Table.Root {...props} style={style} />,
                    TableRow: props => (
                        <Table.Row striped={props["data-index"] % 2 === 1} {...props} />
                    ),
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
                            <Table.SortableHeaderCell
                                css={{ width: 100 }}
                                sortBy={SortHopperBy.LEVEL}>
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
                            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                                <Table.SortableHeaderCell sortBy={RatingSortPreset[config.permit]}>
                                    Rating
                                </Table.SortableHeaderCell>
                            )}
                            <Table.SortableHeaderCell align="right" sortBy={SortHopperBy.PRICE}>
                                Price
                            </Table.SortableHeaderCell>
                            <Table.SortableHeaderCell
                                align="right"
                                sortBy={SortHopperBy.LEVEL_COSTS}>
                                Level costs
                            </Table.SortableHeaderCell>
                            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                                <Table.SortableHeaderCell
                                    align="right"
                                    sortBy={MaxPriceSortPreset[config.permit]}>
                                    Max. Price
                                </Table.SortableHeaderCell>
                            )}

                            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                                <Table.SortableHeaderCell
                                    align="right"
                                    sortBy={BaseFlySortPreset[config.permit]}>
                                    Base Fly / Level
                                </Table.SortableHeaderCell>
                            )}

                            {config.type === HoppersTableConfigFilters.FERTILITY && (
                                <>
                                    <Table.SortableHeaderCell
                                        align="right"
                                        sortBy={SortHopperBy.MAX_PRICE_FERTILITY}>
                                        Max. Price Fertility
                                    </Table.SortableHeaderCell>
                                    <Table.HeaderCell css={{ textAlign: "right" }}>
                                        Cost 50 % chance
                                    </Table.HeaderCell>
                                </>
                            )}

                            <Table.HeaderCell css={{ width: 80 }} />
                        </Table.Row>
                    )
                }}
                itemContent={(index, hopper) => (
                    <HopperRow key={hopper.tokenId} index={index} hopper={hopper} config={config} />
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

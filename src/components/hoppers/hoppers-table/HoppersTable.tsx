import { HoppersFilter } from "api/filters/hoopers"
import useHoppers from "api/hooks/useHoppers"
import SortableTableHeader from "components/sorting/sortable-table-header/SortableTableHeader"
import useSort, { SortContext } from "hooks/useSort"
import { TableVirtuoso } from "react-virtuoso"
import { SortHopperBy, sortHoppers } from "sorters/hoppers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import HopperRow from "./hopper-row/HopperRow"

type HoppersTableProps = {
    filter: HoppersFilter
}

export default function HoppersTable(props: HoppersTableProps) {
    const { filter } = props

    const { hoppers } = useHoppers(filter)

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

    return (
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
                            <StyledTableHeader>Image</StyledTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.TOKEN_ID}>
                                Token-Id
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.LEVEL}>
                                Level
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.STRENGTH}>
                                Strength
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.AGILITY}>
                                Agility
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.VITALITY}>
                                Vitality
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.INTELLIGENCE}>
                                Intelligence
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.FERTILITY}>
                                Fertility
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.RATING_POND}>
                                Rating
                                <br />
                                Pond
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.RATING_STREAM}>
                                Rating
                                <br />
                                Stream
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.RATING_SWAMP}>
                                Rating
                                <br />
                                Swamp
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.RATING_RIVER}>
                                Rating
                                <br />
                                River
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.RATING_FOREST}>
                                Rating
                                <br />
                                Forest
                            </SortableTableHeader>
                            <SortableTableHeader sortBy={SortHopperBy.RATING_GREAT_LAKE}>
                                Rating
                                <br />
                                Great Lake
                            </SortableTableHeader>
                            <StyledTableHeader>Market</StyledTableHeader>
                            <StyledTableHeader>Price</StyledTableHeader>
                        </tr>
                    </SortContext.Provider>
                )
            }}
            itemContent={(index, hopper) => <HopperRow index={index} hopper={hopper} />}
        />
    )
}

const StyledTable = styled("table", {
    width: "100%",
    borderSpacing: 0,
    color: "$gray12",
    tableLayout: "fixed",
})
const StyledTableHeader = styled("th", {
    color: "$gray11",
    fontWeight: 500,
    backgroundColor: "$gray3",
    padding: "1rem 0",
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

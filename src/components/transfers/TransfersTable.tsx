import { Currency, formatCurrency } from "formatters/currency"
import { formatDateTime } from "formatters/date"
import useSort from "hooks/useSort"
import { Transfer } from "models/Transfer"
import { SortTransferBy, sortTransfers } from "sorters/transfers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"

type TransfersTableProps = {
    transfers: Transfer[]
}

export default function TransfersTable(props: TransfersTableProps) {
    const { transfers } = props

    const { sorted: sortedTransfers } = useSort({
        collection: transfers,
        initial: {
            by: SortTransferBy.TIMESTAMP,
            direction: SortDirection.DESC,
        },
        sorter: sortTransfers,
    })

    return (
        <Table>
            <thead>
                <TableRow>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                </TableRow>
            </thead>

            <tbody>
                {sortedTransfers.map(transfer => (
                    <TableRow key={transfer.timestamp}>
                        <TableCell>{formatDateTime(transfer.timestamp)}</TableCell>
                        <TableCell>{transfer.type}</TableCell>
                        <TableCell>{formatCurrency(transfer.amount, Currency.FLY)}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    )
}

// Components
const Table = styled("table", {
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
const TableRow = styled("tr", {
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
const TableHeaderCell = styled("th", {
    color: "$gray11",
    fontWeight: 500,
    backgroundColor: "$gray3",
    padding: "0.5rem 1rem",
    cursor: "default",
})
const TableCell = styled("td", {
    color: "$gray12",
    padding: "0.5rem 1rem",
    whiteSpace: "nowrap",
    variants: {
        align: {
            left: {
                textAlign: "left",
            },
            center: {
                textAlign: "center",
            },
            right: {
                textAlign: "right",
            },
        },
    },
    defaultVariants: {
        align: "center",
    },
})

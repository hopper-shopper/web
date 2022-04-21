import Screen from "components/layout/screen/Screen"
import * as Table from "components/table/Table"
import { Currency, formatCurrency } from "formatters/currency"
import { formatDateTime } from "formatters/date"
import { formatTransferAmount, formatTransferType } from "formatters/transfer"
import useSort from "hooks/useSort"
import { Transfer } from "models/Transfer"
import { SortTransferBy, sortTransfers } from "sorters/transfers"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import {
    calculateTransfersProfit,
    getTransferAmountChange,
    TransferAmountChange,
} from "utils/transfer"

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
        <Table.Root>
            <thead>
                <Table.Row>
                    <Screen bp="md" constraint="max">
                        <Table.HeaderCell align="left">Date / Type</Table.HeaderCell>
                    </Screen>
                    <Screen bp="md" constraint="min">
                        <Table.HeaderCell align="left">Date</Table.HeaderCell>
                        <Table.HeaderCell align="left">Type</Table.HeaderCell>
                    </Screen>
                    <Table.HeaderCell align="right">Amount</Table.HeaderCell>
                </Table.Row>
            </thead>

            <tbody>
                {sortedTransfers.map((transfer, index) => (
                    <Table.Row key={transfer.timestamp} striped={index % 2 === 1}>
                        <Screen bp="md" constraint="max">
                            <Table.Cell align="left">
                                <p>{formatDateTime(transfer.timestamp)}</p>
                                <p>{formatTransferType(transfer.type)}</p>
                            </Table.Cell>
                        </Screen>
                        <Screen bp="md" constraint="min">
                            <Table.Cell align="left">
                                {formatDateTime(transfer.timestamp)}
                            </Table.Cell>
                            <Table.Cell align="left">
                                {formatTransferType(transfer.type)}
                            </Table.Cell>
                        </Screen>
                        <Table.Cell align="right">
                            <Amount amountChange={getTransferAmountChange(transfer)}>
                                {formatTransferAmount(transfer)}
                            </Amount>
                        </Table.Cell>
                    </Table.Row>
                ))}

                <Table.Row>
                    <Screen bp="md" constraint="max">
                        <Table.SummaryCell />
                    </Screen>
                    <Screen bp="md" constraint="min">
                        <Table.SummaryCell />
                        <Table.SummaryCell />
                    </Screen>
                    <Table.SummaryCell align="right">
                        FLY profit:{" "}
                        {formatCurrency(calculateTransfersProfit(sortedTransfers), Currency.FLY)}
                    </Table.SummaryCell>
                </Table.Row>
            </tbody>
        </Table.Root>
    )
}

// Components
const Amount = styled("span", {
    variants: {
        amountChange: {
            [TransferAmountChange.INCREASE]: {
                color: "$teal11",
            },
            [TransferAmountChange.DECREASE]: {
                color: "$red11",
            },
            [TransferAmountChange.NO_CHANGE]: {
                color: "$blue11",
            },
        },
    },
})

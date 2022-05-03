import { HistoricalPricesFilter } from "api/filters/prices"
import { TransferDirection } from "api/filters/transfers"
import useHistoricalPrices from "api/hooks/useHistoricalPrices"
import useTransfers from "api/hooks/useTransfers"
import * as Dialog from "components/dialog/Dialog"
import Screen from "components/layout/screen/Screen"
import * as Table from "components/table/Table"
import { Currency, formatCurrency } from "formatters/currency"
import { formatDateTime } from "formatters/date"
import useSort from "hooks/useSort"
import { useAtomValue } from "jotai"
import { WalletAddress } from "models/User"
import { useMemo } from "react"
import { SortTransferBy, sortTransfers } from "sorters/transfers"
import { SortDirection } from "sorters/_common"
import { currencyAtom } from "stores/settings"
import { styled } from "theme"
import { IsoDatetime } from "utils/types"

type RealizedProfitsDialogProps = {
    wallet: WalletAddress
    children: React.ReactNode
}

export default function RealizedProfitsDialog(props: RealizedProfitsDialogProps) {
    const { wallet, children } = props

    const userCurrency = useAtomValue(currencyAtom)

    const { transfers } = useTransfers({
        type: "sell-fly",
        user: wallet,
        direction: TransferDirection.OUT,
    })

    const dates = useMemo(() => {
        return transfers.map(transfer => transfer.timestamp)
    }, [transfers])

    const priceCurrency: HistoricalPricesFilter["currency"] = (() => {
        switch (userCurrency) {
            case Currency.EUR:
                return "eur"
            case Currency.USD:
                return "usd"
            default:
                return "usd"
        }
    })()
    const { prices } = useHistoricalPrices({
        dates,
        coin: "fly",
        currency: priceCurrency,
    })

    const { sorted: sortedTransfers } = useSort({
        collection: transfers,
        sorter: sortTransfers,
        initial: {
            by: SortTransferBy.TIMESTAMP,
            direction: SortDirection.DESC,
        },
    })

    const getFiatValue = (atDate: IsoDatetime, flyValue: number): number => {
        const flyPrice = prices[atDate] ?? 0
        return flyPrice * flyValue
    }

    const totalFly = sortedTransfers.reduce((acc, cur) => acc + cur.amount, 0)
    const totalFiat = sortedTransfers.reduce(
        (acc, cur) => acc + getFiatValue(cur.timestamp, cur.amount),
        0,
    )

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>Realized profits</Dialog.Title>

                <Content>
                    <Table.Root border={false} rounded={false}>
                        <tbody>
                            {sortedTransfers.map((transfer, index) => (
                                <Table.Row
                                    key={`${transfer.timestamp}-${transfer.amount}`}
                                    striped={index % 2 === 0}>
                                    <Table.Cell css={{ color: "$gray11" }}>
                                        {formatDateTime(transfer.timestamp)}
                                    </Table.Cell>

                                    <Screen bp="md" constraint="max">
                                        <Table.Cell align="right">
                                            {formatCurrency(transfer.amount, Currency.FLY)}
                                            <br />
                                            <Blue>
                                                {formatCurrency(
                                                    getFiatValue(
                                                        transfer.timestamp,
                                                        transfer.amount,
                                                    ),
                                                    userCurrency,
                                                )}
                                            </Blue>
                                        </Table.Cell>
                                    </Screen>

                                    <Screen bp="md" constraint="min">
                                        <Table.Cell align="right" css={{ width: 120 }}>
                                            {formatCurrency(transfer.amount, Currency.FLY)}
                                        </Table.Cell>

                                        <Table.Cell
                                            align="right"
                                            css={{ width: 120, color: "$blue11" }}>
                                            {formatCurrency(
                                                getFiatValue(transfer.timestamp, transfer.amount),
                                                userCurrency,
                                            )}
                                        </Table.Cell>
                                    </Screen>
                                </Table.Row>
                            ))}
                        </tbody>

                        <Table.Foot sticky>
                            <Table.Row>
                                <Table.SummaryCell />

                                <Screen bp="md" constraint="max">
                                    <Table.SummaryCell align="right">
                                        {formatCurrency(totalFly, Currency.FLY)}
                                        <br />
                                        <Blue>{formatCurrency(totalFiat, userCurrency)}</Blue>
                                    </Table.SummaryCell>
                                </Screen>

                                <Screen bp="md" constraint="min">
                                    <Table.SummaryCell align="right">
                                        {formatCurrency(totalFly, Currency.FLY)}
                                    </Table.SummaryCell>
                                    <Table.SummaryCell align="right">
                                        {formatCurrency(totalFiat, userCurrency)}
                                    </Table.SummaryCell>
                                </Screen>
                            </Table.Row>
                        </Table.Foot>
                    </Table.Root>
                </Content>

                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Root>
    )
}

const Content = styled("div", {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    px: "2rem",
    mx: "-2rem",
    overflowY: "auto",
})
const Blue = styled("span", {
    color: "$blue11",
})

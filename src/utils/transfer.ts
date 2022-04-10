import { Transfer, TransferType } from "models/Transfer"

export enum TransferAmountChange {
    INCREASE,
    DECREASE,
    NO_CHANGE = "NO_CHANGE",
}

export function getTransferAmountChange(transfer: Transfer): TransferAmountChange {
    const amountChangeIncrease: TransferType[] = ["claim"]
    const amountChangeDecrease: TransferType[] = ["levelup", "breeding"]

    if (amountChangeIncrease.includes(transfer.type)) {
        return TransferAmountChange.INCREASE
    } else if (amountChangeDecrease.includes(transfer.type)) {
        return TransferAmountChange.DECREASE
    }

    return TransferAmountChange.NO_CHANGE
}

export function getBalanceChange(transfer: Transfer): number {
    const amountChange = getTransferAmountChange(transfer)

    switch (amountChange) {
        case TransferAmountChange.INCREASE:
            return transfer.amount
        case TransferAmountChange.DECREASE:
            return transfer.amount * -1
        case TransferAmountChange.NO_CHANGE:
            return 0
    }
}

export function calculateTransfersProfit(transfers: Transfer[]): number {
    return transfers.reduce((acc, cur) => acc + getBalanceChange(cur), 0)
}

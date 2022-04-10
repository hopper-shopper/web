import { Transfer } from "models/Transfer"
import { getTransferAmountChange, TransferAmountChange } from "utils/transfer"
import { Currency, formatCurrency } from "./currency"

export function formatTransferType(type: Transfer["type"]): string {
    switch (type) {
        case "claim":
            return "Claim FLY"
        case "vefly-deposit":
            return "Stake FLY"
        case "levelup":
            return "Level Up"
        case "breeding":
            return "Breeding"
        default:
            return "Unknown"
    }
}

export function formatTransferAmount(transfer: Transfer): string {
    const amountChange = getTransferAmountChange(transfer)

    switch (amountChange) {
        case TransferAmountChange.INCREASE:
            return formatCurrency(transfer.amount, Currency.FLY)
        case TransferAmountChange.DECREASE:
            return formatCurrency(transfer.amount * -1, Currency.FLY)
        case TransferAmountChange.NO_CHANGE:
            return formatCurrency(transfer.amount, Currency.FLY)
    }
}

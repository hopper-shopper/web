import { Transfer, TransferType } from "models/Transfer"
import { getTransferAmountChange, TransferAmountChange } from "utils/transfer"
import { Currency, formatCurrency } from "./currency"

export function formatTransferType(type: TransferType): string {
    switch (type) {
        case "claim":
            return "Claim FLY"
        case "stake-deposit":
            return "Stake FLY"
        case "level-up":
            return "Level Up"
        case "multi-level-up":
            return "Level Up (Multi)"
        case "breeding":
            return "Breeding"
        case "change-name":
            return "Change name"
        case "sell-fly":
            return "Sell FLY"
        case "buy-fly":
            return "Buy FLY"
        case "provide-liquidity":
            return "Provide Liquidity"
        case "remove-liquidity":
            return "Remove Liquidity"
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

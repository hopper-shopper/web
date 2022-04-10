import { Transfer, TransferType } from "models/Transfer"
import { FilterFn } from "./_common"

export function getTransfersTypesFilter(...transferTypes: TransferType[]): FilterFn<Transfer> {
    const filter: FilterFn<Transfer> = transfers => {
        return transfers.filter(transfer => {
            return transferTypes.includes(transfer.type)
        })
    }
    filter.signature = `transfer-types-${transferTypes.join("-")}`
    return filter
}

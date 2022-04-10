import { Transfer } from "models/Transfer"
import { groupByDayKeyGenerator } from "./_common"

export function groupTransferByDate(transfer: Transfer): string {
    return groupByDayKeyGenerator(Date.parse(transfer.timestamp))
}

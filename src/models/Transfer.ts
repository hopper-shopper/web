import { IsoDatetime } from "utils/types"

export type Transfer = {
    amount: number
    timestamp: IsoDatetime
    type: TransferType
    contract: TransferContract
}

export type TransferTypeIn = "claim"
export type TransferTypeOut =
    | "level-up"
    | "multi-level-up"
    | "vefly-vote"
    | "stake-deposit"
    | "breeding"
    | "change-name"
    | "sell-fly"
    | "buy-fly"
    | "provide-liquidity"
    | "remove-liquidity"
export type TransferType = TransferTypeIn | TransferTypeOut | "any"

export type TransferContract =
    | "pond"
    | "stream"
    | "swamp"
    | "river"
    | "forest"
    | "great-lake"
    | "ballot"
    | "fly"
    | "ve-fly"
    | "multi-level-up"
    | "joe-router"
    | "unknown"

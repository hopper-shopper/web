export type Transfer = {
    amount: number
    timestamp: string // ISO-Datetime
    type: TransferType
    contract: TransferContract
}

export type TransferTypeIn = "claim"
export type TransferTypeOut = "level-up" | "vefly-vote" | "stake-deposit" | "breeding"
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
    | "unknown"

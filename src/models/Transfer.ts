export type Transfer = {
    amount: number
    timestamp: string // ISO-Datetime
    type: TransferType
}

export type TransferTypeIn = "claim"
export type TransferTypeOut = "levelup" | "vefly-deposit" | "breeding"
export type TransferType = TransferTypeIn | TransferTypeOut

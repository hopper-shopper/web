import { TransferType } from "models/Transfer"

export type TransfersFilter = {
    direction?: TransferDirection
    user: string
    type: TransferType
}

export enum TransferDirection {
    IN = "IN",
    OUT = "OUT",
}
export function urlifyTransferDirection(direction: TransferDirection): string {
    switch (direction) {
        case TransferDirection.IN:
            return "in"
        case TransferDirection.OUT:
            return "out"
    }
}

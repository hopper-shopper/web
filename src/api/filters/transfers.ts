export type TransfersFilter = {
    direction?: TransferDirection
    user: string
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

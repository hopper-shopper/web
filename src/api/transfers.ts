import { Transfer } from "models/Transfer"
import { TransferDirection, TransfersFilter, urlifyTransferDirection } from "./filters/transfers"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetTransfersResponse = {
    data: Transfer[]
}

export function getTransfersUrl(filter: TransfersFilter): string {
    const params = new URLSearchParams([
        ["user", filter.user.toLowerCase()],
        ["direction", urlifyTransferDirection(filter.direction ?? TransferDirection.OUT)],
    ])

    return `${ENDPOINT}/transfers?${params.toString()}`
}
export async function fetchTransfers(filter: TransfersFilter): Promise<Transfer[]> {
    if (!filter.user) {
        return Promise.resolve([])
    }

    const response = await fetch(getTransfersUrl(filter))
    const json = (await response.json()) as GetTransfersResponse

    return json.data
}

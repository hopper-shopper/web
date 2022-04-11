const ENDPOINT = import.meta.env.VITE_GAS_COLLECTOR_ENDPOINT

type GetCurrentGasResponse = {
    data: CurrentGasData
}
export type CurrentGasData = {
    datetime: string // ISO-Datetime
    gwei: number
    gweiEur: number
    gweiUsd: number
}

export async function fetchCurrentGas(): Promise<CurrentGasData> {
    const url = `${ENDPOINT}/gas/avax`

    const response = await fetch(url)
    const json = (await response.json()) as GetCurrentGasResponse

    return json.data
}

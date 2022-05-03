import { Price } from "models/Price"
import { HistoricalPricesFilter } from "./filters/prices"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetPricesResponse = {
    data: Price
}
export function getPricesUrl(): string {
    return `${ENDPOINT}/prices`
}
export async function fetchPrices(): Promise<Price> {
    const response = await fetch(getPricesUrl())
    const json = (await response.json()) as GetPricesResponse

    return json.data
}

export type HistoricalPricesData = {
    [date: string]: number
}
type GetHistoricalPricesResponse = {
    data: HistoricalPricesData
}

export function getHistoricalPricesUrl(filter: HistoricalPricesFilter): string {
    const params = new URLSearchParams([
        ["at", filter.dates.join(",")],
        ["coin", filter.coin],
        ["currency", filter.currency],
    ])

    return `${ENDPOINT}/prices/historical?${params.toString()}`
}
export async function fetchHistoricalPrices(
    filter: HistoricalPricesFilter,
): Promise<HistoricalPricesData> {
    if (filter.dates.length === 0) {
        return Promise.resolve({})
    }

    const response = await fetch(getHistoricalPricesUrl(filter))
    const json = (await response.json()) as GetHistoricalPricesResponse

    return json.data
}

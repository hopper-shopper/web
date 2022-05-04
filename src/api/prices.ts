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
    return `${ENDPOINT}/prices/historical`
}
export async function fetchHistoricalPrices(
    filter: HistoricalPricesFilter,
): Promise<HistoricalPricesData> {
    if (filter.dates.length === 0) {
        return Promise.resolve({})
    }

    const response = await fetch(getHistoricalPricesUrl(filter), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dates: filter.dates,
            coin: filter.coin,
            currency: filter.currency,
        }),
    })
    const json = (await response.json()) as GetHistoricalPricesResponse

    return json.data
}

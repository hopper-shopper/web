import { Price } from "models/Price"

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

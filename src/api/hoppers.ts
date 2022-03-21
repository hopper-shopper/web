import { Adventure, getAdventureFilter } from "constants/adventures"
import { getMarketFilter, Market } from "constants/filters"
import { Hopper } from "models/Hopper"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export type HoppersFilter = {
    adventure: Adventure
    market: Market
}
type GetHoppersResponse = {
    data: Hopper[]
}

export function getHoppersUrl(filter: HoppersFilter): string {
    const params = new URLSearchParams([
        ["adventure", getAdventureFilter(filter.adventure)],
        ["market", getMarketFilter(filter.market)],
    ])

    return `${ENDPOINT}/hoppers?${params.toString()}`
}
export async function fetchHoppers(filter: HoppersFilter): Promise<Hopper[]> {
    const response = await fetch(getHoppersUrl(filter))
    const json = (await response.json()) as GetHoppersResponse

    return json.data
}

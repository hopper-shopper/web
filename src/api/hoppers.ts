import { Hopper } from "models/Hopper"
import { HoppersFilter, urlifyAdventureFilter, urlifyMarketFilter } from "./filters/hoopers"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetHoppersResponse = {
    data: Hopper[]
}

export function getHoppersUrl(filter: HoppersFilter): string {
    const params = new URLSearchParams([
        ["adventure", urlifyAdventureFilter(filter.adventure)],
        ["market", urlifyMarketFilter(filter.market)],
    ])

    return `${ENDPOINT}/hoppers?${params.toString()}`
}
export async function fetchHoppers(filter: HoppersFilter): Promise<Hopper[]> {
    const response = await fetch(getHoppersUrl(filter))
    const json = (await response.json()) as GetHoppersResponse

    return json.data
}

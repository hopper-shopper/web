import { Hopper, HoppersActivitySnapshot } from "models/Hopper"
import {
    AdventureFilter,
    HoppersFilter,
    MarketFilter,
    PermitFilter,
    urlifyAdventureFilter,
    urlifyMarketFilter,
    urlifyPermitFilter,
    urlifyTokenIdsFilter,
} from "./filters/hoopers"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetHoppersResponse = {
    data: Hopper[]
}

export function getHoppersUrl(filter: HoppersFilter): string {
    const params = new URLSearchParams([
        ["adventure", urlifyAdventureFilter(filter.adventure ?? AdventureFilter.ANY)],
        ["market", urlifyMarketFilter(filter.market ?? MarketFilter.ANY)],
        ["permit", urlifyPermitFilter(filter.permit ?? PermitFilter.ANY)],
        ["tokenIds", urlifyTokenIdsFilter(filter.tokenIds ?? [])],
        ["owner", filter.owner ?? ""],
    ])

    return `${ENDPOINT}/hoppers?${params.toString()}`
}
export async function fetchHoppers(filter: HoppersFilter): Promise<Hopper[]> {
    const response = await fetch(getHoppersUrl(filter))
    const json = (await response.json()) as GetHoppersResponse

    return json.data
}

type GetHoppersActivityResponse = {
    data: HoppersActivitySnapshot
}

export function getHoppersActivityUrl(): string {
    return `${ENDPOINT}/hoppers/activity`
}
export async function fetchHoppersActivity(): Promise<HoppersActivitySnapshot> {
    const response = await fetch(getHoppersActivityUrl())
    const json = (await response.json()) as GetHoppersActivityResponse

    return json.data
}

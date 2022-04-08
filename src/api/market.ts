import { Listing } from "models/Listing"
import { urlifyTokenIdsFilter } from "./filters/hoopers"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetHoppersListingsResponse = {
    data: Listing[]
}

export function getHoppersListingsUrl(tokenIds: string[]): string {
    const params = new URLSearchParams([["tokenIds", urlifyTokenIdsFilter(tokenIds)]])

    return `${ENDPOINT}/market?${params.toString()}`
}
export async function fetchHoppersListings(tokenIds: string[]): Promise<Listing[]> {
    if (tokenIds.length === 0) {
        return Promise.resolve([])
    }

    const response = await fetch(getHoppersListingsUrl(tokenIds))
    const json = (await response.json()) as GetHoppersListingsResponse

    return json.data
}

import { BaseShare } from "models/BaseShare"
import { urlifyAdventure } from "utils/adventures"
import { BaseSharesHistoryFilter } from "./filters/baseShares"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetBaseSharesHistory = {
    data: BaseShare[]
}

export function getBaseSharesHistoryUrl(filter: BaseSharesHistoryFilter): string {
    const params = new URLSearchParams([["adventure", urlifyAdventure(filter.adventure)]])

    return `${ENDPOINT}/base-shares/history?${params.toString()}`
}
export async function fetchBaseSharesHistory(
    filter: BaseSharesHistoryFilter,
): Promise<BaseShare[]> {
    const response = await fetch(getBaseSharesHistoryUrl(filter))
    const json = (await response.json()) as GetBaseSharesHistory

    return json.data
}

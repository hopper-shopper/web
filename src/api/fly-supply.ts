import { FlySupply } from "models/FlySupply"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetFlySupplyResponse = {
    data: FlySupply[]
}

export function getFlySupplyUrl(): string {
    return `${ENDPOINT}/supply`
}
export async function fetchFlySupply(): Promise<FlySupply[]> {
    const response = await fetch(getFlySupplyUrl())
    const json = (await response.json()) as GetFlySupplyResponse

    return json.data
}

import { HopperId } from "models/Hopper"
import { INSPECT } from "routing/routes"

type InspectPageUrlParams = {
    hopper: HopperId
}
export function getInspectPageUrl(params: InspectPageUrlParams): string {
    const searchParams = new URLSearchParams(params)
    return `${INSPECT}?${searchParams.toString()}`
}

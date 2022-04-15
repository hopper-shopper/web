import { HopperId } from "models/Hopper"
import { WalletAddress } from "models/User"
import { INSPECT, WALLET } from "routing/routes"

type InspectPageUrlParams = {
    hopper: HopperId
}
export function getInspectPageUrl(params: InspectPageUrlParams): string {
    const searchParams = new URLSearchParams(params)
    return `${INSPECT}?${searchParams.toString()}`
}

type WalletPageUrlParams = {
    wallet: WalletAddress
}
export function getWalletPageUrl(params: WalletPageUrlParams): string {
    const searchParams = new URLSearchParams(params)
    return `${WALLET}?${searchParams.toString()}`
}

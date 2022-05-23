import { HopperId } from "models/Hopper"
import { WalletAddress } from "models/User"
import { AnalyticsNavigationView } from "pages/analytics-page/useAnalyticsPageState"
import { ANALYTICS, INSPECT, WALLET } from "routing/routes"
import { createLookupMap } from "./map"

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

type HopperMarketUrlParams = {
    hopper: HopperId
}
export function getHopperMarketUrl(params: HopperMarketUrlParams): string {
    return `https://hoppersgame.io/market#h${params.hopper}`
}

type AnalyticsPageUrlParams = {
    view: AnalyticsNavigationView
}
const viewMapping = createLookupMap([
    [AnalyticsNavigationView.FLY, "fly"],
    [AnalyticsNavigationView.HOPPERS, "hoppers"],
])
function urlifyAnalyticsView(view: AnalyticsNavigationView): string {
    return viewMapping.get(view) ?? "fly"
}
export function getAnalyticsPageUrl(params: AnalyticsPageUrlParams): string {
    const searchParams = new URLSearchParams({
        view: urlifyAnalyticsView(params.view),
    })
    return `${ANALYTICS}?${searchParams.toString()}`
}

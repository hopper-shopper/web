import {
    WatchlistCardFeature,
    WatchlistFilter,
    WatchlistMarketFilter,
} from "components/watchlist/configure-watchlist-filter/ConfigureWatchlistFilter"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { createLookupMap } from "utils/map"

export default function useWatchlistPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState(deriveStateFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state))
    }, [state])

    return [state, setState] as const
}

// Constants
const INITIAL_STATE: WatchlistFilter = {
    market: WatchlistMarketFilter.ANY,
    features: [WatchlistCardFeature.MARKET_PRICE, WatchlistCardFeature.ADVENTURE_PERMIT],
}

const MARKET_KEY = "market"
const FEATURE_KEY = "features"

// State update functions

function deriveStateFromSearchParams(searchParams: URLSearchParams): WatchlistFilter {
    const market = searchParams.has(MARKET_KEY)
        ? parseMarketFilter(searchParams.get(MARKET_KEY)!)
        : INITIAL_STATE.market
    const features = searchParams.has(FEATURE_KEY)
        ? parseFeatures(searchParams.get(FEATURE_KEY)!)
        : INITIAL_STATE.features

    return {
        market,
        features,
    }
}

function deriveSearchParamsFromState(state: WatchlistFilter): URLSearchParams {
    const params = new URLSearchParams()
    params.set(MARKET_KEY, urlifyMarketFilter(state.market))

    if (state.features.length > 0) {
        params.set(FEATURE_KEY, urlifyFeatures(state.features))
    }

    return params
}

// Helper functions

const marketFilterMapping = createLookupMap([
    [WatchlistMarketFilter.ANY, "any"],
    [WatchlistMarketFilter.ON_MARKET, "listed"],
    [WatchlistMarketFilter.OFF_MARKET, "not-listed"],
])
function urlifyMarketFilter(marketFilter: WatchlistMarketFilter): string {
    return marketFilterMapping.get(marketFilter) ?? "any"
}
function parseMarketFilter(marketFilter: string): WatchlistMarketFilter {
    return marketFilterMapping.get(marketFilter) ?? WatchlistMarketFilter.ANY
}

const featureMapping = createLookupMap([
    [WatchlistCardFeature.MARKET_PRICE, "market-price"],
    [WatchlistCardFeature.ADVENTURE_PERMIT, "adventure-permit"],
    [WatchlistCardFeature.FLY_EARNINGS, "fly-earnings"],
])
function urlifyFeatures(features: WatchlistCardFeature[]): string {
    return features
        .map(feature => {
            return featureMapping.get(feature)
        })
        .filter(Boolean)
        .join(".")
}
function parseFeatures(features: string): WatchlistCardFeature[] {
    return features
        .split(".")
        .map(feature => {
            return featureMapping.get(feature)
        })
        .filter(Boolean) as WatchlistCardFeature[]
}

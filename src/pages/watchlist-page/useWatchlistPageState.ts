import {
    AdventureTierPermit,
    WatchlistCardFeature,
    WatchlistFilter,
    WatchlistMarketFilter,
} from "components/watchlist/configure-watchlist-filter/ConfigureWatchlistFilter"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMount } from "react-use"
import { createLookupMap } from "utils/map"
import { parseIntFromString } from "utils/numbers"

export default function useWatchlistPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState(deriveStateFromSearchParams(searchParams))

    useMount(() => {
        setState(deriveStateFromSearchParams(searchParams))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state), { replace: true })
    }, [state])

    return [state, setState] as const
}

// Constants
const INITIAL_STATE: WatchlistFilter = {
    market: WatchlistMarketFilter.ANY,
    features: [WatchlistCardFeature.MARKET_PRICE, WatchlistCardFeature.ADVENTURE_PERMIT],
    normalizeLevel: 0,
    permit: [
        AdventureTierPermit.T1,
        AdventureTierPermit.T2,
        AdventureTierPermit.T3,
        AdventureTierPermit.T4,
    ],
}

const MARKET_KEY = "market"
const FEATURES_KEY = "features"
const NORMALIZE_LEVEL_KEY = "normalize-level"
const PERMITS_KEY = "permits"

// State update functions

function deriveStateFromSearchParams(searchParams: URLSearchParams): WatchlistFilter {
    const market = searchParams.has(MARKET_KEY)
        ? parseMarketFilter(searchParams.get(MARKET_KEY)!)
        : INITIAL_STATE.market
    const features = searchParams.has(FEATURES_KEY)
        ? parseFeatures(searchParams.get(FEATURES_KEY)!)
        : INITIAL_STATE.features
    const normalizeLevel = parseIntFromString(
        searchParams.get(NORMALIZE_LEVEL_KEY),
        INITIAL_STATE.normalizeLevel,
    )
    const permit = searchParams.has(PERMITS_KEY)
        ? parsePermits(searchParams.get(PERMITS_KEY)!)
        : INITIAL_STATE.permit

    return {
        market,
        features,
        normalizeLevel,
        permit,
    }
}

function deriveSearchParamsFromState(state: WatchlistFilter): URLSearchParams {
    const params = new URLSearchParams()
    params.set(MARKET_KEY, urlifyMarketFilter(state.market))

    if (state.features.length > 0) {
        params.set(FEATURES_KEY, urlifyFeatures(state.features))
    }

    if (state.normalizeLevel > 0 && state.normalizeLevel <= 100) {
        params.set(NORMALIZE_LEVEL_KEY, `${state.normalizeLevel}`)
    }

    if (state.permit.length > 0) {
        params.set(PERMITS_KEY, urlifyPermits(state.permit))
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
    [WatchlistCardFeature.BREEDING_CHANCE, "breeding-chance"],
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

const permitMapping = createLookupMap([
    [AdventureTierPermit.T1, "t1"],
    [AdventureTierPermit.T2, "t2"],
    [AdventureTierPermit.T3, "t3"],
    [AdventureTierPermit.T4, "t4"],
])
function urlifyPermits(permits: AdventureTierPermit[]): string {
    return permits
        .map(permit => {
            return permitMapping.get(permit)
        })
        .filter(Boolean)
        .join(".")
}
function parsePermits(permits: string): AdventureTierPermit[] {
    return permits
        .split(".")
        .map(permit => {
            return permitMapping.get(permit)
        })
        .filter(Boolean) as AdventureTierPermit[]
}

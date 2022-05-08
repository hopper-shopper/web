import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMount } from "react-use"
import { createLookupMap } from "utils/map"

export default function useAnalyticsPageState() {
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

// Types
export type AnalyticsPageState = {
    view: AnalyticsNavigationView
}

export enum AnalyticsNavigationView {
    FLY = "FLY",
    HOPPERS = "HOPPERS",
}

// Constants
const VIEW_KEY = "view"

const INITIAL_STATE: AnalyticsPageState = {
    view: AnalyticsNavigationView.FLY,
}

// State update functions
function deriveStateFromSearchParams(searchParams: URLSearchParams): AnalyticsPageState {
    const view = searchParams.has(VIEW_KEY)
        ? parseView(searchParams.get(VIEW_KEY)!)
        : INITIAL_STATE.view

    return {
        view,
    }
}

function deriveSearchParamsFromState(state: AnalyticsPageState): URLSearchParams {
    const params = new URLSearchParams()

    params.set(VIEW_KEY, urlifyView(state.view))

    return params
}

// Parse / Urlify
const viewMapping = createLookupMap([
    [AnalyticsNavigationView.FLY, "fly"],
    [AnalyticsNavigationView.HOPPERS, "hoppers"],
])
function urlifyView(view: AnalyticsNavigationView): string {
    return viewMapping.get(view) ?? "fly"
}
function parseView(view: string): AnalyticsNavigationView {
    return viewMapping.get(view) ?? INITIAL_STATE.view
}

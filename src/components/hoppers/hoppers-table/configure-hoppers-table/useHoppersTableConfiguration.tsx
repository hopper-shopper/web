import useLocationEffect from "hooks/useLocationEffect"
import { useCallback, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMount } from "react-use"
import { Adventure, urlifyAdventure } from "utils/adventures"
import { clamp, parseIntFromString } from "utils/numbers"
import { HoppersTableConfigFilters, HoppersTableConfiguration } from "./ConfigureHoppersTable"

export default function useHoppersTableConfiguration(initial: HoppersTableConfiguration) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [config, setConfig] = useState(initial)

    useMount(() => {
        setConfig(deriveStateFromSearchParams(searchParams, initial))
    })

    useLocationEffect("search", search => {
        const params = new URLSearchParams(search)
        setConfig(prev => deriveStateFromSearchParams(params, prev))
    })

    const setState = useCallback((state: HoppersTableConfiguration) => {
        setSearchParams(deriveSearchParamsFromState(state))
        setConfig(state)
    }, [])

    return [config, setState] as const
}

// Constants
const TYPE_KEY = "filter"
const PERMIT_KEY = "adventure-permit"
const RATING_GE_KEY = "rating"
const FERTILITY_KEY = "fertility"

// State update functions

function deriveStateFromSearchParams(
    searchParams: URLSearchParams,
    initial: HoppersTableConfiguration,
): HoppersTableConfiguration {
    if (!searchParams.has(TYPE_KEY)) {
        return initial
    }

    const type = parseType(searchParams.get(TYPE_KEY)!) ?? HoppersTableConfigFilters.NONE
    const permit = searchParams.get(PERMIT_KEY)
    const ratingGe = clamp(0, 100, parseIntFromString(searchParams.get(RATING_GE_KEY), 0))
    const fertilityGe = clamp(0, 10, parseIntFromString(searchParams.get(FERTILITY_KEY), 0))

    if (type === HoppersTableConfigFilters.NONE) {
        return {
            type: HoppersTableConfigFilters.NONE,
        }
    } else if (type === HoppersTableConfigFilters.PERMIT) {
        return {
            type: HoppersTableConfigFilters.PERMIT,
            permit: permit ? parsePermit(permit) ?? Adventure.POND : Adventure.POND,
            ratingGe,
        }
    } else if (type === HoppersTableConfigFilters.FERTILITY) {
        return {
            type: HoppersTableConfigFilters.FERTILITY,
            fertilityGe,
        }
    }

    return initial
}

function deriveSearchParamsFromState(state: HoppersTableConfiguration): URLSearchParams {
    const params = new URLSearchParams()

    params.set(TYPE_KEY, urlifyType(state.type))

    if (state.type === HoppersTableConfigFilters.PERMIT) {
        params.set(PERMIT_KEY, urlifyAdventure(state.permit))

        if (state.ratingGe > 0) {
            params.set(RATING_GE_KEY, `${state.ratingGe}`)
        }
    } else if (state.type === HoppersTableConfigFilters.FERTILITY) {
        if (state.fertilityGe > 0) {
            params.set(FERTILITY_KEY, `${state.fertilityGe}`)
        }
    }

    return params
}

// Helper functions

function urlifyType(type: HoppersTableConfigFilters): string {
    switch (type) {
        case HoppersTableConfigFilters.NONE:
            return "none"
        case HoppersTableConfigFilters.PERMIT:
            return "permit"
        case HoppersTableConfigFilters.FERTILITY:
            return "fertility"
    }
}
function parseType(type: string): HoppersTableConfigFilters | null {
    switch (type) {
        case "none":
            return HoppersTableConfigFilters.NONE
        case "permit":
            return HoppersTableConfigFilters.PERMIT
        case "fertility":
            return HoppersTableConfigFilters.FERTILITY
        default:
            return null
    }
}

function parsePermit(adventure: string): Adventure | null {
    switch (adventure) {
        case "pond":
            return Adventure.POND
        case "stream":
            return Adventure.STREAM
        case "swamp":
            return Adventure.SWAMP
        case "river":
            return Adventure.RIVER
        case "forest":
            return Adventure.FOREST
        case "great-lake":
            return Adventure.GREAT_LAKE
        default:
            return null
    }
}

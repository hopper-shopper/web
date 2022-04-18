import useLocationEffect from "hooks/useLocationEffect"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Adventure, urlifyAdventure } from "utils/adventures"
import { createLookupMap } from "utils/map"
import { clamp, parseIntFromString } from "utils/numbers"
import { HoppersTableConfigFilters, HoppersTableAnyFilter } from "./HoppersTableFilter"

export default function useHoppersTableFilter(initial: HoppersTableAnyFilter) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [config, setConfig] = useState(deriveStateFromSearchParams(searchParams, initial))

    useLocationEffect("search", search => {
        const params = new URLSearchParams(search)
        setConfig(prev => deriveStateFromSearchParams(params, prev))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(config), { replace: true })
    }, [config])

    return [config, setConfig] as const
}

// Constants
const TYPE_KEY = "filter"
const PERMIT_KEY = "adventure-permit"
const RATING_GE_KEY = "rating"
const FERTILITY_KEY = "fertility"

// State update functions

function deriveStateFromSearchParams(
    searchParams: URLSearchParams,
    initial: HoppersTableAnyFilter,
): HoppersTableAnyFilter {
    if (!searchParams.has(TYPE_KEY)) {
        return initial
    }

    const type = searchParams.has(TYPE_KEY) ? parseType(searchParams.get(TYPE_KEY)!) : initial.type
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
            permit: permit ? parsePermit(permit) : Adventure.POND,
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

function deriveSearchParamsFromState(state: HoppersTableAnyFilter): URLSearchParams {
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

const typeFilterMapping = createLookupMap([
    [HoppersTableConfigFilters.NONE, "none"],
    [HoppersTableConfigFilters.PERMIT, "permit"],
    [HoppersTableConfigFilters.FERTILITY, "fertility"],
])
function urlifyType(type: HoppersTableConfigFilters): string {
    return typeFilterMapping.get(type) ?? "none"
}
function parseType(type: string): HoppersTableConfigFilters {
    return typeFilterMapping.get(type) ?? HoppersTableConfigFilters.NONE
}

const permitMapping = createLookupMap([
    [Adventure.POND, "pond"],
    [Adventure.STREAM, "stream"],
    [Adventure.SWAMP, "swamp"],
    [Adventure.RIVER, "river"],
    [Adventure.FOREST, "forest"],
    [Adventure.GREAT_LAKE, "great-lake"],
])
function urlifyPermit(permit: Adventure): string {
    return permitMapping.get(permit) ?? "pond"
}
function parsePermit(adventure: string): Adventure {
    return permitMapping.get(adventure) ?? Adventure.POND
}

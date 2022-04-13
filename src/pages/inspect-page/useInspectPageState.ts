import useLocationEffect from "hooks/useLocationEffect"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function useInspectPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState<InspectPageState>(
        deriveStateFromSearchParams(searchParams, INITIAL_STATE),
    )

    useLocationEffect("search", search => {
        const params = new URLSearchParams(search)
        setState(prev => deriveStateFromSearchParams(params, prev))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state), { replace: true })
    }, [state])

    return [state, setState] as const
}

// Types
export type InspectPageState = {
    hopperId: string
}

// Constants
const HOPPER_ID_KEY = "hopper"

const INITIAL_STATE: InspectPageState = {
    hopperId: "",
}

// State update functions

function deriveStateFromSearchParams(
    searchParams: URLSearchParams,
    initial: InspectPageState,
): InspectPageState {
    const hopperId = searchParams.get(HOPPER_ID_KEY)

    return {
        hopperId: hopperId ?? initial.hopperId,
    }
}

function deriveSearchParamsFromState(state: InspectPageState): URLSearchParams {
    const params = new URLSearchParams()

    if (state.hopperId) {
        params.set(HOPPER_ID_KEY, state.hopperId)
    }

    return params
}

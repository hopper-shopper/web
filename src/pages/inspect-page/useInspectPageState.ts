import { HopperId } from "models/Hopper"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMount } from "react-use"
import { isValidHopperId } from "utils/hopper"

export default function useInspectPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState<InspectPageState>(deriveStateFromSearchParams(searchParams))

    useMount(() => {
        setState(deriveStateFromSearchParams(searchParams))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state), { replace: true })
    }, [state])

    return [state, setState] as const
}

// Types
export type InspectPageState = {
    hopperId: HopperId
}

// Constants
const HOPPER_ID_KEY = "hopper"

const INITIAL_STATE: InspectPageState = {
    hopperId: "",
}

// State update functions

function deriveStateFromSearchParams(searchParams: URLSearchParams): InspectPageState {
    const hopperId = searchParams.get(HOPPER_ID_KEY)

    return {
        hopperId: hopperId ?? INITIAL_STATE.hopperId,
    }
}

function deriveSearchParamsFromState(state: InspectPageState): URLSearchParams {
    const params = new URLSearchParams()

    if (state.hopperId && isValidHopperId(state.hopperId)) {
        params.set(HOPPER_ID_KEY, state.hopperId)
    }

    return params
}

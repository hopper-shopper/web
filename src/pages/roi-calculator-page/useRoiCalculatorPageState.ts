import useLocationEffect from "hooks/useLocationEffect"
import { HopperId } from "models/Hopper"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function useRoiCalculatorPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState(deriveStateFromSearchParams(searchParams))

    useLocationEffect("search", search => {
        const params = new URLSearchParams(search)
        setState(deriveStateFromSearchParams(params))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state), { replace: true })
    }, [state])

    return [state, setState] as const
}

// Types
export type RoiCalculatorPageState = {
    hopperId: HopperId
}

// Constants
const HOPPER_ID_KEY = "hopper"

const INITIAL_STATE: RoiCalculatorPageState = {
    hopperId: "",
}

// State update functions

function deriveStateFromSearchParams(searchParams: URLSearchParams): RoiCalculatorPageState {
    const hopperId = searchParams.get(HOPPER_ID_KEY) ?? INITIAL_STATE.hopperId

    return {
        hopperId,
    }
}

function deriveSearchParamsFromState(state: RoiCalculatorPageState): URLSearchParams {
    const params = new URLSearchParams()

    if (state.hopperId) {
        const hopperIdNumber = parseInt(state.hopperId)
        if (!Number.isNaN(hopperIdNumber) && hopperIdNumber >= 0 && hopperIdNumber <= 9999) {
            params.set(HOPPER_ID_KEY, `${hopperIdNumber}`)
        }
    }

    return params
}

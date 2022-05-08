import { Dispatch, SetStateAction, useCallback } from "react"
import { ObjectKey } from "utils/types"

type StateUpdateFn<S> = (updateData: Partial<S>) => void

export default function useStateUpdate<S extends Record<ObjectKey, unknown>>(
    setState: Dispatch<SetStateAction<S>>,
): StateUpdateFn<S> {
    const stateUpdateFn: StateUpdateFn<S> = useCallback(
        updateData => {
            setState(prev => ({
                ...prev,
                ...updateData,
            }))
        },
        [setState],
    )

    return stateUpdateFn
}

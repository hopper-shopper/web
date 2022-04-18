import { useCallback, useEffect, useRef, useState } from "react"

type StateUpdateFn<T> = T | ((prev: T) => T)

export default function useObservableState<T>(observable: T) {
    const [state, setInternalState] = useState<T>(observable)
    const status = useRef(StateStatus.INITIAL)

    useEffect(() => {
        if (status.current === StateStatus.TOUCHED) {
            return
        }

        setInternalState(observable)
        status.current = StateStatus.OBSERVED
    }, [observable])

    const setState = useCallback((value: StateUpdateFn<T>) => {
        setInternalState(prev => {
            if (value instanceof Function) {
                return value(prev)
            }
            return value
        })
        status.current = StateStatus.TOUCHED
    }, [])

    return [state, setState] as const
}

enum StateStatus {
    INITIAL,
    TOUCHED,
    OBSERVED,
}

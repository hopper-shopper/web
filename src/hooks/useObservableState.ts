import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"

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

    const setState: Dispatch<SetStateAction<T>> = useCallback(value => {
        setInternalState(prev => {
            const setter = value as SetStateFn<T>
            return typeof value === "function" ? setter(prev) : value
        })
        status.current = StateStatus.TOUCHED
    }, [])

    return [state, setState] as const
}

type SetStateFn<T> = (prevState: T) => T

enum StateStatus {
    INITIAL,
    TOUCHED,
    OBSERVED,
}

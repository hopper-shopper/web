import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { useLatest } from "react-use"

type UseControllableStateParams<T> = {
    value?: T | undefined
    defaultValue?: T | undefined
    onChange?: (value: T) => void
}

export default function useControllableState<T>(params: UseControllableStateParams<T>) {
    const { value, defaultValue, onChange } = params

    const [uncontrolledValue, setUncontrolledValue] = useUncontrolledState({
        defaultValue,
        onChange,
    })
    const isControlled = value !== undefined
    const state = isControlled ? value : uncontrolledValue

    const latestOnChange = useLatest(onChange)

    const setState: Dispatch<SetStateAction<T | undefined>> = useCallback(
        nextValue => {
            if (isControlled) {
                const setter = nextValue as SetStateFn<T>
                const state = typeof nextValue === "function" ? setter(value) : nextValue
                if (state !== value) {
                    latestOnChange.current?.(state as T)
                }
            } else {
                setUncontrolledValue(nextValue)
            }
        },
        [isControlled, value],
    )

    return [state, setState] as const
}

type UseUncontrolledStateParams<T> = {
    defaultValue?: T | undefined
    onChange?: (value: T) => void
}
function useUncontrolledState<T>(params: UseUncontrolledStateParams<T>) {
    const { defaultValue, onChange } = params

    const uncontrolledState = useState(defaultValue)
    const [value] = uncontrolledState
    const prevValueRef = useRef(value)
    const latestOnChange = useLatest(onChange)

    useEffect(() => {
        if (value !== prevValueRef.current) {
            latestOnChange.current?.(value as T)
            prevValueRef.current = value
        }
    }, [value])

    return uncontrolledState
}

type SetStateFn<T> = (prevState?: T) => T

import { useCallback, useState } from "react"

type UseUniqueToggleListReturn<T> = {
    state: Set<T>
    setState: (items: T[] | Set<T>) => void
    toggle: ToggleItemFn<T>
}

export default function useUniqueToggleList<T>(initial: T[]): UseUniqueToggleListReturn<T> {
    const [state, setState] = useState(new Set(initial))

    const overrideState: UseUniqueToggleListReturn<T>["setState"] = useCallback(items => {
        setState(new Set(items))
    }, [])

    const toggle: UseUniqueToggleListReturn<T>["toggle"] = useCallback(item => {
        setState(prev => {
            const next = new Set(prev)
            if (next.has(item)) {
                next.delete(item)
            } else {
                next.add(item)
            }
            return next
        })
    }, [])

    return {
        state,
        setState: overrideState,
        toggle,
    }
}

type ToggleItemFn<T> = (item: T) => void

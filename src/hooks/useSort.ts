import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { useLatest } from "react-use"
import { SortDirection, SortFn, SortOptions } from "sorters/_common"

export type UseSortParams<T, SortBy> = {
    collection: T[]
    sorter: SortFn<T, SortBy>
    initial: SortOptions<SortBy>
}
export type UseSortResult<T, SortBy> = UseSortOptionsResult<SortBy> & {
    sorted: T[]
}

export default function useSort<T, SortBy>(
    params: UseSortParams<T, SortBy>,
): UseSortResult<T, SortBy> {
    const sortOptions = useSortOptions<SortBy, SortOptions<SortBy>>(params.initial)

    const latestSorter = useLatest(params.sorter)

    const { collection } = params
    const { by, direction } = sortOptions

    const sorted = useMemo(() => {
        return latestSorter.current(collection, {
            by,
            direction,
        })
    }, [collection, by, direction])

    return {
        ...sortOptions,
        sorted,
    }
}

export type UseSortOptionsResult<SortBy> = SortOptions<SortBy> & {
    setDirection: (direction: SortDirection) => void
    toggleDirection: () => void
    setBy: (sortBy: SortBy) => void
}

export function useSortOptions<SortBy, O extends SortOptions<SortBy>>(
    initial: O,
): UseSortOptionsResult<SortBy> {
    const [options, setOptions] = useState<O>(initial)

    const setDirection: UseSortOptionsResult<SortBy>["setDirection"] = useCallback(direction => {
        setOptions(prev => ({
            ...prev,
            direction,
        }))
    }, [])

    const toggleDirection: UseSortOptionsResult<SortBy>["toggleDirection"] = useCallback(() => {
        setOptions(prev => {
            return {
                ...prev,
                direction: toggleSortDirection(prev.direction),
            }
        })
    }, [])

    const setBy: UseSortOptionsResult<SortBy>["setBy"] = useCallback(sortBy => {
        setOptions(prev => {
            if (prev.by === sortBy) {
                return {
                    ...prev,
                    direction: toggleSortDirection(prev.direction),
                }
            }

            return {
                ...prev,
                by: sortBy,
                direction: SortDirection.ASC,
            }
        })
    }, [])

    return {
        ...options,
        setDirection,
        toggleDirection,
        setBy,
    }
}

function toggleSortDirection(current: SortDirection): SortDirection {
    switch (current) {
        case SortDirection.ASC:
            return SortDirection.DESC
        case SortDirection.DESC:
            return SortDirection.ASC
    }
}

export type SortContextProps<SortBy> = {
    active: SortBy
    direction: SortDirection
    update: (sortBy: SortBy) => void
}
export const SortContext = createContext<SortContextProps<any>>({
    active: null,
    direction: SortDirection.ASC,
    update: () => {
        throw new Error("not implemented yet")
    },
})
export function useSortContext<SortBy>(): SortContextProps<SortBy> {
    const context = useContext(SortContext)
    return context as SortContextProps<SortBy>
}

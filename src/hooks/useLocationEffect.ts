import { useEffect } from "react"
import { Location, useLocation } from "react-router-dom"
import { useLatest } from "react-use"

export default function useLocationEffect<K extends keyof Location>(
    key: K,
    effectFn: LocationEffectFn<K>,
) {
    const location = useLocation()

    const value = location[key]
    const latestEffectFn = useLatest(effectFn)

    useEffect(() => {
        latestEffectFn.current(value)
    }, [value])
}

type LocationEffectFn<K extends keyof Location> = (value: Location[K]) => void

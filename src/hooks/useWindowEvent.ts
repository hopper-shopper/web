import { useEffect } from "react"
import { useLatest } from "react-use"

export default function useWindowEvent<E extends keyof WindowEventMap>(
    event: E,
    handler: WindowEventHandler<E>,
) {
    const latestHandler = useLatest(handler)

    useEffect(() => {
        const wrappedHandler = (event: WindowEventMap[E]) => {
            latestHandler.current(event)
        }

        window.addEventListener(event, wrappedHandler)

        return () => {
            window.removeEventListener(event, wrappedHandler)
        }
    }, [event])
}

type WindowEventHandler<E extends keyof WindowEventMap> = (event: WindowEventMap[E]) => void

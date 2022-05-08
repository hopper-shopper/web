import { useLayoutEffect } from "react"
import { useLatest } from "react-use"

type UseConditionalClassOptions = {
    /**
     * @default document.body
     */
    target: HTMLElement
}

export default function useConditionalClass(
    className: string,
    condition: boolean,
    options?: UseConditionalClassOptions,
) {
    const latestOptions = useLatest<UseConditionalClassOptions>({
        target: document.body,
        ...options,
    })

    useLayoutEffect(() => {
        const applyClass = () => {
            latestOptions.current.target.classList.add(className)
        }
        const removeClass = () => {
            latestOptions.current.target.classList.remove(className)
        }

        if (condition) {
            applyClass()
        } else {
            removeClass()
        }

        return () => {
            removeClass()
        }
    }, [className, condition])
}

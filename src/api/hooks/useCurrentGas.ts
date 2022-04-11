import { CurrentGasData, fetchCurrentGas } from "api/gas"
import { useAsyncFn, useInterval, useMount } from "react-use"

export type UseCurrentGasReturn = {
    gas: CurrentGasData | null
    loading: boolean
    error: Error | undefined
}

export default function useCurrentGas(): UseCurrentGasReturn {
    const [{ value: currentGas, loading, error }, load] = useAsyncFn(() => {
        return fetchCurrentGas()
    }, [])

    useMount(load)
    useInterval(load, 30 * 1000)

    return {
        gas: currentGas ?? null,
        loading,
        error,
    }
}

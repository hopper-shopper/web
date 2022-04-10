import { fetchPrices } from "api/prices"
import { Price } from "models/Price"
import { useAsyncFn, useEffectOnce, useInterval } from "react-use"
import { DEFAULT_PRICE } from "stores/prices"

export type UsePricesReturn = {
    price: Price
    loading: boolean
    error: Error | undefined
}

export default function usePrices(): UsePricesReturn {
    const [{ value: price, loading, error }, fetch] = useAsyncFn(() => {
        return fetchPrices()
    }, [])

    useEffectOnce(() => {
        fetch()
    })

    useInterval(fetch, 30 * 1000)

    return {
        price: price ?? DEFAULT_PRICE,
        loading,
        error,
    }
}

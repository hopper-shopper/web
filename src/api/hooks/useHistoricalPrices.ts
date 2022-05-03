import { HistoricalPricesFilter } from "api/filters/prices"
import { fetchHistoricalPrices, HistoricalPricesData } from "api/prices"
import useFetch from "hooks/useFetch"

export type UseHistoricalPricesReturn = {
    prices: HistoricalPricesData
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useHistoricalPrices(
    filter: HistoricalPricesFilter,
): UseHistoricalPricesReturn {
    const { dates, coin, currency } = filter

    const signature = `${dates.join(",")}-${coin}-${currency}`
    const {
        data: prices,
        dataSignature,
        loading,
        error,
    } = useFetch(() => {
        return fetchHistoricalPrices(filter)
    }, signature)

    return {
        prices: prices ?? {},
        dataSignature,
        loading,
        error,
    }
}

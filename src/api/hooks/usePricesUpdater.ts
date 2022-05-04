import { fetchPrices } from "api/prices"
import { useSetAtom } from "jotai"
import { useInterval, useMount } from "react-use"
import { pricesAtom } from "stores/prices"

export default function usePricesUpdater() {
    const setPrices = useSetAtom(pricesAtom)

    const loadPrices = async () => {
        try {
            const prices = await fetchPrices()
            setPrices(prices)
        } catch (error) {
            console.error(error)
        }
    }

    useMount(loadPrices)
    useInterval(loadPrices, 30 * 1000)
}

import { fetchCurrentGas } from "api/gas"
import { useSetAtom } from "jotai"
import { useInterval, useMount } from "react-use"
import { gasGweiAtom } from "stores/gas"

export default function useGasUpdater() {
    const setGasGwei = useSetAtom(gasGweiAtom)

    const loadGas = async () => {
        try {
            const gas = await fetchCurrentGas()
            setGasGwei(gas.gwei)
        } catch (error) {
            console.error(error)
        }
    }

    useMount(loadGas)
    useInterval(loadGas, 30 * 1000)
}

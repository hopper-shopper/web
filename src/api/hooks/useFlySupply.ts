import { fetchFlySupply } from "api/fly-supply"
import { FlySupply } from "models/FlySupply"
import { useAsync } from "react-use"

type UseFlySupplyReturn = {
    supplies: FlySupply[]
    loading: boolean
    error: Error | null
}

export default function useFlySupply(): UseFlySupplyReturn {
    const { value, loading, error } = useAsync(fetchFlySupply, [])

    return {
        supplies: value ?? [],
        loading,
        error: error ?? null,
    }
}

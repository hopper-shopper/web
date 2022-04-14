import { fetchHoppers } from "api/hoppers"
import useFetch from "hooks/useFetch"
import { Hopper } from "models/Hopper"
import { WalletAddress } from "models/User"

type UseWalletHoppersReturn = {
    hoppers: Hopper[]
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useWalletHoppers(
    wallet: WalletAddress | null | undefined,
): UseWalletHoppersReturn {
    const signature = `${wallet}`
    const {
        data: hoppers,
        dataSignature,
        loading,
        error,
    } = useFetch(() => {
        if (!wallet) {
            return Promise.resolve([])
        }
        return fetchHoppers({ owner: wallet })
    }, signature)

    return {
        hoppers: hoppers ?? [],
        dataSignature,
        loading,
        error,
    }
}

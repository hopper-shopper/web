import { UserEarningsFilter } from "api/filters/user"
import { fetchUserEarnings } from "api/user"
import useFetch from "hooks/useFetch"
import { UserEarnings } from "models/User"

type UseUserEarningsReturn = {
    earnings: UserEarnings
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useUserEarnings(filter: UserEarningsFilter): UseUserEarningsReturn {
    const { user, adventure } = filter

    const signature = `${user}-${adventure}`
    const { data, dataSignature, loading, error } = useFetch(() => {
        return fetchUserEarnings({ user, adventure })
    }, signature)

    return {
        earnings: data ?? DEFAULT_USER_EARNINGS,
        dataSignature,
        loading,
        error,
    }
}

const DEFAULT_USER_EARNINGS: UserEarnings = {
    base: 0,
    boost: 0,
}

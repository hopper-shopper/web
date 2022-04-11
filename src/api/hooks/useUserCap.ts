import { UserCapFilter } from "api/filters/user"
import { fetchUserCap } from "api/user"
import useFetch from "hooks/useFetch"
import { UserCap } from "models/User"

type UseUserCapReturn = {
    userCap: UserCap
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useUserCap(filter: UserCapFilter): UseUserCapReturn {
    const { user, adventure } = filter

    const signature = `${user}-${adventure}`
    const { data, dataSignature, loading, error } = useFetch(() => {
        return fetchUserCap({ user, adventure })
    }, signature)

    return {
        userCap: data ?? DEFAULT_USER_CAP,
        dataSignature,
        loading,
        error,
    }
}

const DEFAULT_USER_CAP: UserCap = {
    cap: 0,
    current: 0,
}

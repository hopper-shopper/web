import { UserCap } from "models/User"
import { urlifyAdventure } from "utils/adventures"
import { UserCapFilter } from "./filters/user"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetUserCapResponse = {
    data: UserCap
}

export function getUserCapUrl(filter: UserCapFilter): string {
    const params = new URLSearchParams([
        ["user", filter.user.toLowerCase()],
        ["adventure", urlifyAdventure(filter.adventure)],
    ])

    return `${ENDPOINT}/user?${params.toString()}`
}
export async function fetchUserCap(filter: UserCapFilter): Promise<UserCap> {
    if (!filter.user) {
        return Promise.resolve({
            cap: 0,
            current: 0,
        })
    }

    const response = await fetch(getUserCapUrl(filter))
    const json = (await response.json()) as GetUserCapResponse

    return json.data
}

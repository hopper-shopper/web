import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { HopperId } from "models/Hopper"

const WATCHLIST_LS = "hoppershopper.watchlist.tokenIds"

export const watchlistAtom = atomWithStorage<HopperId[]>(WATCHLIST_LS, [])
export const toggleWatchlistAtom = atom(null, (_, set, hopperId: HopperId) => {
    set(watchlistAtom, prev => {
        if (prev.includes(hopperId)) {
            return prev.filter(tokenId => tokenId !== hopperId)
        }

        return [...prev, hopperId]
    })
})

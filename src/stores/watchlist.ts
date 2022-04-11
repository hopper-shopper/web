import { HopperId } from "models/Hopper"
import createStore from "zustand"
import { persist } from "zustand/middleware"

type WatchlistStore = {
    watchlist: HopperId[]
    toggle: (hopperId: HopperId) => void
}

const WATCHLIST_LS = "hoppershopper.watchlist.tokenIds"
const DEFAULT_STORE: WatchlistStore = {
    watchlist: [],
    toggle: () => {},
}

export default createStore<WatchlistStore>(
    persist(
        set => ({
            ...DEFAULT_STORE,
            toggle: tokenId => {
                set(({ watchlist }) => {
                    // Remove
                    if (watchlist.includes(tokenId)) {
                        return {
                            watchlist: watchlist.filter(hopperId => hopperId !== tokenId),
                        }
                    }

                    // Add
                    return {
                        watchlist: [...watchlist, tokenId],
                    }
                })
            },
        }),
        {
            name: WATCHLIST_LS,
        },
    ),
)

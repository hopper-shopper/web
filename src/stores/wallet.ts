import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { WalletAddress } from "models/User"

const WALLETS_HISTORY_LS = "hoppershopper.wallet.history"

type WalletHistoryEntry = {
    wallet: WalletAddress
    datetime: number // UNIX timestamp
}

export const walletsHistoryEntriesAtom = atomWithStorage<WalletHistoryEntry[]>(
    WALLETS_HISTORY_LS,
    [],
)
export const walletsHistoryAtom = atom(get => {
    const entries = get(walletsHistoryEntriesAtom)
    const sortedEntries = [...entries].sort((a, b) => {
        return b.datetime - a.datetime
    })

    return sortedEntries.map(entry => entry.wallet)
})
export const addWalletToHistoryAtom = atom(null, (_, set, wallet: WalletAddress) => {
    set(walletsHistoryEntriesAtom, prev => {
        const next = new Set(prev)
        next.add({ wallet, datetime: new Date().getTime() })

        return Array.from(next)
    })
})
export const removeWalletFromHistoryAtom = atom(null, (_, set, wallet: WalletAddress) => {
    set(walletsHistoryEntriesAtom, prev => {
        return prev.filter(entry => entry.wallet !== wallet)
    })
})

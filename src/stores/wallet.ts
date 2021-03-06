import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { WalletAddress } from "models/User"
import { getStorageKey } from "utils/stores"

const WALLETS_HISTORY_LS = getStorageKey("wallet.history")

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
    return sortEntries(entries).map(entry => entry.wallet)
})
export const addWalletToHistoryAtom = atom(null, (_, set, wallet: WalletAddress) => {
    set(walletsHistoryEntriesAtom, prev => {
        const next = [...prev]

        let updated = false
        for (const entry of next) {
            if (entry.wallet === wallet) {
                entry.datetime = new Date().getTime()
                updated = true
            }
        }

        if (!updated) {
            next.push({ wallet, datetime: new Date().getTime() })
        }

        return sortEntries(next).slice(0, 10)
    })
})
export const removeWalletFromHistoryAtom = atom(null, (_, set, wallet: WalletAddress) => {
    set(walletsHistoryEntriesAtom, prev => {
        return prev.filter(entry => entry.wallet !== wallet)
    })
})

function sortEntries(entries: WalletHistoryEntry[]): WalletHistoryEntry[] {
    return [...entries].sort((a, b) => {
        return b.datetime - a.datetime
    })
}

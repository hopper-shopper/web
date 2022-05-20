import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { HopperId } from "models/Hopper"
import { getStorageKey } from "utils/stores"

const INSPECT_HISTORY_LS = getStorageKey("inspect.history")

type InspectHistoryEntry = {
    hopperId: HopperId
    image: string | null // url
    datetime: number // UNIX timestamp
}

export const inspectHistoryEntriesAtom = atomWithStorage<InspectHistoryEntry[]>(
    INSPECT_HISTORY_LS,
    [],
)
export const inspectHistoryAtom = atom(get => {
    const entries = get(inspectHistoryEntriesAtom)
    return sortEntries(entries)
})
export const addHopperToHistoryAtom = atom(null, (_, set, hopperId: HopperId) => {
    set(inspectHistoryEntriesAtom, prev => {
        const next = [...prev]

        let updated = false
        for (const entry of next) {
            if (entry.hopperId === hopperId) {
                entry.datetime = new Date().getTime()
                updated = true
            }
        }

        if (!updated) {
            next.push({ hopperId, datetime: new Date().getTime(), image: null })
        }

        return sortEntries(next).slice(0, 10)
    })
})
export const updateHopperHistoryEntryAtom = atom(
    null,
    (_, set, updateData: Pick<InspectHistoryEntry, "hopperId"> & Partial<InspectHistoryEntry>) => {
        set(inspectHistoryEntriesAtom, prev => {
            return prev.map(entry => {
                if (entry.hopperId === updateData.hopperId) {
                    return {
                        ...entry,
                        ...updateData,
                    }
                }
                return entry
            })
        })
    },
)

function sortEntries(entries: InspectHistoryEntry[]): InspectHistoryEntry[] {
    return [...entries].sort((a, b) => {
        return b.datetime - a.datetime
    })
}

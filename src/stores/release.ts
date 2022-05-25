import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { getStorageKey } from "utils/stores"

const RELEASE_NOTES_LS = getStorageKey("release.notes")

export const releasesAtom = atomWithStorage<number[]>(RELEASE_NOTES_LS, [])
export const addSeenReleaseAtom = atom(null, (_, set, release: number) => {
    set(releasesAtom, prev => {
        const next = new Set(prev)
        next.add(release)
        return Array.from(next)
    })
})

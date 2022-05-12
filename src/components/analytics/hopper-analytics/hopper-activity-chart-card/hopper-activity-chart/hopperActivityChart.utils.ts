import { HoppersActivitySnapshot } from "models/Hopper"

// Types
export type SnapshotKey = keyof HoppersActivitySnapshot

// Formatters
const keyMapping: Record<SnapshotKey, string> = {
    idle: "Idle",
    breeding: "Breeding",
    marketplace: "Marketplace",
    adventure: "Adventure",
    pond: "Pond",
    stream: "Stream",
    swamp: "Swamp",
    river: "River",
    forest: "Forest",
    greatLake: "Great Lake",
}
export function formatActivityKey(key: SnapshotKey): string {
    return keyMapping[key]
}

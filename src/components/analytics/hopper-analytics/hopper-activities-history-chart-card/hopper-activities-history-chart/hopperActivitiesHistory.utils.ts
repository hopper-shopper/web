import { HopperActivitiesSnapshot } from "models/Hopper"

const mapping: Record<keyof HopperActivitiesSnapshot, string> = {
    idle: "Idle",
    marketplace: "Marketplace",
    breeding: "Breeding",
    adventure: "All adventures",
    pond: "Pond",
    stream: "Stream",
    swamp: "Swamp",
    river: "River",
    forest: "Forest",
    greatLake: "Great Lake",
    date: "",
}
export function formatHopperActivitiesKey(key: keyof HopperActivitiesSnapshot): string {
    return mapping[key]
}

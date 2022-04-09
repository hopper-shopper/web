import { scaleQuantize } from "d3-scale"
import { Hopper } from "models/Hopper"
import { Adventure } from "./adventures"
import { grassDark, tomatoDark } from "@radix-ui/colors"

export function hopperAdventureToAdventure(hopper: Hopper): Adventure | null {
    if (!hopper.inAdventure || !hopper.adventure) {
        return null
    }

    switch (hopper.adventure) {
        case "pond":
            return Adventure.POND
        case "stream":
            return Adventure.STREAM
        case "swamp":
            return Adventure.SWAMP
        case "river":
            return Adventure.RIVER
        case "forest":
            return Adventure.FOREST
        case "great-lake":
            return Adventure.GREAT_LAKE
        default:
            return null
    }
}

export const HOPPER_STATS_SCALE = scaleQuantize([
    tomatoDark.tomato5,
    tomatoDark.tomato6,
    tomatoDark.tomato7,
    tomatoDark.tomato8,
    tomatoDark.tomato9,
    grassDark.grass5,
    grassDark.grass6,
    grassDark.grass7,
    grassDark.grass8,
    grassDark.grass9,
]).domain([1, 10])

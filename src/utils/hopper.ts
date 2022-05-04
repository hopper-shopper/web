import { grass, tomato, grassDark, tomatoDark } from "@radix-ui/colors"
import { scaleQuantize } from "d3-scale"
import { HopperActivity, HopperId } from "models/Hopper"
import { Adventure } from "./adventures"

export function activityToAdventure(activity: HopperActivity): Adventure | null {
    const mapping: Record<HopperActivity, Adventure | null> = {
        pond: Adventure.POND,
        stream: Adventure.STREAM,
        swamp: Adventure.SWAMP,
        river: Adventure.RIVER,
        forest: Adventure.FOREST,
        "great-lake": Adventure.GREAT_LAKE,
        breeding: null,
        idle: null,
        marketplace: null,
    }

    return mapping[activity]
}

export const HOPPER_STATS_SCALE_LIGHT = scaleQuantize([
    tomato.tomato5,
    tomato.tomato6,
    tomato.tomato7,
    tomato.tomato8,
    tomato.tomato9,
    grass.grass5,
    grass.grass6,
    grass.grass7,
    grass.grass8,
    grass.grass9,
]).domain([1, 10])
export const HOPPER_STATS_SCALE_DARK = scaleQuantize([
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

export function isValidHopperId(hopperId: HopperId | number): boolean {
    if (typeof hopperId === "string") {
        hopperId = parseInt(hopperId)
    }

    if (Number.isNaN(hopperId)) {
        return false
    }

    return hopperId >= 0 && hopperId <= 9999
}

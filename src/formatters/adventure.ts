import { Adventure } from "utils/adventures"

export function formatAdventure(adventure: Adventure | null): string {
    if (adventure === null) {
        return "-"
    }

    switch (adventure) {
        case Adventure.POND:
            return "Pond"
        case Adventure.STREAM:
            return "Stream"
        case Adventure.SWAMP:
            return "Swamp"
        case Adventure.RIVER:
            return "River"
        case Adventure.FOREST:
            return "Forest"
        case Adventure.GREAT_LAKE:
            return "Great Lake"
    }
}

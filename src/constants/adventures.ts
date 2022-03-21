export enum Adventure {
    POND = "POND",
    STREAM = "STREAM",
    SWAMP = "SWAMP",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}

export function getAdventureName(adventure: Adventure): string {
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

export function getAdventureFilter(adventure: Adventure): string {
    switch (adventure) {
        case Adventure.POND:
            return "pond"
        case Adventure.STREAM:
            return "stream"
        case Adventure.SWAMP:
            return "swamp"
        case Adventure.RIVER:
            return "river"
        case Adventure.FOREST:
            return "forest"
        case Adventure.GREAT_LAKE:
            return "great-lake"
    }
}

import { IsoDatetime } from "utils/types"

export type BaseShare = {
    adventure: BaseShareAdventure
    baseShares: number
    datetime: IsoDatetime
}

export type BaseShareAdventure = "pond" | "stream" | "swamp" | "river" | "forest" | "great-lake"

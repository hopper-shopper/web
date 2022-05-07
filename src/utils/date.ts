import { format } from "date-fns"
import { IsoDate, IsoDatetime } from "./types"

export function toIsoDate(date: Date): IsoDate {
    return format(date, "yyyy-MM-dd")
}

export function toIsoDatetime(date: Date): IsoDatetime {
    return date.toISOString()
}

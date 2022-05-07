import { format } from "date-fns"
import { IsoDate, IsoDatetime } from "./types"

export function fromIsoDate(isoDate: IsoDate): Date {
    return new Date(Date.parse(isoDate))
}

export function toIsoDate(date: Date): IsoDate {
    return format(date, "yyyy-MM-dd")
}

export function fromIsoDatetime(isoDatetime: IsoDatetime): Date {
    return new Date(Date.parse(isoDatetime))
}

export function toIsoDatetime(date: Date): IsoDatetime {
    return date.toISOString()
}

import { format } from "date-fns"
import { DateLike, IsoDate, IsoDatetime } from "./types"

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

export function fromDateLike(dateLike: DateLike): Date | null {
    if (dateLike instanceof Date) {
        return dateLike
    } else if (typeof dateLike === "number") {
        return new Date(dateLike)
    } else if (typeof dateLike === "string") {
        const unix = Date.parse(dateLike)
        if (Number.isNaN(unix)) {
            return null
        } else {
            return new Date(unix)
        }
    }

    return null
}

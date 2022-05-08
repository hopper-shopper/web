import { fromDateLike } from "utils/date"
import { DateLike } from "utils/types"

export function formatDateTime(
    dateLike: DateLike,
    formatOptions?: Intl.DateTimeFormatOptions,
): string {
    const date = fromDateLike(dateLike)
    if (date === null) {
        return "Unknown date"
    }

    const formatter = new Intl.DateTimeFormat([], {
        dateStyle: "short",
        timeStyle: "short",
        ...formatOptions,
    })
    return formatter.format(date)
}

export function formatMonth(
    dateLike: DateLike,
    formatOptions?: Intl.DateTimeFormatOptions,
): string {
    const date = fromDateLike(dateLike)
    if (date === null) {
        return "Unknown month"
    }

    const formatter = new Intl.DateTimeFormat([], {
        timeStyle: undefined,
        month: "long",
        ...formatOptions,
    })
    return formatter.format(date)
}

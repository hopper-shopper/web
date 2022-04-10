export type DateLike = Date | number | string

export function dateLikeToDate(dateLike: DateLike): Date | null {
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

export function formatDateTime(
    dateLike: DateLike,
    formatOptions?: Intl.DateTimeFormatOptions,
): string {
    const date = dateLikeToDate(dateLike)
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
    const date = dateLikeToDate(dateLike)
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

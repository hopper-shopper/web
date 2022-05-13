import { LocaleFormatter } from "./_common"

export function formatPercent(value: number, formatOptions?: Intl.NumberFormatOptions): string {
    const formatter = new Intl.NumberFormat([], {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        ...formatOptions,
        style: "percent",
    })

    return formatter.format(value)
}

export function getPercentFormatter(
    formatOptions: Intl.NumberFormatOptions,
): LocaleFormatter<number> {
    return new Intl.NumberFormat([], {
        ...formatOptions,
        style: "percent",
    }).format
}

export function formatPercent(value: number, formatOptions?: Intl.NumberFormatOptions): string {
    const formatter = new Intl.NumberFormat([], {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        ...formatOptions,
        style: "percent",
    })

    return formatter.format(value)
}

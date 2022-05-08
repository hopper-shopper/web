export function formatPercent(value: number): string {
    const formatter = new Intl.NumberFormat([], {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    })

    return formatter.format(value)
}

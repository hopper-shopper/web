export enum Currency {
    AVAX = "AVAX",
    EUR = "EUR",
}

export function formatCurrency(value: number, currency: Currency): string {
    if (currency === Currency.EUR) {
        return new Intl.NumberFormat([], {
            style: "currency",
            currency: "eur",
        }).format(value)
    }

    const formatter = new Intl.NumberFormat([], {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })
    return `${formatter.format(value)} AVAX`
}

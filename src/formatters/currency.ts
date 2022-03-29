export enum Currency {
    AVAX = "AVAX",
    FLY = "FLY",
    EUR = "EUR",
}

export function formatCurrencyName(currency: Currency): string {
    switch (currency) {
        case Currency.AVAX:
            return "AVAX"
        case Currency.FLY:
            return "FLY"
        case Currency.EUR:
            return "€"
    }
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
    return `${formatter.format(value)} ${formatCurrencyName(currency)}`
}

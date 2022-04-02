export enum Currency {
    AVAX = "AVAX",
    FLY = "FLY",
    EUR = "EUR",
    USD = "USD",
}

export function formatCurrencyName(currency: Currency): string {
    switch (currency) {
        case Currency.AVAX:
            return "AVAX"
        case Currency.FLY:
            return "FLY"
        case Currency.EUR:
            return "€"
        case Currency.USD:
            return "$"
    }
}

export function formatCurrency(value: number, currency: Currency): string {
    if (currency === Currency.EUR) {
        return new Intl.NumberFormat([], {
            style: "currency",
            currency,
        }).format(value)
    }

    const formatter = new Intl.NumberFormat([], {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })
    return `${formatter.format(value)} ${formatCurrencyName(currency)}`
}

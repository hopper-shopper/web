import { LocaleFormatter } from "./_common"

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
    if (currency === Currency.EUR || currency === Currency.USD) {
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

type CompactUnit = readonly [divisor: number, unit: string]

export function getCompactCurrencyFormatter(
    currency: Currency,
    mapping: Array<CompactUnit>,
): LocaleFormatter<number> {
    const positiveSortedMappings = [...mapping].sort(([a], [b]) => {
        return b - a
    })
    const negativeSortedMappings = [...mapping].sort(([a], [b]) => {
        return a - b
    })

    const formatter = new Intl.NumberFormat([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })

    return value => {
        let bestFit: CompactUnit | undefined
        if (value >= 0) {
            bestFit = positiveSortedMappings.find(mapping => {
                return mapping[0] <= value
            })
        } else {
            bestFit = negativeSortedMappings.find(mapping => {
                return mapping[0] >= value
            })
        }

        if (!bestFit) {
            return formatter.format(value)
        }

        const [divisor, unit] = bestFit

        const scaled = value / Math.abs(divisor)

        return `${formatter.format(scaled)}${unit} ${formatCurrencyName(currency)}`
    }
}

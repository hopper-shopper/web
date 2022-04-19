import { Currency } from "formatters/currency"
import { atom } from "jotai"
import { AvaxPrice, FlyPrice, Price } from "models/Price"
import { currencyAtom } from "./settings"

export const DEFAULT_PRICE: Price = {
    AVAX: {
        EUR: 0,
        USD: 0,
        FLY: 0,
    },
    FLY: {
        EUR: 0,
        USD: 0,
        AVAX: 0,
    },
}

export const pricesAtom = atom(DEFAULT_PRICE)

export const avaxPriceAtom = atom(
    get => get(pricesAtom).AVAX,
    (_, set, price: AvaxPrice) => {
        set(pricesAtom, prev => ({ ...prev, AVAX: price }))
    },
)
export const avaxPriceByCurrencyAtom = atom(get => {
    const currency = get(currencyAtom)
    switch (currency) {
        case Currency.EUR:
            return get(avaxPriceAtom).EUR
        case Currency.USD:
            return get(avaxPriceAtom).USD
        case Currency.FLY:
            return get(avaxPriceAtom).FLY
        case Currency.AVAX:
            return 1
    }
})
export const flyPriceAtom = atom(
    get => get(pricesAtom).FLY,
    (_, set, price: FlyPrice) => {
        set(pricesAtom, prev => ({ ...prev, FLY: price }))
    },
)
export const flyPriceByCurrencyAtom = atom(get => {
    const currency = get(currencyAtom)
    switch (currency) {
        case Currency.EUR:
            return get(flyPriceAtom).EUR
        case Currency.USD:
            return get(flyPriceAtom).USD
        case Currency.AVAX:
            return get(flyPriceAtom).AVAX
        case Currency.FLY:
            return 1
    }
})

import { Price } from "models/Price"
import createStore from "zustand"

export type PricesStore = {
    price: Price
    setAvaxPrice: (prices: Partial<Price["AVAX"]>) => void
    setFlyPrice: (prices: Partial<Price["FLY"]>) => void
}

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

const DEFAULT_STORE: PricesStore = {
    price: DEFAULT_PRICE,
    setAvaxPrice: () => {},
    setFlyPrice: () => {},
}

export default createStore<PricesStore>(set => ({
    ...DEFAULT_STORE,
    setAvaxPrice: priceUpdate =>
        set(prev => ({
            ...prev,
            price: {
                ...prev.price,
                AVAX: {
                    ...prev.price.AVAX,
                    ...priceUpdate,
                },
            },
        })),
    setFlyPrice: priceUpdate =>
        set(prev => ({
            ...prev,
            price: {
                ...prev.price,
                FLY: {
                    ...prev.price.FLY,
                    ...priceUpdate,
                },
            },
        })),
}))

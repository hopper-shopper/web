export type Price = {
    AVAX: AvaxPrice
    FLY: FlyPrice
}

export type CoinPrices = {
    EUR: number
    USD: number
}

export type AvaxPrice = CoinPrices & { FLY: number }
export type FlyPrice = CoinPrices & { AVAX: number }

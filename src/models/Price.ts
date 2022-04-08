export type Price = {
    AVAX: CoinPrices & { FLY: number }
    FLY: CoinPrices & { AVAX: number }
}

export type CoinPrices = {
    EUR: number
    USD: number
}

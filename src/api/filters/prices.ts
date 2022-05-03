import { IsoDatetime } from "utils/types"

export type HistoricalPricesFilter = {
    dates: IsoDatetime[]
    coin: "fly" | "avax"
    currency: "usd" | "eur"
}

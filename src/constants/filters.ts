export enum Market {
    ON = "ON",
    OFF = "OFF",
    ANY = "ANY",
}

export function getMarketFilter(market: Market): string {
    switch (market) {
        case Market.ON:
            return "yes"
        case Market.OFF:
            return "no"
        case Market.ANY:
            return "any"
    }
}

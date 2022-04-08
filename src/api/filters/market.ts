export type ListingsFilter = {
    tokenIds: string[]
    sold?: SoldFilter
}

export enum SoldFilter {
    ANY = "ANY",
    SOLD = "SOLD",
    NOT_SOLD = "NOT_SOLD",
}
export function urlifySoldFilter(soldFilter: SoldFilter): string {
    switch (soldFilter) {
        case SoldFilter.ANY:
            return "any"
        case SoldFilter.SOLD:
            return "yes"
        case SoldFilter.NOT_SOLD:
            return "no"
    }
}

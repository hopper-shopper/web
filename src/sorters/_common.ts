export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export type SortOptions<SortBy> = {
    by: SortBy
    direction: SortDirection
}

export type SortFn<T, SortBy> = (collection: T[], options: SortOptions<SortBy>) => T[]
export type Sorter<T> = (collection: T[]) => T[]

export function applySortDirection<T>(sortedCollection: T[], direction: SortDirection): T[] {
    switch (direction) {
        case SortDirection.ASC:
            return sortedCollection
        case SortDirection.DESC:
            return sortedCollection.reverse()
    }
}

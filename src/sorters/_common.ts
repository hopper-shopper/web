export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export type SortOptions<SortBy> = {
    by: SortBy
    direction: SortDirection
}

export type SortFn<T, SortBy> = (collection: T[], options: SortOptions<SortBy>) => T[]

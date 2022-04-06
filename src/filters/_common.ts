export type FilterFn<T> = {
    (collection: T[]): T[]
    signature: string
}

export enum NumberComparison {
    EQ,
    GE,
    GT,
    LE,
    LT,
}

export function compareNumber(
    comparison: NumberComparison,
    actual: number,
    expected: number,
): boolean {
    switch (comparison) {
        case NumberComparison.EQ:
            return actual === expected
        case NumberComparison.GE:
            return actual >= expected
        case NumberComparison.GT:
            return actual > expected
        case NumberComparison.LE:
            return actual <= expected
        case NumberComparison.LT:
            return actual < expected
    }
}

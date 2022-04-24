export type SingularPluralFormatter = (count: number) => string

export function getSPFormatter(singular: string, plural: string): SingularPluralFormatter {
    return count => {
        const abs = Math.abs(count)
        if (abs === 1) {
            return singular
        }

        return plural
    }
}

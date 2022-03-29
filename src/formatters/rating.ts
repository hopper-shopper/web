export function formatRating(rating: number): string {
    return new Intl.NumberFormat([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(rating * 100)
}

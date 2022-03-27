export function formatRating(rating: number): string {
    return new Intl.NumberFormat([], {
        maximumFractionDigits: 0,
    }).format(rating)
}

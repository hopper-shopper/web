import { Hopper } from "models/Hopper"
import { Adventure, calculateMaxRatingPrice } from "utils/adventures"

export function formatRating(rating: number): string {
    return new Intl.NumberFormat([], {
        maximumFractionDigits: 0,
    }).format(rating)
}

export function formatRatingPremium(adventure: Adventure, hopper: Hopper): string {
    const formatter = new Intl.NumberFormat([], {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })

    const normalPrice = hopper.listing.price
    const maxPrice = calculateMaxRatingPrice(adventure, hopper)

    const premium = maxPrice / normalPrice
    return `x ${formatter.format(premium)}`
}

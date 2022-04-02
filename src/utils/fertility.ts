import { Hopper } from "models/Hopper"

export function calculateMaxFertilityRatingPrice(hopper: Hopper): number {
    const rating = hopper.fertility / 10
    return hopper.listing.price / rating
}

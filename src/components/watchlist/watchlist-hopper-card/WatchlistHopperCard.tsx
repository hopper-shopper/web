import BaseStatsList from "components/hoppers/hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import FlyEarnings from "components/hoppers/hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import MarketPrice from "components/hoppers/hopper-card/hopper-card-features/market-price/MarketPrice"
import PermitDetails from "components/hoppers/hopper-card/hopper-card-features/permit-details/PermitDetails"
import HopperCard from "components/hoppers/hopper-card/HopperCard"
import { Hopper } from "models/Hopper"
import { WatchlistCardFeature } from "../configure-watchlist-filter/ConfigureWatchlistFilter"

type WatchlistHopperCardProps = {
    hopper: Hopper
    features: WatchlistCardFeature[]
}

export default function WatchlistHopperCard(props: WatchlistHopperCardProps) {
    const { hopper, features } = props

    return (
        <HopperCard hopper={hopper}>
            <BaseStatsList />

            {features.includes(WatchlistCardFeature.MARKET_PRICE) && <MarketPrice />}
            {features.includes(WatchlistCardFeature.ADVENTURE_PERMIT) && <PermitDetails />}
            {features.includes(WatchlistCardFeature.FLY_EARNINGS) && <FlyEarnings />}
        </HopperCard>
    )
}

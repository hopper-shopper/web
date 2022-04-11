import BaseStatsList from "components/hoppers/hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import BoughtFor from "components/hoppers/hopper-card/hopper-card-features/bought-for/BoughtFor"
import FlyEarnings from "components/hoppers/hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import PermitDetails from "components/hoppers/hopper-card/hopper-card-features/permit-details/PermitDetails"
import HopperCard from "components/hoppers/hopper-card/HopperCard"
import { Hopper } from "models/Hopper"
import { Listing } from "models/Listing"

type WalletHopperCardProps = {
    hopper: Hopper
    listings: Listing[]
}

export default function WalletHopperCard(props: WalletHopperCardProps) {
    const { hopper, listings } = props

    return (
        <HopperCard hopper={hopper}>
            <BaseStatsList />
            <BoughtFor listings={listings} />
            <PermitDetails />
            <FlyEarnings />
        </HopperCard>
    )
}

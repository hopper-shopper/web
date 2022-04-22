import BaseStatsList from "components/hoppers/hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import BoughtFor from "components/hoppers/hopper-card/hopper-card-features/bought-for/BoughtFor"
import FlyEarnings from "components/hoppers/hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import PermitDetails from "components/hoppers/hopper-card/hopper-card-features/permit-details/PermitDetails"
import CurrentAdventure from "components/hoppers/hopper-card/hopper-card-slots/current-adventure/CurrentAdventure"
import HopperCard from "components/hoppers/hopper-card/HopperCard"
import InspectPageLink from "components/inspect/inspect-page-link/InspectPageLink"
import Flex from "components/layout/flex/Flex"
import { useHopperContext } from "contests/HopperContext"
import { Hopper } from "models/Hopper"
import { Listing } from "models/Listing"

type WalletHopperCardProps = {
    hopper: Hopper
    listings: Listing[]
}

export default function WalletHopperCard(props: WalletHopperCardProps) {
    const { hopper, listings } = props

    return (
        <HopperCard hopper={hopper} rightSlot={<RightSlot />}>
            <BaseStatsList />
            <BoughtFor listings={listings} />
            <PermitDetails />
            <FlyEarnings />
        </HopperCard>
    )
}

function RightSlot() {
    const { hopper } = useHopperContext()

    return (
        <Flex direction="column" gap="none" y="end">
            <InspectPageLink hopperId={hopper.tokenId} />
            <CurrentAdventure />
        </Flex>
    )
}

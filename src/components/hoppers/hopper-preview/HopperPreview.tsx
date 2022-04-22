import Flex from "components/layout/flex/Flex"
import WatchlistButton from "components/watchlist/watchlist-button/WatchlistButton"
import { ProvideHopper } from "contests/HopperContext"
import { useAtomValue } from "jotai"
import { Hopper } from "models/Hopper"
import { watchlistAtom } from "stores/watchlist"
import { styled } from "theme"
import BaseStatsList from "../hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import CurrentLevel from "../hopper-card/hopper-card-features/current-level/CurrentLevel"
import FlyEarnings from "../hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import PermitDetails from "../hopper-card/hopper-card-features/permit-details/PermitDetails"

type HopperPreviewProps = {
    hopper: Hopper
}

export default function HopperPreview(props: HopperPreviewProps) {
    const { hopper } = props

    const watchlist = useAtomValue(watchlistAtom)

    return (
        <ProvideHopper hopper={hopper}>
            <StyledHopperPreview>
                <HopperBaseInfo>
                    <HopperImage src={hopper.image} />
                    <Flex gap="md">
                        <WatchlistButton hopperId={hopper.tokenId} />
                        <WatchlistText>
                            {watchlist.includes(hopper.tokenId) ? "Remove from" : "Add to"}{" "}
                            watchlist
                        </WatchlistText>
                    </Flex>
                </HopperBaseInfo>

                <HopperAnalysis>
                    <Column>
                        <CurrentLevel />
                        <BaseStatsList title />
                        <PermitDetails />
                    </Column>
                    <FlyEarnings />
                </HopperAnalysis>
            </StyledHopperPreview>
        </ProvideHopper>
    )
}

const StyledHopperPreview = styled("div", {
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    columnGap: "2rem",
})
const HopperImage = styled("img", {
    width: 200,
    borderRadius: "$md",
})
const WatchlistText = styled("span", {
    fontSize: "0.75rem",
    color: "$gray12",
})
const HopperBaseInfo = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
})
const HopperAnalysis = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "2rem",
    alignItems: "start",
})
const Column = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
})

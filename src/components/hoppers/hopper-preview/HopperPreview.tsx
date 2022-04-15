import Flex from "components/layout/flex/Flex"
import WatchlistButton from "components/watchlist/watchlist-button/WatchlistButton"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import useWatchlistStore from "stores/watchlist"
import HopperCardContext from "../hopper-card/HopperCardContext"
import BaseStatsList from "../hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import PermitDetails from "../hopper-card/hopper-card-features/permit-details/PermitDetails"
import FlyEarnings from "../hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import CurrentLevel from "../hopper-card/hopper-card-features/current-level/CurrentLevel"

type HopperPreviewProps = {
    hopper: Hopper
}

export default function HopperPreview(props: HopperPreviewProps) {
    const { hopper } = props

    const watchlist = useWatchlistStore(store => store.watchlist)

    return (
        <HopperCardContext.Provider value={{ hopper }}>
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
        </HopperCardContext.Provider>
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

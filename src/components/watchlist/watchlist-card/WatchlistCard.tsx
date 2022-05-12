import { Hopper } from "models/Hopper"
import { styled } from "theme"
import WatchlistButton from "../watchlist-button/WatchlistButton"

type WatchlistCardProps = {
    hopper: Hopper
}

export default function WatchlistCard(props: WatchlistCardProps) {
    const { hopper } = props

    return (
        <StyledCard>
            <Image src={hopper.image} />
            <span>{hopper.tokenId}</span>

            <RightSlot>
                <WatchlistButton hopperId={hopper.tokenId} />
            </RightSlot>
        </StyledCard>
    )
}

const StyledCard = styled("div", {
    padding: "0.5rem 1rem",
    borderRadius: "$md",
    border: "1px solid $gray6",
    backgroundColor: "$gray2",
    color: "$gray12",
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
})
const Image = styled("img", {
    size: 30,
    borderRadius: "$sm",
})
const RightSlot = styled("div", {
    marginLeft: "auto",
    display: "flex",
    columnGap: "0.5rem",
    justifyContent: "flex-end",
    alignItems: "center",
})

import IconButton from "components/inputs/buttons/icon-button/IconButton"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import WatchlistButton from "../watchlist-button/WatchlistButton"
import { IconEye, IconEyeOff } from "@tabler/icons"

type WatchlistCardProps = {
    hopper: Hopper
    hidden: boolean
    toggleHide: () => void
}

export default function WatchlistCard(props: WatchlistCardProps) {
    const { hopper, hidden, toggleHide } = props

    return (
        <StyledCard hidden={hidden}>
            <Image src={hopper.image} />
            <span>{hopper.tokenId}</span>

            <RightSlot>
                <IconButton onClick={toggleHide} size="sm">
                    {hidden ? <IconEyeOff /> : <IconEye />}
                </IconButton>
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
    variants: {
        hidden: {
            true: {
                opacity: 0.5,
            },
        },
    },
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

import { IconStar } from "@tabler/icons"
import { HopperId } from "models/Hopper"
import { styled } from "theme"
import { watchlistAtom, toggleWatchlistAtom } from "stores/watchlist"
import { useAtomValue, useSetAtom } from "jotai"

type WatchlistButtonProps = {
    hopperId: HopperId
}

export default function WatchlistButton(props: WatchlistButtonProps) {
    const { hopperId } = props

    const watchlist = useAtomValue(watchlistAtom)
    const toggle = useSetAtom(toggleWatchlistAtom)

    return (
        <Button inWatchlist={watchlist.includes(hopperId)} onClick={() => toggle(hopperId)}>
            <IconStar />
        </Button>
    )
}

const Button = styled("button", {
    all: "unset",
    size: "2rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "$yellow3",
    color: "$yellow7",
    "& > svg": {
        size: "1.25rem",
    },
    "&:hover": {
        backgroundColor: "$yellow4",
    },
    "&:focus": {
        backgroundColor: "$yellow5",
        outline: "2px solid $yellow8",
    },
    variants: {
        inWatchlist: {
            true: {
                "& > svg": {
                    fill: "$yellow9",
                    color: "$yellow9",
                },
            },
        },
    },
})

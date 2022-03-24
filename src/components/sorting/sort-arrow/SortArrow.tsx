import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons"

type SortArrowProps = {
    active: boolean
    direction: SortDirection
}

export default function SortArrow(props: SortArrowProps) {
    const { active, direction } = props

    return (
        <StyledIcon active={active}>
            {direction === SortDirection.ASC && <IconArrowNarrowUp />}
            {direction === SortDirection.DESC && <IconArrowNarrowDown />}
        </StyledIcon>
    )
}

const StyledIcon = styled("span", {
    color: "$gray11",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
        width: "1rem",
    },
    variants: {
        active: {
            false: {
                display: "none",
            },
        },
    },
})

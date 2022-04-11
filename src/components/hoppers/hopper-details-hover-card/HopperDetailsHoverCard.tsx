import { HoverCardContentProps } from "@radix-ui/react-hover-card"
import * as HoverCard from "components/hover-card/HoverCard"
import { Hopper } from "models/Hopper"
import { Link } from "react-router-dom"
import { styled } from "theme"
import { getInspectPageUrl } from "utils/url"
import BaseStatsList from "../hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import FlyEarnings from "../hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import PermitDetails from "../hopper-card/hopper-card-features/permit-details/PermitDetails"
import HopperCardContext from "../hopper-card/HopperCardContext"

type HopperDetailsHoverCardProps = HoverCardContentProps & {
    hopper: Hopper
}

export default function HopperDetailsHoverCard(props: HopperDetailsHoverCardProps) {
    const { hopper, children, ...restHoverCardProps } = props

    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
            <HoverCard.Content {...restHoverCardProps} css={{ width: 350 }}>
                <Details>
                    <HopperInfo>
                        <HopperImage src={hopper.image} />
                        <HopperStats>
                            <HopperId>Hopper-ID: {hopper.tokenId}</HopperId>
                            <HopperLevel>Level: {hopper.level}</HopperLevel>
                        </HopperStats>

                        <RightSlot>
                            <StyledLink to={getInspectPageUrl({ hopper: hopper.tokenId })}>
                                Inspect
                            </StyledLink>
                        </RightSlot>
                    </HopperInfo>

                    <HopperCardContext.Provider value={{ hopper }}>
                        <BaseStatsList />
                        <PermitDetails />
                        <FlyEarnings />
                    </HopperCardContext.Provider>
                </Details>

                <HoverCard.Arrow />
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

const HopperInfo = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
})
const RightSlot = styled("div", {
    marginLeft: "auto",
})
const StyledLink = styled(Link, {
    color: "$blue11",
    fontSize: "0.75rem",
    textDecoration: "none",
})
const HopperStats = styled("div", {
    display: "flex",
    flexDirection: "column",
})
const HopperId = styled("h3", {
    color: "$gray12",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    whiteSpace: "nowrap",
})
const HopperLevel = styled("span", {
    color: "$gray11",
    fontSize: "0.7rem",
})
const HopperImage = styled("img", {
    size: 50,
    borderRadius: "$sm",
})
const Details = styled("div", {
    display: "grid",
    rowGap: "1rem",
})

import { HoverCardContentProps } from "@radix-ui/react-hover-card"
import * as HoverCard from "components/hover-card/HoverCard"
import InspectPageLink from "components/inspect/inspect-page-link/InspectPageLink"
import Flex from "components/layout/flex/Flex"
import RightSlot from "components/layout/flex/RightSlot"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
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
                <Flex gap="md" direction="column" y="stretch">
                    <Flex gap="md" y="center">
                        <HopperImage src={hopper.image} />
                        <Flex direction="column" y="start">
                            <HopperId>Hopper-ID: {hopper.tokenId}</HopperId>
                            <HopperLevel>Level: {hopper.level}</HopperLevel>
                        </Flex>

                        <RightSlot>
                            <InspectPageLink hopperId={hopper.tokenId} />
                        </RightSlot>
                    </Flex>

                    <HopperCardContext.Provider value={{ hopper }}>
                        <BaseStatsList />
                        <PermitDetails />
                        <FlyEarnings />
                    </HopperCardContext.Provider>
                </Flex>

                <HoverCard.Arrow />
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

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

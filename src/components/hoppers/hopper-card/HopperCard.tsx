import { formatAdventure } from "formatters/adventure"
import { Hopper } from "models/Hopper"
import { Listing } from "models/Listing"
import { styled } from "theme"
import { getIdealAdventure } from "utils/adventures"
import { hopperAdventureToAdventure } from "utils/hopper"
import BaseStatsList from "./base-stats-list/BaseStatsList"
import BoughtFor from "./bought-for/BoughtFor"
import FlyEarnings from "./fly-earnings/FlyEarnings"
import PermitDetails from "./permit-details/PermitDetails"

type HopperCardProps = {
    hopper: Hopper
    listings?: Listing[]
}

export default function HopperCard(props: HopperCardProps) {
    const { hopper, listings } = props

    const hopperAdventure = hopperAdventureToAdventure(hopper)
    const idealAdventure = getIdealAdventure(hopper)

    return (
        <StyledCard>
            <CardHeader>
                <HopperImage src={hopper.image} />
                <HopperStats>
                    <HopperId>{hopper.tokenId}</HopperId>
                    <HopperLevel>Level: {hopper.level}</HopperLevel>
                </HopperStats>

                <RightSlot>
                    <StyledAdventure
                        ideal={
                            hopperAdventure === null
                                ? undefined
                                : hopperAdventure === idealAdventure
                        }>
                        {formatAdventure(hopperAdventure)}
                    </StyledAdventure>
                </RightSlot>
            </CardHeader>

            <Divider />

            <Details>
                <BaseStatsList hopper={hopper} />

                {listings && (
                    <Feature>
                        <FeatureTitle>Bought for</FeatureTitle>
                        <BoughtFor hopper={hopper} listings={listings} />
                    </Feature>
                )}

                <Feature>
                    <FeatureTitle>Adventure Permit</FeatureTitle>
                    <PermitDetails hopper={hopper} />
                </Feature>

                <Feature>
                    <FeatureTitle>FLY Earnings / Day</FeatureTitle>
                    <FlyEarnings hopper={hopper} />
                </Feature>
            </Details>
        </StyledCard>
    )
}

const StyledCard = styled("div", {
    backgroundColor: "$gray2",
    border: "1px solid $gray6",
    borderRadius: "$md",
    display: "grid",
    overflow: "hidden",
})
const CardHeader = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "$gray3",
})
const HopperImage = styled("img", {
    size: 50,
    borderRadius: "$sm",
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
})
const HopperLevel = styled("span", {
    color: "$gray11",
    fontSize: "0.7rem",
})
const RightSlot = styled("div", {
    marginLeft: "auto",
    textAlign: "right",
})
const StyledAdventure = styled("span", {
    fontSize: "1rem",
    color: "$gray11",
    variants: {
        ideal: {
            true: {
                color: "$teal11",
            },
            false: {
                color: "$red11",
            },
        },
    },
})
const Divider = styled("div", {
    height: 1,
    backgroundColor: "$gray6",
})
const Details = styled("div", {
    padding: "1rem",
    display: "grid",
    rowGap: "1rem",
})
const Feature = styled("div", {
    display: "grid",
    rowGap: "0.25rem",
})
const FeatureTitle = styled("h4", {
    color: "$gray11",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    fontWeight: 400,
})

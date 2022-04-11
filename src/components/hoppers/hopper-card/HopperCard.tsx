import { Hopper } from "models/Hopper"
import { PropsWithChildren } from "react"
import { styled } from "theme"
import HopperCardContext from "./HopperCardContext"

type HopperCardProps = {
    hopper: Hopper
    rightSlot?: React.ReactNode
}

export default function HopperCard(props: PropsWithChildren<HopperCardProps>) {
    const { hopper, rightSlot, children } = props

    return (
        <HopperCardContext.Provider value={{ hopper }}>
            <StyledCard>
                <CardHeader>
                    <HopperImage src={hopper.image} />
                    <HopperStats>
                        <HopperId>{hopper.tokenId}</HopperId>
                        <HopperLevel>Level: {hopper.level}</HopperLevel>
                    </HopperStats>

                    {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
                </CardHeader>

                <Divider />

                <Details>{children}</Details>
            </StyledCard>
        </HopperCardContext.Provider>
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
const Divider = styled("div", {
    height: 1,
    backgroundColor: "$gray6",
})
const Details = styled("div", {
    padding: "1rem",
    display: "grid",
    rowGap: "1rem",
})

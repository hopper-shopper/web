import { DialogProps } from "@radix-ui/react-dialog"
import * as Dialog from "components/dialog/Dialog"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import BaseStatsList from "../hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import FlyEarnings from "../hopper-card/hopper-card-features/fly-earnings/FlyEarnings"
import PermitDetails from "../hopper-card/hopper-card-features/permit-details/PermitDetails"
import HopperCardContext from "../hopper-card/HopperCardContext"

type HopperDetailsDialogProps = DialogProps & {
    hopper: Hopper
}

export default function HopperDetailsDialog(props: HopperDetailsDialogProps) {
    const { hopper, children, ...restDialogProps } = props

    return (
        <Dialog.Root {...restDialogProps}>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Content css={{ maxWidth: 375 }}>
                <Details>
                    <HopperInfo>
                        <HopperImage src={hopper.image} />
                        <HopperStats>
                            <HopperId>Hopper-ID: {hopper.tokenId}</HopperId>
                            <HopperLevel>Level: {hopper.level}</HopperLevel>
                        </HopperStats>
                    </HopperInfo>

                    <HopperCardContext.Provider value={{ hopper }}>
                        <BaseStatsList />
                        <PermitDetails />
                        <FlyEarnings />
                    </HopperCardContext.Provider>
                </Details>

                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Root>
    )
}

const HopperInfo = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
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
const HopperImage = styled("img", {
    size: 50,
    borderRadius: "$sm",
})
const Details = styled("div", {
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

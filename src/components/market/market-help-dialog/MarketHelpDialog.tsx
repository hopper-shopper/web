import * as Dialog from "components/dialog/Dialog"
import Button from "components/inputs/buttons/button/Button"
import Flex from "components/layout/flex/Flex"
import { styled } from "theme"

export default function MarketHelpDialog() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button size="sm">Help</Button>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>Market Help</Dialog.Title>

                <Content>
                    <Subject>
                        <SubjectTitle>Level Costs</SubjectTitle>
                        <Description>
                            Cost required to bring the Hopper to it's current level. Amount is
                            dependent on current FLY and AVAX price
                        </Description>
                    </Subject>

                    <Subject>
                        <SubjectTitle>Max. Price Fertility (Fertility Filter)</SubjectTitle>
                        <Description>
                            A price indicator showing how cheap the Hopper is compared to others.
                            The lower the "Max. Price Fertility" the better the deal. Calculated
                            based on
                            <br />
                            fertility, price and level costs
                        </Description>
                        <Hint>
                            Want to snipe cheap breeding frogs? Sort by "Max. Price Fertility" in
                            ascending order
                        </Hint>
                    </Subject>

                    <Subject>
                        <SubjectTitle>Cost 50 % Chance (Fertility Filter)</SubjectTitle>
                        <Description>
                            Cost in FLY to reach a chance of 50 % in the breading pool
                        </Description>
                    </Subject>

                    <Subject>
                        <SubjectTitle>Rating (Permit Filter)</SubjectTitle>
                        <Description>
                            An indicator showing how good a Hopper is in the selected adventure
                            (Permit). Value between 1 and 100. Higher rating means higher FLY
                            production. Calculated based on the stats required for the selected
                            adventure
                        </Description>
                    </Subject>

                    <Subject>
                        <SubjectTitle>Max. Price (Permit Filter)</SubjectTitle>
                        <Description>
                            A price indicator showing how cheap the Hopper is compared to others.
                            The lower the "Max. Price" the better the deal. Calculated based on{" "}
                            <br />
                            rating and price
                        </Description>
                        <Hint>
                            Want to snipe cheap frogs for the selected adventure? Sort by "Max.
                            Price" in ascending order
                        </Hint>
                    </Subject>

                    <Subject>
                        <SubjectTitle>Base FLY / Level (Permit Filter)</SubjectTitle>
                        <Description>
                            An estimation of how much the Hopper would earn if send to the selected
                            adventure. Value is per level so actual FLY earnings are obtained by
                            multiplying "Base FLY / Level" with the Hopper's current level
                        </Description>
                        <Hint>
                            Hover over the Hopper image on the left to get estimations of FLY
                            earnings by all adventures (click on "Inspect" on mobile)
                        </Hint>
                    </Subject>
                </Content>

                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Root>
    )
}

// Components
const Content = styled("div", {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    px: "2rem",
    mx: "-2rem",
    overflowY: "auto",
})
const Subject = styled("div", {})
const SubjectTitle = styled("h3", {
    fontSize: "0.875rem",
    color: "$gray11",
    fontWeight: 500,
    lineHeight: 2,
})
const Description = styled("p", {
    color: "$gray12",
    fontSize: "1rem",
    lineHeight: 1.5,
})
const Hint = styled("p", {
    color: "$blue11",
    fontSize: "0.75rem",
    lineHeight: 1.5,
    padding: "0.25rem 0.5rem",
    borderLeft: "2px solid $blue6",
    marginTop: "0.25rem",
})

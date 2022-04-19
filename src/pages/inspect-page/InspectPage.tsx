import useHoppers from "api/hooks/useHoppers"
import useHoppersListings from "api/hooks/useHoppersListings"
import HopperPreview from "components/hoppers/hopper-preview/HopperPreview"
import HopperRoi from "components/hoppers/hopper-roi/HopperRoi"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import InputForm from "components/inputs/input-form/InputForm"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import * as Section from "components/layout/section/Section"
import ListingsTable from "components/listings/listings-table/ListingsTable"
import { Hopper } from "models/Hopper"
import { Screens, styled } from "theme"
import { isValidHopperId } from "utils/hopper"
import useInspectPageState from "./useInspectPageState"

export default function InspectPage() {
    const [state, setState] = useInspectPageState()

    const { hoppers } = useHoppers({
        tokenIds: state.hopperId ? [state.hopperId] : [],
    })
    const { listings } = useHoppersListings({
        tokenIds: state.hopperId ? [state.hopperId] : [],
    })
    const hopper = state.hopperId ? (hoppers[0] as Hopper | null) : null

    const handleHopperIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const hopperId = formData.get("hopper")

        if (!hopperId) {
            return
        }

        if (!isValidHopperId(hopperId.toString())) {
            return
        }

        setState({ hopperId: hopperId.toString() })
    }

    return (
        <>
            <InputForm css={{ maxWidth: 375 }} onSubmit={handleHopperIdSubmit}>
                <Fieldset css={{ flex: 1 }}>
                    <Label htmlFor="hopper-id">Hopper-ID</Label>
                    <Input
                        id="hopper-id"
                        name="hopper"
                        type="number"
                        min={0}
                        max={9999}
                        placeholder="Hopper-ID"
                        defaultValue={state.hopperId || ""}
                    />
                </Fieldset>

                <Button type="submit">Load</Button>
            </InputForm>

            {hopper && (
                <Container>
                    <Section.Root>
                        <Section.Title>Hopper</Section.Title>
                        <HopperPreview hopper={hopper} />
                    </Section.Root>

                    <Section.Root>
                        <Section.Title>Listings</Section.Title>
                        {listings.length === 0 && (
                            <EmptyText>Could not find any listings for Hopper</EmptyText>
                        )}
                        {listings.length > 0 && <ListingsTable listings={listings} />}
                    </Section.Root>

                    <Section.Root>
                        <Section.Title>ROI</Section.Title>
                        <HopperRoi hopper={hopper} />
                    </Section.Root>
                </Container>
            )}
        </>
    )
}

const EmptyText = styled("p", {
    color: "$gray11",
    fontSize: "1rem",
    lineHeight: 1.25,
})
const Container = styled("div", {
    maxWidth: Screens.lg,
    margin: "5rem auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})

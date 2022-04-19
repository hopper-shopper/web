import useHoppers from "api/hooks/useHoppers"
import HopperPreview from "components/hoppers/hopper-preview/HopperPreview"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import * as Section from "components/layout/section/Section"
import { Hopper } from "models/Hopper"
import React from "react"
import { Screens, styled } from "theme"
import useRoiCalculatorPageState from "./useRoiCalculatorPageState"

export default function RoiCalculatorPage() {
    const [state, setState] = useRoiCalculatorPageState()

    const { hoppers } = useHoppers({
        tokenIds: state.hopperId ? [state.hopperId] : [],
    })
    const hopper = hoppers[0] as Hopper | null

    const handleHopperIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const hopperId = formData.get("hopper")

        if (!hopperId) {
            return
        }

        const hopperIdNumber = parseInt(hopperId.toString())
        if (Number.isNaN(hopperIdNumber) || hopperIdNumber < 0 || hopperIdNumber > 9999) {
            return
        }

        setState({ hopperId: `${hopperIdNumber}` })
    }

    // Cost in FLY
    // Daily earnings in FLY
    // ROI for FLY in Days (with same price; +x %; -x %)

    return (
        <>
            <InputContainer onSubmit={handleHopperIdSubmit}>
                <Fieldset css={{ flex: 1 }}>
                    <Label htmlFor="hopper-id">Hopper-ID</Label>
                    <Input
                        id="hopper-id"
                        name="hopper"
                        type="number"
                        min={0}
                        max={9999}
                        defaultValue={state.hopperId}
                        placeholder="Hopper-ID"
                    />
                </Fieldset>

                <Button type="submit">Load</Button>
            </InputContainer>

            {hopper && (
                <Container>
                    <Section.Root>
                        <Section.Title>Hopper</Section.Title>
                        <HopperPreview hopper={hopper} />
                    </Section.Root>
                </Container>
            )}
        </>
    )
}

// Components
const InputContainer = styled("form", {
    maxWidth: Screens.sm,
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    columnGap: "1rem",
})
const Container = styled("div", {
    maxWidth: Screens.lg,
    margin: "5rem auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})

import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import { styled } from "theme"

type HopperRoiProps = {
    hopper: Hopper
}

export default function HopperRoi(props: HopperRoiProps) {
    const { hopper } = props

    const [boughtFor, setBoughtFor] = useState(hopper.listing.price)
    const handleBoughtForBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        setBoughtFor(Number.isNaN(value) ? 0 : value)
    }

    return (
        <Container>
            <Fieldset css={{ maxWidth: 200 }}>
                <Label htmlFor="bought-for">Hopper price</Label>
                <Input
                    id="bought-for"
                    type="number"
                    placeholder="Price in AVAX"
                    defaultValue={boughtFor || ""}
                    onBlur={handleBoughtForBlur}
                />
            </Fieldset>
        </Container>
    )
}

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
})

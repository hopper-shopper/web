import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import InputForm from "components/inputs/input-form/InputForm"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import { useAtomValue } from "jotai"
import { HopperId } from "models/Hopper"
import { inspectHistoryAtom } from "stores/inspect"
import { Screens, styled } from "theme"
import { isValidHopperId } from "utils/hopper"

type EnterHopperContentProps = {
    initialHopper?: HopperId
    onChange: (hopperId: HopperId) => void
}

export default function EnterHopperContent(props: EnterHopperContentProps) {
    const { initialHopper, onChange } = props

    const hoppersHistory = useAtomValue(inspectHistoryAtom)

    const handleHopperSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const hopperId = formData.get(HOPPER_ID_INPUT)

        if (!hopperId) {
            onChange("")
            return
        }

        if (!isValidHopperId(hopperId.toString())) {
            onChange("")
            return
        }

        onChange(hopperId.toString())
    }

    return (
        <>
            <Container>
                <InputForm onSubmit={handleHopperSubmit}>
                    <Fieldset css={{ flex: 1 }}>
                        <Label htmlFor="hopper-id">Hopper-ID</Label>
                        <Input
                            id="hopper-id"
                            name={HOPPER_ID_INPUT}
                            type="number"
                            min={0}
                            max={9999}
                            placeholder="Hopper-ID"
                            defaultValue={initialHopper || ""}
                        />
                    </Fieldset>

                    <Button type="submit">Load</Button>
                </InputForm>
            </Container>

            {hoppersHistory.length > 0 && (
                <Container css={{ mt: "2rem" }}>
                    <PrevHoppersTitle>Previous searches</PrevHoppersTitle>
                    <PrevHoppersList>
                        {hoppersHistory.slice(0, 5).map(prevHopper => (
                            <PrevHopperItem
                                key={prevHopper.hopperId}
                                onClick={() => onChange(prevHopper.hopperId)}>
                                <PrevHopperImage src={prevHopper.image ?? ""} />
                                <PrevHopperId>{prevHopper.hopperId}</PrevHopperId>
                            </PrevHopperItem>
                        ))}
                    </PrevHoppersList>
                </Container>
            )}
        </>
    )
}

const HOPPER_ID_INPUT = "hopper-id"

const Container = styled("div", {
    mx: "auto",
    maxWidth: Screens.xs,
})
const PrevHoppersTitle = styled("h3", {
    fontSize: "1rem",
    color: "$gray12",
    fontWeight: 400,
    marginBottom: "0.5rem",
})
const PrevHoppersList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1rem",
})
const PrevHopperItem = styled("button", {
    all: "unset",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "0.5rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "$md",
    cursor: "default",
    color: "$gray11",
    "&:hover": {
        backgroundColor: "$gray3",
        color: "$gray12",
    },
    "&:focus": {
        outline: "none",
    },
})
const PrevHopperImage = styled("img", {
    size: 40,
    borderRadius: "50%",
    backgroundColor: "$gray9",
})
const PrevHopperId = styled("span", {
    fontSize: "0.875rem",
})

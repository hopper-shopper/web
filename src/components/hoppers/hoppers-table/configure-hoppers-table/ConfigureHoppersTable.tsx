import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import * as Radio from "components/inputs/radio/Radio"
import Flex from "components/layout/flex/Flex"
import { styled } from "theme"
import { Adventure } from "utils/adventures"

type ConfigureHoppersTableProps = {
    configuration: HoppersTableConfiguration
    onChange: (configuration: Partial<HoppersTableConfiguration>) => void
}

export default function ConfigureHoppersTable(props: ConfigureHoppersTableProps) {
    const { configuration, onChange } = props

    const handleAdventureChange = (adventure: Adventure) => {
        onChange({ adventure })
    }
    const handleRatingGeChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        onChange({ ratingGe: Number.isNaN(value) ? 0 : value })
    }

    return (
        <Container>
            <Section>
                <SectionTitle>Ratings</SectionTitle>
                <Radio.Root
                    value={configuration.adventure}
                    onValueChange={adventure => handleAdventureChange(adventure as Adventure)}>
                    <SectionContent>
                        <Column>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.POND} id="adventure-pond">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-pond">Pond</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.STREAM} id="adventure-stream">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-stream">Stream</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.SWAMP} id="adventure-swamp">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-swamp">Swamp</Label>
                            </Flex>
                        </Column>

                        <Column>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.RIVER} id="adventure-river">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-river">River</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.FOREST} id="adventure-forest">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-forest">Forest</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.GREAT_LAKE} id="adventure-great-lake">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-great-lake">Great Lake</Label>
                            </Flex>
                        </Column>
                    </SectionContent>
                </Radio.Root>
            </Section>

            <Section>
                <SectionTitle>Filter</SectionTitle>
                <SectionContent>
                    <Fieldset>
                        <Label>Rating greater equals</Label>
                        <Input
                            type="number"
                            placeholder="Rating >="
                            defaultValue={configuration.ratingGe || ""}
                            onBlur={handleRatingGeChange}
                        />
                    </Fieldset>
                </SectionContent>
            </Section>
        </Container>
    )
}

// Types
export type HoppersTableConfiguration = {
    adventure: Adventure
    ratingGe: number
}

// Styles
const Container = styled("div", {
    display: "flex",
    columnGap: "5rem",
    alignItems: "flex-start",
})
const Section = styled("div", {
    display: "grid",
    rowGap: "1rem",
})
const SectionTitle = styled("h3", {
    fontSize: "1.125rem",
    color: "$gray11",
    lineHeight: 1.5,
    fontWeight: 500,
})
const SectionContent = styled("div", {
    display: "flex",
    columnGap: "2rem",
})
const Column = styled("div", {
    display: "grid",
    rowGap: "1rem",
})

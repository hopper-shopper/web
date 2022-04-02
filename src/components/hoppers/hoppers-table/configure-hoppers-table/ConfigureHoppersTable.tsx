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
        onChange({ permit: adventure, fertility: false })
    }
    const handleFertilityChange = (value: boolean) => {
        const updateData: Partial<HoppersTableConfiguration> = {
            fertility: value,
        }
        if (value) {
            updateData.permit = null
        }

        onChange(updateData)
    }
    const handleRatingGeChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        onChange({ ratingGe: Number.isNaN(value) ? 0 : value })
    }

    const handleFilterChange = (filterValue: string) => {
        if (filterValue === "fertility") {
            onChange({
                fertility: true,
                permit: null,
            })
        } else if (filterValue === "adventure") {
            onChange({
                fertility: false,
                permit: Adventure.POND,
            })
        } else if (filterValue === "none") {
            onChange({
                fertility: false,
                permit: null,
            })
        }
    }
    const filterValue = ((): string => {
        if (configuration.fertility) {
            return "fertility"
        } else if (configuration.permit !== null) {
            return "adventure"
        }
        return "none"
    })()

    return (
        <Container>
            <Section>
                <SectionTitle>Filter</SectionTitle>
                <Radio.Root value={filterValue} onValueChange={handleFilterChange}>
                    <SectionContent>
                        <Column>
                            <Flex gap="sm">
                                <Radio.Radio value="none" id="none">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="none">None</Label>
                            </Flex>

                            <Flex gap="sm">
                                <Radio.Radio value="adventure" id="adventure">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure">Adventure</Label>
                            </Flex>

                            <Flex gap="sm">
                                <Radio.Radio value="fertility" id="fertility">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="fertility">Fertility</Label>
                            </Flex>
                        </Column>
                    </SectionContent>
                </Radio.Root>
            </Section>

            {filterValue === "adventure" && (
                <>
                    <Section>
                        <SectionTitle>Permit</SectionTitle>
                        <Radio.Root
                            value={configuration.permit || ""}
                            onValueChange={adventure =>
                                handleAdventureChange(adventure as Adventure)
                            }>
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
                                        <Radio.Radio
                                            value={Adventure.GREAT_LAKE}
                                            id="adventure-great-lake">
                                            <Radio.Indicator />
                                        </Radio.Radio>
                                        <Label htmlFor="adventure-great-lake">Great Lake</Label>
                                    </Flex>
                                </Column>
                            </SectionContent>
                        </Radio.Root>
                    </Section>

                    <Section>
                        <SectionTitle>Refine filter</SectionTitle>
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
                </>
            )}
        </Container>
    )
}

// Types
export type HoppersTableConfiguration = {
    permit: Adventure | null
    ratingGe: number
    fertility: boolean
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

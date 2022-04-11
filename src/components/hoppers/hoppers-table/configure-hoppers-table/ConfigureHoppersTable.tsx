import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import * as Radio from "components/inputs/radio/Radio"
import Flex from "components/layout/flex/Flex"
import { styled } from "theme"
import { Adventure } from "utils/adventures"

type ConfigureHoppersTableProps = {
    configuration: HoppersTableConfiguration
    onChange: (configuration: HoppersTableConfiguration) => void
}

export default function ConfigureHoppersTable(props: ConfigureHoppersTableProps) {
    const { configuration, onChange } = props

    const handleAdventureChange = (adventure: Adventure) => {
        if (configuration.type !== HoppersTableConfigFilters.PERMIT) {
            return
        }

        onChange({ ...configuration, permit: adventure })
    }
    const handleRatingGeChange = (event: React.FocusEvent<HTMLInputElement>) => {
        if (configuration.type !== HoppersTableConfigFilters.PERMIT) {
            return
        }

        const value = event.target.valueAsNumber
        onChange({ ...configuration, ratingGe: Number.isNaN(value) ? 0 : value })
    }
    const handleFertilityGeChange = (event: React.FocusEvent<HTMLInputElement>) => {
        if (configuration.type !== HoppersTableConfigFilters.FERTILITY) {
            return
        }

        const value = event.target.valueAsNumber
        onChange({ ...configuration, fertilityGe: Number.isNaN(value) ? 0 : value })
    }

    const handleFilterChange = (filterValue: HoppersTableConfigFilters) => {
        if (filterValue === configuration.type) {
            return
        }

        if (filterValue === HoppersTableConfigFilters.FERTILITY) {
            onChange({
                type: HoppersTableConfigFilters.FERTILITY,
                fertilityGe: 0,
            } as HoppersTableConfigurationFertility)
        } else if (filterValue === HoppersTableConfigFilters.PERMIT) {
            onChange({
                type: HoppersTableConfigFilters.PERMIT,
                permit: Adventure.POND,
                ratingGe: 0,
            } as HoppersTableConfigurationPermit)
        } else if (filterValue === HoppersTableConfigFilters.NONE) {
            onChange({
                type: HoppersTableConfigFilters.NONE,
            } as HoppersTableConfigurationNone)
        }
    }

    return (
        <Container>
            <Section>
                <SectionTitle>Filter</SectionTitle>
                <Radio.Root value={configuration.type} onValueChange={handleFilterChange}>
                    <Column>
                        <Flex gap="sm">
                            <Radio.Radio value={HoppersTableConfigFilters.NONE} id="none">
                                <Radio.Indicator />
                            </Radio.Radio>
                            <Label htmlFor="none">None</Label>
                        </Flex>

                        <Flex gap="sm">
                            <Radio.Radio value={HoppersTableConfigFilters.FERTILITY} id="fertility">
                                <Radio.Indicator />
                            </Radio.Radio>
                            <Label htmlFor="fertility">Fertility</Label>
                        </Flex>

                        <Flex gap="sm">
                            <Radio.Radio value={HoppersTableConfigFilters.PERMIT} id="permit">
                                <Radio.Indicator />
                            </Radio.Radio>
                            <Label htmlFor="permit">Permit</Label>
                        </Flex>
                    </Column>
                </Radio.Root>
            </Section>

            {configuration.type === HoppersTableConfigFilters.PERMIT && (
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
                                    placeholder="Rating 0 - 100"
                                    defaultValue={configuration.ratingGe || ""}
                                    onBlur={handleRatingGeChange}
                                />
                            </Fieldset>
                        </SectionContent>
                    </Section>
                </>
            )}

            {configuration.type === HoppersTableConfigFilters.FERTILITY && (
                <Section>
                    <SectionTitle>Refine filter</SectionTitle>
                    <SectionContent>
                        <Fieldset>
                            <Label>Fertility greater equals</Label>
                            <Input
                                type="number"
                                placeholder="Fertility 1 - 10"
                                defaultValue={configuration.fertilityGe || ""}
                                onBlur={handleFertilityGeChange}
                            />
                        </Fieldset>
                    </SectionContent>
                </Section>
            )}
        </Container>
    )
}

// Types
export enum HoppersTableConfigFilters {
    NONE = "NONE",
    PERMIT = "PERMIT",
    FERTILITY = "FERTILITY",
}
export type HoppersTableConfigurationNone = {
    type: HoppersTableConfigFilters.NONE
}
export type HoppersTableConfigurationPermit = {
    type: HoppersTableConfigFilters.PERMIT
    permit: Adventure
    ratingGe: number
}
export type HoppersTableConfigurationFertility = {
    type: HoppersTableConfigFilters.FERTILITY
    fertilityGe: number
}
export type HoppersTableConfiguration =
    | HoppersTableConfigurationNone
    | HoppersTableConfigurationPermit
    | HoppersTableConfigurationFertility

// Styles
const Container = styled("div", {
    display: "flex",
    columnGap: "4rem",
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

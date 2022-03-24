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
        props.onChange({ adventure })
    }

    return (
        <Container>
            <Section>
                <SectionTitle>Ratings</SectionTitle>
                <Radio.Root
                    value={configuration.adventure}
                    onValueChange={adventure => handleAdventureChange(adventure as Adventure)}>
                    <SectionContent columns="2">
                        <Column>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.POND} id="adventure-pond">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-pond">Show Pond rating</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.STREAM} id="adventure-stream">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-stream">Show Stream rating</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.SWAMP} id="adventure-swamp">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-swamp">Show Swamp rating</Label>
                            </Flex>
                        </Column>

                        <Column>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.RIVER} id="adventure-river">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-river">Show River rating</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.FOREST} id="adventure-forest">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-forest">Show Forest rating</Label>
                            </Flex>
                            <Flex gap="sm">
                                <Radio.Radio value={Adventure.GREAT_LAKE} id="adventure-great-lake">
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor="adventure-great-lake">Show Great Lake rating</Label>
                            </Flex>
                        </Column>
                    </SectionContent>
                </Radio.Root>
            </Section>
        </Container>
    )
}

// Types
export type HoppersTableConfiguration = {
    adventure: Adventure
}

// Styles
const Container = styled("div", {})
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
    display: "grid",
    columnGap: "2rem",
    variants: {
        columns: {
            1: {},
            2: {
                gridTemplateColumns: "repeat(2, 1fr)",
            },
            3: {
                gridTemplateColumns: "repeat(3, 1fr)",
            },
        },
    },
    defaultVariants: {
        columns: "1",
    },
})
const Column = styled("div", {
    display: "grid",
    rowGap: "1rem",
})

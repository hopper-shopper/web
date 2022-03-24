import Flex from "components/layout/flex/Flex"
import { styled } from "theme"
import * as Checkbox from "components/inputs/checkbox/Checkbox"
import Label from "components/inputs/label/Label"

type ConfigureHoppersTableProps = {
    configuration: HoppersTableConfiguration
    onChange: (configuration: Partial<HoppersTableConfiguration>) => void
}

export default function ConfigureHoppersTable(props: ConfigureHoppersTableProps) {
    const { configuration, onChange } = props

    return (
        <Container>
            <Section>
                <SectionTitle>Ratings</SectionTitle>
                <SectionContent columns="2">
                    <Column>
                        <Flex gap="sm">
                            <Checkbox.Root
                                checked={configuration.showRatingPond}
                                onCheckedChange={(state: boolean) =>
                                    onChange({ showRatingPond: state })
                                }>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label>Show Pond rating</Label>
                        </Flex>
                        <Flex gap="sm">
                            <Checkbox.Root
                                checked={configuration.showRatingStream}
                                onCheckedChange={(state: boolean) =>
                                    onChange({ showRatingStream: state })
                                }>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label>Show Stream rating</Label>
                        </Flex>
                        <Flex gap="sm">
                            <Checkbox.Root
                                checked={configuration.showRatingSwamp}
                                onCheckedChange={(state: boolean) =>
                                    onChange({ showRatingSwamp: state })
                                }>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label>Show Swamp rating</Label>
                        </Flex>
                    </Column>

                    <Column>
                        <Flex gap="sm">
                            <Checkbox.Root
                                checked={configuration.showRatingRiver}
                                onCheckedChange={(state: boolean) =>
                                    onChange({ showRatingRiver: state })
                                }>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label>Show River rating</Label>
                        </Flex>
                        <Flex gap="sm">
                            <Checkbox.Root
                                checked={configuration.showRatingForest}
                                onCheckedChange={(state: boolean) =>
                                    onChange({ showRatingForest: state })
                                }>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label>Show Forest rating</Label>
                        </Flex>
                        <Flex gap="sm">
                            <Checkbox.Root
                                checked={configuration.showRatingGreatLake}
                                onCheckedChange={(state: boolean) =>
                                    onChange({ showRatingGreatLake: state })
                                }>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label>Show Great Lake rating</Label>
                        </Flex>
                    </Column>
                </SectionContent>
            </Section>
        </Container>
    )
}

// Types
export type HoppersTableConfiguration = {
    showRatingPond: boolean
    showRatingStream: boolean
    showRatingSwamp: boolean
    showRatingRiver: boolean
    showRatingForest: boolean
    showRatingGreatLake: boolean
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

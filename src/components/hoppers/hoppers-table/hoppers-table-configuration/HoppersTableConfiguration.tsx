import * as Dialog from "components/dialog/Dialog"
import Button from "components/inputs/buttons/button/Button"
import Grid from "components/layout/grid/Grid"
import { styled } from "theme"
import ColumnVisibilty from "./column-visibility/ColumnVisibility"

type HoppersTableConfigurationProps = {
    config: HoppersTableConfig
    onChange: (config: HoppersTableConfig) => void
}

export default function HoppersTableConfiguration(props: HoppersTableConfigurationProps) {
    const { config, onChange } = props

    const handleConfigChange = (updatedConfig: Partial<HoppersTableConfig>) => {
        onChange({
            ...config,
            ...updatedConfig,
        })
    }
    const getToggleColumnVisiblityHandler = (column: HoppersTableColumn) => {
        return () => {
            const newColumns = new Set(config.columns)

            if (newColumns.has(column)) {
                newColumns.delete(column)
            } else {
                newColumns.add(column)
            }

            handleConfigChange({
                columns: Array.from(newColumns),
            })
        }
    }

    const renderColumns = (title: string, columns: HoppersTableColumn[]): React.ReactNode => {
        return (
            <Grid gap="md">
                <GroupTitle>{title}</GroupTitle>
                {columns.map(column => (
                    <ColumnVisibilty
                        key={column}
                        column={column}
                        checked={config.columns.includes(column)}
                        toggle={getToggleColumnVisiblityHandler(column)}
                    />
                ))}
            </Grid>
        )
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button size="sm">Configure columns</Button>
            </Dialog.Trigger>

            <Dialog.Content css={{ maxWidth: 375, display: "flex", flexDirection: "column" }}>
                <Dialog.Title>Configure table columns</Dialog.Title>
                <Grid
                    gap="md"
                    css={{
                        flex: 1,
                        overflowY: "auto",
                        margin: "0 -2rem",
                        padding: "0 2rem 0.5rem",
                    }}>
                    {renderColumns("Base", BASE_HOPPER_TABLE_COLUMNS)}
                    {renderColumns("Permit filter", PERMIT_HOPPER_TABLE_COLUMNS)}
                    {renderColumns("Fertility filter", FERTILITY_HOPPER_TABLE_COLUMNS)}
                </Grid>
                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Root>
    )
}

// Types
export type HoppersTableConfig = {
    columns: HoppersTableColumn[]
}
export enum HoppersTableColumn {
    IMAGE,
    HOPPER_ID,
    LEVEL,
    STRENGTH,
    AGILITY,
    VITALITY,
    INTELLIGENCE,
    FERTILITY,
    PRICE,
    LEVEL_COSTS,
    MAX_PRICE,
    // Permit Filter
    RATING,
    BASE_FLY,
    // Fertility Filter
    FERTILITY_50,
    FERTILITY_75,
}

// Constants
export const BASE_HOPPER_TABLE_COLUMNS: HoppersTableColumn[] = [
    HoppersTableColumn.IMAGE,
    HoppersTableColumn.HOPPER_ID,
    HoppersTableColumn.LEVEL,
    HoppersTableColumn.STRENGTH,
    HoppersTableColumn.AGILITY,
    HoppersTableColumn.VITALITY,
    HoppersTableColumn.INTELLIGENCE,
    HoppersTableColumn.FERTILITY,
    HoppersTableColumn.PRICE,
    HoppersTableColumn.LEVEL_COSTS,
    HoppersTableColumn.MAX_PRICE,
]
export const PERMIT_HOPPER_TABLE_COLUMNS: HoppersTableColumn[] = [
    HoppersTableColumn.RATING,
    HoppersTableColumn.BASE_FLY,
]
export const FERTILITY_HOPPER_TABLE_COLUMNS: HoppersTableColumn[] = [
    HoppersTableColumn.FERTILITY_50,
    HoppersTableColumn.FERTILITY_75,
]
export const ALL_HOPPER_TABLE_COLUMNS: HoppersTableColumn[] = [
    ...BASE_HOPPER_TABLE_COLUMNS,
    ...PERMIT_HOPPER_TABLE_COLUMNS,
    ...FERTILITY_HOPPER_TABLE_COLUMNS,
]

// Components
const GroupTitle = styled("h3", {
    fontSize: "0.875rem",
    color: "$gray12",
    lineHeight: 1.5,
})

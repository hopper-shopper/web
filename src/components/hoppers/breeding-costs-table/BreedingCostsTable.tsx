import * as Table from "components/table/Table"
import { Currency, getCurrencyFormatter } from "formatters/currency"
import { getPercentFormatter } from "formatters/number"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import { calculateTadpoleChanceAtLevel } from "utils/fertility"
import { calculateLevelUpCosts } from "utils/level"

type BreedingCostsTableProps = {
    hopper: Hopper
}

export default function BreedingCostsTable(props: BreedingCostsTableProps) {
    const { hopper } = props

    return (
        <TableContainer>
            <Table.Root border={false}>
                <Table.Head sticky>
                    <Table.Row>
                        <Table.HeaderCell align="left">Level</Table.HeaderCell>
                        <Table.HeaderCell align="left">Level costs</Table.HeaderCell>
                        <Table.HeaderCell align="left">Breeding chance</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {LEVELS.slice(hopper.level - 1).map((level, index) => (
                        <Table.Row key={level} striped={index % 2 === 1}>
                            <Table.Cell>{level}</Table.Cell>
                            <Table.Cell>
                                {level === hopper.level
                                    ? "-"
                                    : flyFormatter(calculateLevelUpCosts(hopper.level, level))}
                            </Table.Cell>
                            <Table.Cell>
                                {percentFormatter(calculateTadpoleChanceAtLevel(level, hopper))}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Foot sticky />
            </Table.Root>
        </TableContainer>
    )
}

// Constants
const LEVELS = [...new Array(100)].map((_, i) => i + 1)

// Components
const TableContainer = styled("div", {
    maxHeight: 300,
    overflowY: "auto",
    border: "1px solid $gray6",
    borderRadius: "$md",
    "& thead tr th": {
        borderBottom: "1px solid $gray6",
    },
})

// Formatters
const percentFormatter = getPercentFormatter({
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})
const flyFormatter = getCurrencyFormatter(Currency.FLY, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

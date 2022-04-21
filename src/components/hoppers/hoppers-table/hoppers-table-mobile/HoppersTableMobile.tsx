import Screen from "components/layout/screen/Screen"
import { Virtuoso, VirtuosoGrid } from "react-virtuoso"
import { styled } from "theme"
import { HoppersTableProps } from "../HoppersTable"
import HopperTableCard from "./hopper-table-card/HopperTableCard"

export default function HoppersTableMobile(props: HoppersTableProps) {
    const { hoppers, filter } = props

    return (
        <>
            <Screen bp="md" constraint="max">
                <Virtuoso
                    useWindowScroll
                    data={hoppers}
                    itemContent={(_, hopper) => (
                        <Spacer>
                            <HopperTableCard hopper={hopper} filter={filter} />
                        </Spacer>
                    )}
                />
            </Screen>

            <Screen bp="md" constraint="min">
                <Screen bp="xl" constraint="max">
                    <VirtuosoGrid
                        useWindowScroll
                        totalCount={hoppers.length}
                        components={{
                            List: ListContainer,
                        }}
                        itemContent={index => (
                            <HopperTableCard hopper={hoppers[index]} filter={filter} />
                        )}
                    />
                </Screen>
            </Screen>
        </>
    )
}

// Components
const Spacer = styled("div", {
    padding: "0.25rem 0",
})
const ListContainer = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    "@lg": {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
})

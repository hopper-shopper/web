import { HoppersFilter } from "api/hoppers"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import { Adventure } from "constants/adventures"
import { Market } from "constants/filters"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import { useState } from "react"
import { globalCss, styled } from "./theme"

function App() {
    globalStyles()
    useApplyDarkMode()

    const [hoppersFilter, setHoppersFilter] = useState<HoppersFilter>({
        adventure: Adventure.RIVER,
        market: Market.ON,
    })

    return (
        <Container>
            <HoppersTable filter={hoppersFilter} />
        </Container>
    )
}

export default App

const Container = styled("div", {
    padding: "3rem",
    maxWidth: 1024,
    margin: "0 auto",
})

const globalStyles = globalCss({
    body: {
        backgroundColor: "$gray1",
    },
})

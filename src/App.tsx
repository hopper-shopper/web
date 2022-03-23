import { AdventureFilter, HoppersFilter, MarketFilter } from "api/filters/hoopers"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import { useState } from "react"
import { globalCss, styled } from "./theme"

function App() {
    globalStyles()
    useApplyDarkMode()

    const [hoppersFilter, setHoppersFilter] = useState<HoppersFilter>({
        adventure: AdventureFilter.RIVER,
        market: MarketFilter.ON,
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
})

const globalStyles = globalCss({
    body: {
        backgroundColor: "$gray1",
    },
})

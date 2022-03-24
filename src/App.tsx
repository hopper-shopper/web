import { AdventureFilter, HoppersFilter, MarketFilter } from "api/filters/hoopers"
import PageHeader from "components/headers/page-header/PageHeader"
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
        <>
            <PageHeader />
            <Container>
                <HoppersTable filter={hoppersFilter} />
            </Container>
        </>
    )
}

export default App

const Container = styled("div", {
    padding: "1rem",
})

const globalStyles = globalCss({
    body: {
        backgroundColor: "$gray1",
    },
})

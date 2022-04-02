import { AdventureFilter, HoppersFilter, MarketFilter, PermitFilter } from "api/filters/hoopers"
import PageHeader from "components/headers/page-header/PageHeader"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import { useState } from "react"
import { globalCss, styled } from "./theme"

function App() {
    globalStyles()
    useApplyDarkMode()

    const [hoppersFilter, setHoppersFilter] = useState<HoppersFilter>({
        adventure: AdventureFilter.ANY,
        permit: PermitFilter.ANY,
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
    padding: "2rem",
})

const globalStyles = globalCss({
    body: {
        backgroundColor: "$gray1",
    },
})

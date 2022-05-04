import useGasUpdater from "api/hooks/useGasUpdater"
import usePricesUpdater from "api/hooks/usePricesUpdater"
import PageFooter from "components/footers/page-footer/PageFooter"
import PageHeader from "components/headers/page-header/PageHeader"
import useApplyTheme from "hooks/useApplyTheme"
import InspectPage from "pages/inspect-page/InspectPage"
import MarketPage from "pages/market-page/MarketPage"
import WalletPage from "pages/wallet-page/WalletPage"
import WatchlistPage from "pages/watchlist-page/WatchlistPage"
import { Outlet, Route, Routes } from "react-router-dom"
import Redirect from "routing/Redirect"
import * as ROUTES from "routing/routes"
import { globalStyles, styled } from "./theme"

function App() {
    globalStyles()
    useApplyTheme()

    useGasUpdater()
    usePricesUpdater()

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path={ROUTES.MARKET} element={<MarketPage />} />
                <Route path={ROUTES.INSPECT} element={<InspectPage />} />
                <Route path={ROUTES.WALLET} element={<WalletPage />} />
                <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />

                <Route index element={<Redirect to={ROUTES.MARKET} />} />
            </Route>
        </Routes>
    )
}

export default App

const Main = styled("main", {
    minHeight: "100vh",
})
const Container = styled("div", {
    padding: "1rem",
    "@md": {
        padding: "2rem",
    },
})

function Layout() {
    return (
        <>
            <Main>
                <PageHeader />
                <Container>
                    <Outlet />
                </Container>
            </Main>
            <PageFooter />
        </>
    )
}

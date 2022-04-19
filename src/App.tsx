import useGasUpdater from "api/hooks/useGasUpdater"
import usePricesUpdater from "api/hooks/usePricesUpdater"
import PageHeader from "components/headers/page-header/PageHeader"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import InspectPage from "pages/inspect-page/InspectPage"
import MarketPage from "pages/market-page/MarketPage"
import WalletPage from "pages/wallet-page/WalletPage"
import WatchlistPage from "pages/watchlist-page/WatchlistPage"
import { Outlet, Route, Routes } from "react-router-dom"
import Redirect from "routing/Redirect"
import * as ROUTES from "routing/routes"
import { globalCss, styled } from "./theme"

function App() {
    globalStyles()
    useApplyDarkMode()

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

const Container = styled("div", {
    padding: "2rem",
})

const globalStyles = globalCss({
    body: {
        backgroundColor: "$gray1",
    },
})

function Layout() {
    return (
        <>
            <PageHeader />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

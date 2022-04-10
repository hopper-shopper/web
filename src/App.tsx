import PageHeader from "components/headers/page-header/PageHeader"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import MarketPage from "pages/market-page/MarketPage"
import { Outlet, Route, Routes } from "react-router-dom"
import Redirect from "routing/Redirect"
import { globalCss, styled } from "./theme"
import * as ROUTES from "routing/routes"
import WalletPage from "pages/wallet-page/WalletPage"
import WatchlistPage from "pages/watchlist-page/WatchlistPage"
import RoiCalculatorPage from "pages/roi-calculator-page/RoiCalculatorPage"

function App() {
    globalStyles()
    useApplyDarkMode()

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path={ROUTES.MARKET} element={<MarketPage />} />
                <Route path={ROUTES.WALLET} element={<WalletPage />} />
                <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
                <Route path={ROUTES.ROI} element={<RoiCalculatorPage />} />

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

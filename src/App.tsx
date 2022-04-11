import { fetchPrices } from "api/prices"
import PageHeader from "components/headers/page-header/PageHeader"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import InspectPage from "pages/inspect-page/InspectPage"
import MarketPage from "pages/market-page/MarketPage"
import RoiCalculatorPage from "pages/roi-calculator-page/RoiCalculatorPage"
import WalletPage from "pages/wallet-page/WalletPage"
import WatchlistPage from "pages/watchlist-page/WatchlistPage"
import { Outlet, Route, Routes } from "react-router-dom"
import { useInterval, useMount } from "react-use"
import Redirect from "routing/Redirect"
import * as ROUTES from "routing/routes"
import usePricesStore from "stores/prices"
import { globalCss, styled } from "./theme"

function App() {
    globalStyles()
    useApplyDarkMode()

    const [setAvaxPrice, setFlyPrice] = usePricesStore(store => [
        store.setAvaxPrice,
        store.setFlyPrice,
    ])

    const loadAndSavePrices = async () => {
        try {
            const prices = await fetchPrices()
            setAvaxPrice(prices.AVAX)
            setFlyPrice(prices.FLY)
        } catch (error) {
            console.error(error)
        }
    }
    useMount(loadAndSavePrices)
    useInterval(loadAndSavePrices, 30 * 1000)

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path={ROUTES.MARKET} element={<MarketPage />} />
                <Route path={ROUTES.INSPECT} element={<InspectPage />} />
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

import useGasUpdater from "api/hooks/useGasUpdater"
import usePricesUpdater from "api/hooks/usePricesUpdater"
import PageFooter from "components/footers/page-footer/PageFooter"
import PageHeader from "components/headers/page-header/PageHeader"
import WhatsNewDialog from "components/whats-new/WhatsNewDialog"
import useApplyTheme from "hooks/useApplyTheme"
import { useAtomValue, useSetAtom } from "jotai"
import AnalyticsPage from "pages/analytics-page/AnalyticsPage"
import InspectPage from "pages/inspect-page/InspectPage"
import MarketPage from "pages/market-page/MarketPage"
import WalletPage from "pages/wallet-page/WalletPage"
import WatchlistPage from "pages/watchlist-page/WatchlistPage"
import { useMemo } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import * as ROUTES from "routing/routes"
import { addSeenReleaseAtom, releasesAtom } from "stores/release"
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
                <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />

                <Route path="*" element={<Navigate to={ROUTES.MARKET} />} />
                <Route index element={<Navigate to={ROUTES.MARKET} />} />
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
    const seenReleases = useAtomValue(releasesAtom)
    const markReleaseAsSeen = useSetAtom(addSeenReleaseAtom)

    const hasSeenCurrentRelease = seenReleases.includes(RELEASE)
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            markReleaseAsSeen(RELEASE)
        }
    }

    return (
        <>
            <Main>
                <PageHeader />
                <Container>
                    <Outlet />
                </Container>
            </Main>
            <PageFooter />
            <WhatsNewDialog defaultOpen={!hasSeenCurrentRelease} onOpenChange={handleOpenChange} />
        </>
    )
}

const RELEASE = 1

import PageHeader from "components/headers/page-header/PageHeader"
import useApplyDarkMode from "hooks/useApplyDarkMode"
import StorePage from "pages/store-page/StorePage"
import { Outlet, Route, Routes } from "react-router-dom"
import Redirect from "routing/Redirect"
import { globalCss, styled } from "./theme"
import * as ROUTES from "routing/routes"
import WalletPage from "pages/wallet-page/WalletPage"

function App() {
    globalStyles()
    useApplyDarkMode()

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path={ROUTES.SHOP} element={<StorePage />} />
                <Route path={ROUTES.WALLET} element={<WalletPage />} />

                <Route index element={<Redirect to={ROUTES.SHOP} />} />
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

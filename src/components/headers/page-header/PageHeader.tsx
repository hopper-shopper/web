import Screen from "components/layout/screen/Screen"
import { styled } from "theme"
import DesktopHeaderContent from "./desktop-header-content/DesktopHeaderContent"
import MobileHeaderContent from "./mobile-header-content/MobileHeaderContent"

export default function PageHeader() {
    return (
        <Header>
            <Title>Hopper Shopper</Title>

            <Screen bp="xl" constraint="max">
                <MobileHeaderContent />
            </Screen>

            <Screen bp="xl" constraint="min">
                <DesktopHeaderContent />
            </Screen>
        </Header>
    )
}

const Header = styled("header", {
    backgroundColor: "$gray2",
    borderBottom: "1px solid $gray6",
    height: "4.5rem",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@md": {
        padding: "0 2rem",
    },
})
const Title = styled("h1", {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 2,
    color: "$gray12",
    whiteSpace: "nowrap",
})

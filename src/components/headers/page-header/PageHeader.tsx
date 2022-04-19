import { useMedia } from "react-use"
import { Screens, styled } from "theme"
import DesktopHeaderContent from "./desktop-header-content/DesktopHeaderContent"
import MobileHeaderContent from "./mobile-header-content/MobileHeaderContent"

export default function PageHeader() {
    const isXl = useMedia(`(min-width: ${Screens.xl}px)`)

    return (
        <Header>
            <Title>Hopper Shopper</Title>

            {!isXl && <MobileHeaderContent />}
            {isXl && <DesktopHeaderContent />}
        </Header>
    )
}

const Header = styled("header", {
    backgroundColor: "$gray2",
    borderBottom: "1px solid $gray6",
    height: "4.5rem",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})
const Title = styled("h1", {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 2,
    color: "$gray12",
    whiteSpace: "nowrap",
})

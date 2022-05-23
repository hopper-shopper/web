import { IconDeviceDesktop, IconMenu, IconMoon, IconSun } from "@tabler/icons"
import * as Drawer from "components/drawer/Drawer"
import Button from "components/inputs/buttons/button/Button"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import Flex from "components/layout/flex/Flex"
import RightSlot from "components/layout/flex/RightSlot"
import Grid from "components/layout/grid/Grid"
import WhatsNewDialog from "components/whats-new/WhatsNewDialog"
import { formatCurrency, getCurrencyFormatter } from "formatters/currency"
import { formatGwei } from "formatters/gas"
import { useAtom, useAtomValue } from "jotai"
import { useState } from "react"
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom"
import * as ROUTES from "routing/routes"
import { gasGweiAtom } from "stores/gas"
import { avaxPriceByCurrencyAtom, flyPriceByCurrencyAtom } from "stores/prices"
import { currencyAtom } from "stores/settings"
import { themeAtom } from "stores/theme"
import { styled } from "theme"

export default function MobileHeaderContent() {
    const [open, setOpen] = useState(false)
    const closeDrawer = () => setOpen(false)

    const gasGwei = useAtomValue(gasGweiAtom)
    const currency = useAtomValue(currencyAtom)
    const avaxPrice = useAtomValue(avaxPriceByCurrencyAtom)
    const flyPrice = useAtomValue(flyPriceByCurrencyAtom)
    const [theme, setTheme] = useAtom(themeAtom)

    const flyPriceFormatter = getCurrencyFormatter(currency, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    })

    return (
        <>
            <RightSlot>
                <Drawer.Root open={open} onOpenChange={setOpen}>
                    <Drawer.Trigger>
                        <IconButton>
                            <IconMenu />
                        </IconButton>
                    </Drawer.Trigger>

                    <Drawer.Content>
                        <Drawer.Title>Menu</Drawer.Title>

                        <Flex direction="column" y="stretch" gap="md">
                            <InfoBar>
                                <Tile>
                                    <TileLabel>Gas</TileLabel>
                                    <TileValue>{formatGwei(gasGwei)}</TileValue>
                                </Tile>

                                <Tile>
                                    <TileLabel>AVAX</TileLabel>
                                    <TileValue>{formatCurrency(avaxPrice, currency)}</TileValue>
                                </Tile>

                                <Tile>
                                    <TileLabel>FLY</TileLabel>
                                    <TileValue>{flyPriceFormatter(flyPrice)}</TileValue>
                                </Tile>
                            </InfoBar>

                            <Flex direction="column" y="stretch">
                                <ActivatableLink to={ROUTES.MARKET} onClick={closeDrawer}>
                                    Market
                                </ActivatableLink>
                                <ActivatableLink to={ROUTES.WALLET} onClick={closeDrawer}>
                                    Wallet
                                </ActivatableLink>
                                <ActivatableLink to={ROUTES.WATCHLIST} onClick={closeDrawer}>
                                    Watchlist
                                </ActivatableLink>
                                <ActivatableLink to={ROUTES.INSPECT} onClick={closeDrawer}>
                                    Inspect
                                </ActivatableLink>
                                <ActivatableLink to={ROUTES.ANALYTICS} onClick={closeDrawer}>
                                    Analytics
                                </ActivatableLink>
                            </Flex>
                        </Flex>

                        <Footer>
                            <Flex x="start" css={{ mb: "2rem" }}>
                                <WhatsNewDialog>
                                    <Button size="sm">What's new?</Button>
                                </WhatsNewDialog>
                            </Flex>

                            <Grid columns="3" gap="sm" css={{ justifyItems: "center" }}>
                                <ThemeButton
                                    active={theme === "system"}
                                    onClick={() => setTheme("system")}>
                                    <IconDeviceDesktop />
                                    System
                                </ThemeButton>
                                <ThemeButton
                                    active={theme === "light"}
                                    onClick={() => setTheme("light")}>
                                    <IconSun />
                                    Light
                                </ThemeButton>
                                <ThemeButton
                                    active={theme === "dark"}
                                    onClick={() => setTheme("dark")}>
                                    <IconMoon />
                                    Dark
                                </ThemeButton>
                            </Grid>
                        </Footer>

                        <Drawer.Close />
                    </Drawer.Content>
                </Drawer.Root>
            </RightSlot>
        </>
    )
}

const InfoBar = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.5rem",
    margin: "0 -2rem",
    backgroundColor: "$gray3",
    borderTop: "1px solid $gray6",
    borderBottom: "1px solid $gray6",
    padding: "1rem 2rem",
})
const Tile = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "0.125rem",
})
const TileLabel = styled("p", {
    fontSize: "0.75rem",
    color: "$gray11",
    lineHeight: 1.25,
})
const TileValue = styled("p", {
    color: "$gray12",
    fontSize: "1rem",
})
const Footer = styled("footer", {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1rem 2rem",
})
const ThemeButton = styled("button", {
    all: "unset",
    border: "none",
    borderRadius: "$md",
    color: "$gray11",
    padding: "0.25rem 0.5rem",
    display: "inline-flex",
    alignItems: "center",
    columnGap: "0.25rem",
    fontSize: "0.75rem",
    "& > svg": {
        size: "1.125rem",
    },
    variants: {
        active: {
            true: {
                backgroundColor: "$blue9",
                color: "#fff",
            },
        },
    },
})

function ActivatableLink(props: LinkProps) {
    const resolved = useResolvedPath(props.to)
    const match = useMatch({ path: resolved.pathname, end: true })

    return <StyledLink {...props} active={!!match} />
}

const StyledLink = styled(Link, {
    all: "unset",
    fontSize: "1rem",
    lineHeight: 1.5,
    fontWeight: 400,
    color: "$gray11",
    display: "inline-block",
    textAlign: "left",
    padding: "0.5rem 2rem",
    margin: "0 -2rem",
    cursor: "default",
    variants: {
        active: {
            true: {
                backgroundColor: "$gray4",
                color: "$gray12",
            },
            false: {
                textDecoration: "none",
            },
        },
    },
    defaultVariants: {
        active: false,
    },
})

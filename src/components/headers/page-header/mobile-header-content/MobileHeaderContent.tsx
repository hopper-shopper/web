import { IconMenu } from "@tabler/icons"
import * as Drawer from "components/drawer/Drawer"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import Flex from "components/layout/flex/Flex"
import RightSlot from "components/layout/flex/RightSlot"
import { formatCurrency } from "formatters/currency"
import { formatGwei } from "formatters/gas"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom"
import * as ROUTES from "routing/routes"
import { gasGweiAtom } from "stores/gas"
import { avaxPriceByCurrencyAtom, flyPriceByCurrencyAtom } from "stores/prices"
import { currencyAtom } from "stores/settings"
import { styled } from "theme"

export default function MobileHeaderContent() {
    const [open, setOpen] = useState(false)
    const closeDrawer = () => setOpen(false)

    const gasGwei = useAtomValue(gasGweiAtom)
    const currency = useAtomValue(currencyAtom)
    const avaxPrice = useAtomValue(avaxPriceByCurrencyAtom)
    const flyPrice = useAtomValue(flyPriceByCurrencyAtom)

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
                                    <TileValue>{formatCurrency(flyPrice, currency)}</TileValue>
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
                            </Flex>
                        </Flex>

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

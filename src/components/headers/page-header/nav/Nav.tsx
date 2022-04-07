import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom"
import { styled } from "theme"
import * as ROUTES from "routing/routes"
import { useRef, useState } from "react"

export default function Nav() {
    return (
        <StyledNav>
            <ActivatableLink to={ROUTES.SHOP}>Shop</ActivatableLink>
            <ActivatableLink to={ROUTES.WALLET}>Wallet</ActivatableLink>
            <ActivatableLink to={ROUTES.WATCHLIST}>Watchlist</ActivatableLink>
            <ActivatableLink to={ROUTES.ROI}>ROI Calculator</ActivatableLink>
        </StyledNav>
    )
}

const StyledNav = styled("nav", {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    height: "100%",
    position: "relative",
})

function ActivatableLink(props: LinkProps) {
    const resolved = useResolvedPath(props.to)
    const match = useMatch({ path: resolved.pathname, end: true })

    const linkRef = useRef<HTMLAnchorElement | null>(null)

    const linkWidth = linkRef.current?.getBoundingClientRect().width ?? 0
    const linkOffset = linkRef.current?.offsetLeft

    return (
        <>
            <StyledLink {...props} ref={linkRef} active={!!match} />
            {match ? <ActiveMarker css={{ width: linkWidth, left: linkOffset }} /> : null}
        </>
    )
}

const StyledLink = styled(Link, {
    all: "unset",
    fontSize: "1rem",
    lineHeight: 1.5,
    fontWeight: 400,
    color: "$gray11",
    display: "inline-block",
    textAlign: "center",
    padding: "0.5rem 1rem",
    cursor: "default",
    borderRadius: "$md",
    "&:hover": {
        backgroundColor: "$gray3",
    },
    variants: {
        active: {
            true: {
                color: "$blue11",
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
const ActiveMarker = styled("div", {
    position: "absolute",
    height: 2,
    bottom: 0,
    borderRadius: "$sm",
    backgroundColor: "$blue11",
})

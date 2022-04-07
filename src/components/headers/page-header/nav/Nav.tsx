import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom"
import { styled } from "theme"
import * as ROUTES from "routing/routes"

export default function Nav() {
    return (
        <StyledNav>
            <ActivatableLink to={ROUTES.SHOP}>Shop</ActivatableLink>
            <ActivatableLink to={ROUTES.WALLET}>Wallet</ActivatableLink>
        </StyledNav>
    )
}

const StyledNav = styled("nav", {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
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
                color: "$blue12",
                fontWeight: 500,
                textDecoration: "underline",
            },
            false: {
                fontWeight: 400,
                textDecoration: "none",
            },
        },
    },
    defaultVariants: {
        active: false,
    },
})

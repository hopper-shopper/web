import { HopperId } from "models/Hopper"
import { Link } from "react-router-dom"
import { styled } from "theme"
import { getInspectPageUrl } from "utils/url"

type InspectPageLinkProps = {
    hopperId: HopperId
}

export default function InspectPageLink(props: InspectPageLinkProps) {
    const { hopperId } = props

    return (
        <StyledLink to={getInspectPageUrl({ hopper: hopperId })} target="_blank">
            Inspect
        </StyledLink>
    )
}

const StyledLink = styled(Link, {
    color: "$blue11",
    fontSize: "0.75rem",
    textDecoration: "none",
})

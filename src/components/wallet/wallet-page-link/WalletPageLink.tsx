import { styled } from "theme"
import { WalletAddress } from "models/User"
import { Link } from "react-router-dom"
import { formatWalletAddress } from "formatters/wallet"
import { getWalletPageUrl } from "utils/url"

type WalletPageLinkProps = {
    wallet: WalletAddress
}

export default function WalletPageLink(props: WalletPageLinkProps) {
    const { wallet } = props

    const formattedAddress = formatWalletAddress(wallet)

    if (wallet === "") {
        return <StyledMissingWallet>{formattedAddress}</StyledMissingWallet>
    }

    return <StyledLink to={getWalletPageUrl({ wallet })}>{formattedAddress}</StyledLink>
}

const StyledMissingWallet = styled("span", {
    color: "$gray12",
    fontSize: "1rem",
})
const StyledLink = styled(Link, {
    color: "$blue11",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
        color: "$blue12",
    },
})

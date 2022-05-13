import { IconExternalLink } from "@tabler/icons"
import { formatCurrency, getCurrencyFormatter } from "formatters/currency"
import { formatGwei } from "formatters/gas"
import { useAtomValue } from "jotai"
import { gasGweiAtom } from "stores/gas"
import { avaxPriceByCurrencyAtom, flyPriceByCurrencyAtom } from "stores/prices"
import { currencyAtom } from "stores/settings"
import { styled } from "theme"
import Nav from "../nav/Nav"
import SettingsDropdown from "../settings-dropdown/SettingsDropdown"

export default function DesktopHeaderContent() {
    const gasGwei = useAtomValue(gasGweiAtom)
    const currency = useAtomValue(currencyAtom)
    const avaxPrice = useAtomValue(avaxPriceByCurrencyAtom)
    const flyPrice = useAtomValue(flyPriceByCurrencyAtom)

    const flyPriceFormatter = getCurrencyFormatter(currency, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    })

    return (
        <>
            <NavContainer>
                <Nav />
            </NavContainer>

            <Right>
                <InfoContainer>
                    <Info>
                        <InfoLabel>Gas</InfoLabel>
                        <InfoValue>{formatGwei(gasGwei)}</InfoValue>
                        <InfoExternal
                            href="https://howmuchgas.xyz"
                            target="_blank"
                            onClick={() => window.plausible("Clicked Gas Collector link")}>
                            <IconExternalLink />
                        </InfoExternal>
                    </Info>
                    <Info>
                        <InfoLabel>AVAX</InfoLabel>
                        <InfoValue>{formatCurrency(avaxPrice, currency)}</InfoValue>
                    </Info>
                    <Info>
                        <InfoLabel>FLY</InfoLabel>
                        <InfoValue>{flyPriceFormatter(flyPrice)}</InfoValue>
                    </Info>
                </InfoContainer>

                <SettingsDropdown />
            </Right>
        </>
    )
}

const Right = styled("div", {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
})
const NavContainer = styled("div", {
    marginLeft: "4rem",
    height: "100%",
})
const InfoContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "1.5rem",
})
const Info = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
})
const InfoLabel = styled("span", {
    color: "$gray11",
    fontSize: "0.75rem",
    lineHeight: 1.25,
})
const InfoValue = styled("span", {
    color: "$gray12",
    fontSize: "1rem",
})
const InfoExternal = styled("a", {
    textDecoration: "none",
    color: "$blue11",
    "& > svg": {
        size: "0.75rem",
    },
})

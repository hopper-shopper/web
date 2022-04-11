import { IconExternalLink } from "@tabler/icons"
import useCurrentGas from "api/hooks/useCurrentGas"
import { Currency, formatCurrency } from "formatters/currency"
import { formatGwei } from "formatters/gas"
import usePricesStore from "stores/prices"
import useSettingsStore from "stores/settings"
import { styled } from "theme"
import Nav from "./nav/Nav"
import SettingsDropdown from "./settings-dropdown/SettingsDropdown"

export default function PageHeader() {
    const currency = useSettingsStore(store => store.currency)
    const price = usePricesStore(store => store.price)
    const { gas } = useCurrentGas()

    const avaxLocalePrice = ((): string => {
        switch (currency) {
            case Currency.EUR:
                return formatCurrency(price.AVAX.EUR, Currency.EUR)
            case Currency.USD:
                return formatCurrency(price.AVAX.USD, Currency.USD)
            default:
                return formatCurrency(price.AVAX.USD, Currency.USD)
        }
    })()
    const flyLocalePrice = ((): string => {
        switch (currency) {
            case Currency.EUR:
                return formatCurrency(price.FLY.EUR, Currency.EUR)
            case Currency.USD:
                return formatCurrency(price.FLY.USD, Currency.USD)
            default:
                return formatCurrency(price.FLY.USD, Currency.USD)
        }
    })()

    return (
        <Header>
            <Title>Hopper Shopper</Title>

            <NavContainer>
                <Nav />
            </NavContainer>

            <Right>
                <InfoContainer>
                    <Info>
                        <InfoLabel>Gas</InfoLabel>
                        <InfoValue>{formatGwei(gas?.gwei ?? 0)}</InfoValue>
                        <InfoExternal href="https://howmuchgas.xyz" target="_blank">
                            <IconExternalLink />
                        </InfoExternal>
                    </Info>
                    <Info>
                        <InfoLabel>AVAX</InfoLabel>
                        <InfoValue>{avaxLocalePrice}</InfoValue>
                    </Info>
                    <Info>
                        <InfoLabel>FLY</InfoLabel>
                        <InfoValue>{flyLocalePrice}</InfoValue>
                    </Info>
                </InfoContainer>

                <SettingsDropdown />
            </Right>
        </Header>
    )
}

const Header = styled("header", {
    backgroundColor: "$gray2",
    borderBottom: "1px solid $gray6",
    height: 70,
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
})
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

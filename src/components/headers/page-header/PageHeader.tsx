import usePrices from "api/hooks/usePrices"
import { Currency, formatCurrency } from "formatters/currency"
import { styled } from "theme"
import SettingsDropdown from "./settings-dropdown/SettingsDropdown"
import useSettingsStore from "stores/settings"

export default function PageHeader() {
    const { price } = usePrices()
    const currency = useSettingsStore(store => store.currency)

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

            <Right>
                <Prices>
                    <PriceContainer>
                        <PriceCoin>AVAX</PriceCoin>
                        <Price>{avaxLocalePrice}</Price>
                    </PriceContainer>
                    <PriceContainer>
                        <PriceCoin>FLY</PriceCoin>
                        <Price>{flyLocalePrice}</Price>
                    </PriceContainer>
                </Prices>

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
const Prices = styled("div", {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: "1.5rem",
})
const PriceContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
})
const PriceCoin = styled("span", {
    color: "$gray11",
    fontSize: "0.75rem",
    lineHeight: 1.25,
})
const Price = styled("span", {
    color: "$gray12",
    fontSize: "1rem",
})

import usePrices from "api/hooks/usePrices"
import { Currency, formatCurrency } from "formatters/currency"
import { styled } from "theme"

export default function PageHeader() {
    const { price } = usePrices()

    return (
        <Header>
            <Title>Hopper Sniper</Title>

            <Prices>
                <PriceContainer>
                    <PriceCoin>AVAX</PriceCoin>
                    <Price>{formatCurrency(price.AVAX.EUR, Currency.EUR)}</Price>
                </PriceContainer>
                <PriceContainer>
                    <PriceCoin>FLY</PriceCoin>
                    <Price>{formatCurrency(price.FLY.EUR, Currency.EUR)}</Price>
                </PriceContainer>
            </Prices>
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
const Prices = styled("div", {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: "2rem",
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

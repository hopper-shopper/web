import { Currency, formatCurrency } from "formatters/currency"
import usePricesStore from "stores/prices"
import useSettingsStore from "stores/settings"
import { styled } from "theme"

type BreakdownCardProps = {
    title: string
    value: number
}

export default function BreakdownCard(props: BreakdownCardProps) {
    const { title, value } = props

    const currency = useSettingsStore(store => store.currency)
    const price = usePricesStore(store => store.price)

    const priceByCurrency = ((): number => {
        switch (currency) {
            case Currency.USD:
                return price.FLY.USD
            case Currency.EUR:
                return price.FLY.EUR
            default:
                return price.FLY.USD
        }
    })()

    return (
        <StyledCard>
            <Title>{title}</Title>
            <Value>
                {formatCurrency(value, Currency.FLY)}
                <FiatValue>{formatCurrency(priceByCurrency * value, currency)}</FiatValue>
            </Value>
        </StyledCard>
    )
}

const StyledCard = styled("div", {
    padding: "1rem",
    borderRadius: "$md",
    backgroundColor: "$gray2",
    border: "1px solid $gray6",
})
const Title = styled("h3", {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    marginBottom: "0.5rem",
    color: "$gray11",
})
const Value = styled("p", {
    fontSize: "1.5rem",
    lineHeight: 1,
    display: "flex",
    alignItems: "baseline",
    color: "$gray12",
})
const FiatValue = styled("span", {
    fontSize: "0.75rem",
    marginLeft: "1rem",
    color: "$gray11",
})

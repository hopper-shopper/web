import { Currency, formatCurrency } from "formatters/currency"
import { useAtomValue } from "jotai"
import { flyPriceAtom } from "stores/prices"
import { currencyAtom } from "stores/settings"
import { styled } from "theme"

type BreakdownCardProps = {
    title: string
    value: number
}

export default function BreakdownCard(props: BreakdownCardProps) {
    const { title, value } = props

    const currency = useAtomValue(currencyAtom)
    const price = useAtomValue(flyPriceAtom)

    const priceByCurrency = ((): number => {
        switch (currency) {
            case Currency.USD:
                return price.USD
            case Currency.EUR:
                return price.EUR
            default:
                return price.USD
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
    whiteSpace: "nowrap",
})
const FiatValue = styled("span", {
    fontSize: "0.75rem",
    marginLeft: "1rem",
    color: "$gray11",
})

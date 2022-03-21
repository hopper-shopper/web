import { Hopper } from "models/Hopper"
import { styled } from "theme"
import MarketIndicator from "../market-indicator/MarketIndicator"

type HopperCardProps = {
    hopper: Hopper
}

export default function HopperCard(props: HopperCardProps) {
    const { hopper } = props

    return (
        <Card>
            <Image src={hopper.image} />
            <CardContent>
                <CardItem>
                    <CardItemTitle>Token-ID</CardItemTitle>
                    <CardItemValue>{hopper.tokenId}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Level</CardItemTitle>
                    <CardItemValue>{hopper.level}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Strength</CardItemTitle>
                    <CardItemValue>{hopper.strength}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Agility</CardItemTitle>
                    <CardItemValue>{hopper.agility}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Vitality</CardItemTitle>
                    <CardItemValue>{hopper.vitality}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Intelligence</CardItemTitle>
                    <CardItemValue>{hopper.intelligence}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Fertility</CardItemTitle>
                    <CardItemValue>{hopper.fertility}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Adventure</CardItemTitle>
                    <CardItemValue>{hopper.adventure ? "Yes" : "No"}</CardItemValue>
                </CardItem>
                <CardItem>
                    <CardItemTitle>Market</CardItemTitle>
                    <CardItemValue>
                        <MarketIndicator onMarket={hopper.market} />
                    </CardItemValue>
                </CardItem>
            </CardContent>
        </Card>
    )
}

const Card = styled("div", {
    padding: "1rem 2rem",
    borderRadius: "0.25rem",
    backgroundColor: "$gray2",
    border: "1px solid $gray6",
    display: "flex",
    alignItems: "center",
})
const CardContent = styled("div", {
    flex: "1 1",
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gap: "1rem",
})
const CardItem = styled("div", {
    display: "grid",
})
const CardItemTitle = styled("h4", {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 2,
    color: "$gray11",
    textAlign: "center",
})
const CardItemValue = styled("div", {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.2,
    color: "$gray12",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})
const Image = styled("img", {
    display: "block",
    width: 100,
    height: 100,
    marginRight: "2rem",
})

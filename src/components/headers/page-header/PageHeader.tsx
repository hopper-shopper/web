import { styled } from "theme"

export default function PageHeader() {
    return (
        <Header>
            <HeaderContent>
                <Title>Hopper Sniper</Title>
            </HeaderContent>
        </Header>
    )
}

const Header = styled("header", {
    backgroundColor: "$gray2",
    borderBottom: "1px solid $gray6",
    height: 70,
    display: "flex",
    alignItems: "center",
})
const HeaderContent = styled("div", {
    width: 1280,
    margin: "0 auto",
})
const Title = styled("h1", {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 2,
    color: "$gray12",
})

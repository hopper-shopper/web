import ClipboardButton from "components/inputs/buttons/clipboard-button/ClipboardButton"
import { Screens, styled } from "theme"

export default function PageFooter() {
    return (
        <Container>
            <Inner>
                <Contribution>
                    <Text>Hopper Shopper made by </Text>
                    <ClipboardButton
                        size="sm"
                        content={import.meta.env.VITE_CREATOR_WALLET}
                        text="Wallet copied! Thank you :)"
                        onClick={() => window.plausible("Clicked Owner Wallet")}>
                        steschwa
                    </ClipboardButton>
                    <br />
                    <FeatureIdea>
                        Want so send feedback or feature ideas? Contact me on Discord!
                    </FeatureIdea>
                </Contribution>

                <Links>
                    <StyledLink href="https://hoppersgame.io" target="_blank">
                        Hoppers Game
                        <img src="/hoppers.webp" />
                    </StyledLink>

                    <StyledLink
                        href="https://howmuchgas.xyz"
                        target="_blank"
                        onClick={() => window.plausible("Clicked Gas Collector link")}>
                        Gas Tracker
                        <img src="/howmuchgas.png" />
                    </StyledLink>
                </Links>
            </Inner>
        </Container>
    )
}

const Container = styled("footer", {
    backgroundColor: "$gray2",
    padding: "2rem 1rem",
    "@md": {
        padding: "2rem",
    },
    "@xl": {
        padding: "2rem 0",
    },
})
const Inner = styled("div", {
    maxWidth: Screens.lg,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: "1rem",
    alignItems: "center",
    "@lg": {
        flexDirection: "row",
    },
})
const Contribution = styled("div", {
    textAlign: "center",
    "@lg": {
        textAlign: "left",
    },
})
const Text = styled("span", {
    color: "$gray12",
    fontSize: "1rem",
})
const FeatureIdea = styled("p", {
    color: "$gray11",
    fontSize: "0.75rem",
    marginTop: "1rem",
})
const Links = styled("div", {
    display: "grid",
    gap: "0.5rem",
    alignItems: "end",
    "@md": {
        gridAutoFlow: "column",
    },
    "@lg": {
        marginLeft: "auto",
    },
})
const StyledLink = styled("a", {
    display: "inline-flex",
    alignItems: "center",
    columnGap: "1rem",
    borderRadius: "$sm",
    padding: "0.25rem 0.5rem",
    textDecoration: "none",
    color: "$gray11",
    "& > svg": {
        size: "1.25rem",
    },
    "& > img": {
        size: "1.25rem",
    },
    "&:hover": {
        backgroundColor: "$gray3",
        color: "$gray12",
    },
})

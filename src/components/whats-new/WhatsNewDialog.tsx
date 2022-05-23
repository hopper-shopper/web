import * as Dialog from "components/dialog/Dialog"
import useThemeValue from "hooks/useThemeValue"
import { AnalyticsNavigationView } from "pages/analytics-page/useAnalyticsPageState"
import { Link } from "react-router-dom"
import { INSPECT } from "routing/routes"
import { styled } from "theme"
import { getAnalyticsPageUrl, getInspectPageUrl } from "utils/url"

type WhatsNewDialogProps = {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
}

export default function WhatsNewDialog(props: WhatsNewDialogProps) {
    const { open, defaultOpen, onOpenChange, children } = props

    const breedingImage = useThemeValue("/release/breeding-light.png", "/release/breeding-dark.png")
    const hopperActivitiesImage = useThemeValue(
        "/release/hopper-activities-light.png",
        "/release/hopper-activities-dark.png",
    )
    const inspectHistoryImage = useThemeValue(
        "/release/inspect-history-light.png",
        "/release/inspect-history-dark.png",
    )
    const flySupplyImage = useThemeValue(
        "/release/fly-supply-light.png",
        "/release/fly-supply-dark.png",
    )

    return (
        <Dialog.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>What's new?</Dialog.Title>

                <Content>
                    <NewFeatureContainer>
                        <NewFeatureHeader>
                            <NewFeatureTitle>Light and Dark mode</NewFeatureTitle>
                        </NewFeatureHeader>
                        <NewFeatureImageContainer>
                            <NewFeatureImage src="/release/color-scheme.png" />
                        </NewFeatureImageContainer>
                        <NewFeatureText>
                            Hopper Shopper now uses your preferred color scheme! You can manually
                            change it using the settings dropdown in the top right corner
                        </NewFeatureText>
                    </NewFeatureContainer>

                    <NewFeatureContainer>
                        <NewFeatureHeader>
                            <NewFeatureTitle>Breeding calculator</NewFeatureTitle>
                        </NewFeatureHeader>
                        <NewFeatureImageContainer>
                            <NewFeatureImage src={breedingImage} />
                        </NewFeatureImageContainer>
                        <NewFeatureText>
                            Easily calculate the required FLY to reach a certain breeding chance.
                            Available on the{" "}
                            <NewFeatureLink to={getInspectPageUrl({ hopper: "1" })}>
                                Inspect page
                            </NewFeatureLink>
                        </NewFeatureText>
                    </NewFeatureContainer>

                    <NewFeatureContainer>
                        <NewFeatureHeader>
                            <NewFeatureTitle>Hopper activities chart</NewFeatureTitle>
                        </NewFeatureHeader>
                        <NewFeatureImageContainer>
                            <NewFeatureImage src={hopperActivitiesImage} />
                        </NewFeatureImageContainer>
                        <NewFeatureText>
                            See what other Hoppers are doing and analyse historical strategy shifts.
                            Available on the{" "}
                            <NewFeatureLink
                                to={getAnalyticsPageUrl({ view: AnalyticsNavigationView.HOPPERS })}>
                                Analytics page
                            </NewFeatureLink>
                        </NewFeatureText>
                    </NewFeatureContainer>

                    <NewFeatureContainer>
                        <NewFeatureHeader>
                            <NewFeatureTitle>Inspected Hoppers history</NewFeatureTitle>
                        </NewFeatureHeader>
                        <NewFeatureImageContainer>
                            <NewFeatureImage src={inspectHistoryImage} />
                        </NewFeatureImageContainer>
                        <NewFeatureText>
                            Previously inspected Hoppers are now only a click away. Available on the{" "}
                            <NewFeatureLink to={INSPECT}>Inspect page</NewFeatureLink>
                        </NewFeatureText>
                    </NewFeatureContainer>

                    <NewFeatureContainer>
                        <NewFeatureHeader>
                            <NewFeatureTitle>More accurate FLY supply history</NewFeatureTitle>
                        </NewFeatureHeader>
                        <NewFeatureImageContainer>
                            <NewFeatureImage src={flySupplyImage} />
                        </NewFeatureImageContainer>
                        <NewFeatureText>
                            The FLY supply history is now more accurate and includes vested / locked
                            FLY distributed to Marketing, APA and Team. Available on the{" "}
                            <NewFeatureLink
                                to={getAnalyticsPageUrl({ view: AnalyticsNavigationView.FLY })}>
                                Analytics page
                            </NewFeatureLink>
                        </NewFeatureText>
                    </NewFeatureContainer>
                </Content>

                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Root>
    )
}

const Content = styled("div", {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
    px: "2rem",
    mx: "-2rem",
    overflowY: "auto",
    position: "relative",
})
const NewFeatureContainer = styled("div", {})
const NewFeatureHeader = styled("header", {
    position: "sticky",
    top: -1,
    backgroundColor: "$gray1",
    mx: "-2rem",
    padding: "0.5rem 2rem",
})
const NewFeatureTitle = styled("h2", {
    fontSize: "1.25rem",
    color: "$gray12",
    lineHeight: 1.5,
    fontWeight: 400,
    position: "relative",
    paddingLeft: "1.5rem",
    "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: "50%",
        height: 1,
        backgroundColor: "$gray12",
        width: "1rem",
    },
})
const NewFeatureText = styled("p", {
    color: "$gray12",
    fontSize: "1rem",
    lineHeight: 1.5,
    marginTop: "1rem",
})
const NewFeatureImageContainer = styled("div", {
    padding: "1rem",
    borderRadius: "$md",
    backgroundColor: "$gray2",
    marginTop: "1rem",
})
const NewFeatureImage = styled("img", {
    display: "block",
    objectFit: "cover",
    borderRadius: "$md",
})
const NewFeatureLink = styled(Link, {
    color: "$blue11",
    textDecoration: "none",
})

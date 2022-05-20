import useHoppers from "api/hooks/useHoppers"
import useHoppersListings from "api/hooks/useHoppersListings"
import BreedingCostsTable from "components/hoppers/breeding-costs-table/BreedingCostsTable"
import HopperBreedingChances from "components/hoppers/hopper-breeding-chances/HopperBreedingChances"
import HopperPreview from "components/hoppers/hopper-preview/HopperPreview"
import HopperRoi from "components/hoppers/hopper-roi/HopperRoi"
import InspectPageSubheader from "components/inspect/inspect-page-subheader/InspectPageSubheader"
import * as Section from "components/layout/section/Section"
import ListingsTable from "components/listings/listings-table/ListingsTable"
import EmptyText from "components/typography/empty-text/EmptyText"
import useStateUpdate from "hooks/useStateUpdate"
import { useSetAtom } from "jotai"
import { Hopper } from "models/Hopper"
import { useEffect } from "react"
import { updateHopperHistoryEntryAtom } from "stores/inspect"
import { Screens, styled } from "theme"
import useInspectPageState from "./useInspectPageState"

export default function InspectPage() {
    const [state, setState] = useInspectPageState()
    const updateState = useStateUpdate(setState)

    const updateHopperEntry = useSetAtom(updateHopperHistoryEntryAtom)

    const { hoppers } = useHoppers({
        tokenIds: state.hopperId ? [state.hopperId] : [],
    })
    const { listings } = useHoppersListings({
        tokenIds: state.hopperId ? [state.hopperId] : [],
    })
    const hopper = state.hopperId ? (hoppers[0] as Hopper | null) : null

    useEffect(() => {
        for (const hopper of hoppers) {
            updateHopperEntry({
                hopperId: hopper.tokenId,
                image: hopper.image,
            })
        }
    }, [hoppers, updateHopperEntry])

    return (
        <>
            <InspectPageSubheader state={state} onChange={updateState} />

            {!state.hopperId && (
                <EmptyText align="center" padding="md">
                    Enter a Hopper-ID to inspect stats, history and ROI
                </EmptyText>
            )}

            {hopper && (
                <Container>
                    <Section.Root>
                        <Section.Header>
                            <Section.Title>Hopper</Section.Title>
                        </Section.Header>

                        <HopperPreview hopper={hopper} />
                    </Section.Root>

                    <Section.Root>
                        <Section.Header>
                            <Section.Title>Breeding</Section.Title>
                        </Section.Header>

                        <HopperBreedingChances hopper={hopper} />
                        <BreedingCostsTable hopper={hopper} />
                    </Section.Root>

                    <Section.Root>
                        <Section.Header>
                            <Section.Title>Listings</Section.Title>
                        </Section.Header>

                        {listings.length === 0 && (
                            <EmptyText>Could not find any listings for Hopper</EmptyText>
                        )}
                        {listings.length > 0 && <ListingsTable listings={listings} />}
                    </Section.Root>

                    <Section.Root>
                        <Section.Header>
                            <Section.Title>ROI</Section.Title>
                        </Section.Header>

                        <HopperRoi hopper={hopper} />
                    </Section.Root>
                </Container>
            )}
        </>
    )
}

const Container = styled("div", {
    maxWidth: Screens.lg,
    margin: "5rem auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})

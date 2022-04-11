import { fetchHoppers } from "api/hoppers"
import { fetchHoppersListings } from "api/market"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import { Hopper, HopperId } from "models/Hopper"
import { Listing } from "models/Listing"
import { useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMount } from "react-use"
import { styled } from "theme"
import * as Section from "components/layout/section/Section"
import ListingsTable from "components/listings/listings-table/ListingsTable"
import HopperCardContext from "components/hoppers/hopper-card/HopperCardContext"
import BaseStatsList from "components/hoppers/hopper-card/hopper-card-features/base-stats-list/BaseStatsList"
import PermitDetails from "components/hoppers/hopper-card/hopper-card-features/permit-details/PermitDetails"
import FlyEarnings from "components/hoppers/hopper-card/hopper-card-features/fly-earnings/FlyEarnings"

export default function InspectPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const hopperId = searchParams.get("hopper")
    const lastLoadedForHopperId = useRef<HopperId | null>(null)

    const [listings, setListings] = useState<Listing[]>([])
    const [hopper, setHopper] = useState<Hopper | null>(null)

    const fetchData = async () => {
        if (!hopperId || lastLoadedForHopperId.current === hopperId) {
            return
        }

        const tokenId = parseInt(hopperId)
        if (Number.isNaN(tokenId) || tokenId < 0 || tokenId > 9999) {
            return
        }
        const tokenIdStr = `${tokenId}`

        try {
            const fetchHopper = fetchHoppers({ tokenIds: [tokenIdStr] }).then(hoppers => {
                setHopper(hoppers[0])
            })
            const fetchListings = fetchHoppersListings({ tokenIds: [tokenIdStr] }).then(
                listings => {
                    setListings(listings)
                },
            )

            await Promise.all([fetchHopper, fetchListings])
        } catch (error) {
            console.error(error)
        }
    }
    useMount(fetchData)

    return (
        <>
            <InputContainer
                onSubmit={event => {
                    event.preventDefault()
                    fetchData()
                }}>
                <Fieldset css={{ flex: 1 }}>
                    <Label htmlFor="hopper-id">Hopper-ID</Label>
                    <Input
                        id="hopper-id"
                        type="number"
                        min={0}
                        max={9999}
                        placeholder="Hopper-ID"
                        defaultValue={hopperId || ""}
                        onBlur={value =>
                            setSearchParams({
                                hopper: value.target.value,
                            })
                        }
                    />
                </Fieldset>

                <Button type="submit">Load</Button>
            </InputContainer>

            {hopperId && (
                <Container>
                    <Section.Root>
                        <Section.Title>Hopper</Section.Title>
                        {hopper && (
                            <HopperCardContext.Provider value={{ hopper }}>
                                <HopperPreview>
                                    <HopperBaseInfo>
                                        <HopperImage src={hopper.image} />
                                        <BaseStatsList />
                                    </HopperBaseInfo>

                                    <HopperAnalysis>
                                        <PermitDetails />
                                        <FlyEarnings />
                                    </HopperAnalysis>
                                </HopperPreview>
                            </HopperCardContext.Provider>
                        )}
                    </Section.Root>

                    <Section.Root>
                        <Section.Title>Listings</Section.Title>
                        {listings.length === 0 && (
                            <EmptyText>Could not find any listings for Hopper</EmptyText>
                        )}
                        {listings.length > 0 && <ListingsTable listings={listings} />}
                    </Section.Root>
                </Container>
            )}
        </>
    )
}

const InputContainer = styled("form", {
    maxWidth: 375,
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    columnGap: "1rem",
})
const HopperPreview = styled("div", {
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    columnGap: "2rem",
})
const HopperImage = styled("img", {
    width: 200,
    borderRadius: "$md",
})
const HopperBaseInfo = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
})
const HopperAnalysis = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "2rem",
    alignItems: "start",
})
const EmptyText = styled("p", {
    color: "$gray11",
    fontSize: "1rem",
    lineHeight: 1.25,
    textAlign: "center",
})
const Container = styled("div", {
    maxWidth: 1024,
    margin: "5rem auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})

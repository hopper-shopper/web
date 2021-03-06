import useHoppers from "api/hooks/useHoppers"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import ConfigureWatchlistFilter from "components/watchlist/configure-watchlist-filter/ConfigureWatchlistFilter"
import WatchlistCard from "components/watchlist/watchlist-card/WatchlistCard"
import WatchlistHopperCard from "components/watchlist/watchlist-hopper-card/WatchlistHopperCard"
import {
    getHoppersMarketFilter,
    getHoppersOnWatchlistFilter,
    getHoppersTierPermitFilter,
} from "filters/hoppers"
import useFilter from "hooks/useFilter"
import { useAtomValue, useSetAtom } from "jotai"
import { useMemo, useRef } from "react"
import { toggleWatchlistAtom, watchlistAtom } from "stores/watchlist"
import { Screens, styled } from "theme"
import useWatchlistPageState from "./useWatchlistPageState"

export default function WatchlistPage() {
    const watchlist = useAtomValue(watchlistAtom)
    const toggle = useSetAtom(toggleWatchlistAtom)
    const [watchlistFilter, setWatchlistFilter] = useWatchlistPageState()

    const addHopperIdRef = useRef<HTMLInputElement | null>(null)

    const { hoppers } = useHoppers({
        tokenIds: watchlist,
    })
    const filteredHoppers = useFilter(
        [
            getHoppersOnWatchlistFilter(watchlist),
            getHoppersMarketFilter(watchlistFilter.market),
            getHoppersTierPermitFilter(watchlistFilter.permit),
        ],
        hoppers,
    )

    const handleAddHopperIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!addHopperIdRef.current) {
            return
        }

        const hopperId = addHopperIdRef.current.valueAsNumber
        if (typeof hopperId !== "number" || Number.isNaN(hopperId)) {
            return
        }

        toggle(`${hopperId}`)
        addHopperIdRef.current.value = ""
    }

    const patchedHoppers = useMemo(() => {
        if (watchlistFilter.normalizeLevel > 0 && watchlistFilter.normalizeLevel <= 100) {
            return filteredHoppers.map(hopper => ({
                ...hopper,
                level: watchlistFilter.normalizeLevel,
            }))
        }

        return filteredHoppers
    }, [filteredHoppers, watchlistFilter.normalizeLevel])

    return (
        <Container>
            <Content>
                {watchlist.length > 0 && (
                    <Filter>
                        <ConfigureWatchlistFilter
                            filter={watchlistFilter}
                            onChange={setWatchlistFilter}
                        />
                    </Filter>
                )}

                <WatchlistList>
                    <InputContainer
                        onSubmit={handleAddHopperIdSubmit}
                        css={{ marginBottom: "1rem" }}>
                        <Fieldset css={{ flex: 1 }}>
                            <Label htmlFor="add-hopper-id">Add Hopper by ID</Label>
                            <Input
                                ref={addHopperIdRef}
                                id="add-hopper-id"
                                type="number"
                                min={0}
                                max={9999}
                                placeholder="Hopper-ID"
                            />
                        </Fieldset>

                        <Button type="submit">Add</Button>
                    </InputContainer>

                    {filteredHoppers.map(hopper => (
                        <WatchlistCard key={hopper.tokenId} hopper={hopper} />
                    ))}
                </WatchlistList>

                {watchlist.length === 0 && (
                    <EmptyText css={{ gridArea: "hoppers" }}>
                        You have no Hoppers on your Watchlist yet
                    </EmptyText>
                )}
                {watchlist.length > 0 && (
                    <>
                        {patchedHoppers.length === 0 && (
                            <EmptyText css={{ gridArea: "hoppers" }}>
                                No Hoppers on watchlist match the given filters
                            </EmptyText>
                        )}
                        {patchedHoppers.length > 0 && (
                            <HoppersGrid>
                                {patchedHoppers.map(hopper => (
                                    <WatchlistHopperCard
                                        key={hopper.tokenId}
                                        hopper={hopper}
                                        features={watchlistFilter.features}
                                    />
                                ))}
                            </HoppersGrid>
                        )}
                    </>
                )}
            </Content>
        </Container>
    )
}

const EmptyText = styled("p", {
    color: "$gray11",
    fontSize: "1rem",
    lineHeight: 1.25,
    textAlign: "center",
})
const Container = styled("div", {
    maxWidth: Screens.xl,
    margin: "0 auto",
})
const Filter = styled("div", {
    gridArea: "filter",
})
const Content = styled("div", {
    display: "grid",
    gap: "2rem",
    alignItems: "start",
    gridTemplate: `
        "filter"
        "list"
        "hoppers"
    `,
    "@lg": {
        rowGap: "3rem",
        columnGap: "2rem",
        gridTemplate: `
            "filter filter"
            "list hoppers" / 250px 1fr
        `,
    },
    "@xl": {
        gridTemplate: `
            ". filter"
            "list hoppers" / 300px 1fr
        `,
    },
})
const HoppersGrid = styled("div", {
    display: "grid",
    gap: "1rem",
    alignItems: "start",
    gridArea: "hoppers",
    "@md": {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@xl": {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
})
const WatchlistList = styled("div", {
    display: "grid",
    rowGap: "0.5rem",
    gridArea: "list",
})
const InputContainer = styled("form", {
    display: "flex",
    alignItems: "flex-end",
    columnGap: "1rem",
})

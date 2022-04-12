import useHoppers from "api/hooks/useHoppers"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import ConfigureWatchlistFilter from "components/watchlist/configure-watchlist-filter/ConfigureWatchlistFilter"
import WatchlistCard from "components/watchlist/watchlist-card/WatchlistCard"
import WatchlistHopperCard from "components/watchlist/watchlist-hopper-card/WatchlistHopperCard"
import { getHoppersMarketFilter, getHoppersOnWatchlistFilter } from "filters/hoppers"
import useFilter from "hooks/useFilter"
import { useRef } from "react"
import useWatchlistStore from "stores/watchlist"
import { styled } from "theme"
import useWatchlistPageState from "./useWatchlistPageState"

export default function WatchlistPage() {
    const [watchlist, toggle] = useWatchlistStore(store => [store.watchlist, store.toggle])
    const [watchlistFilter, setWatchlistFilter] = useWatchlistPageState()

    const addHopperIdRef = useRef<HTMLInputElement | null>(null)

    const { hoppers } = useHoppers({
        tokenIds: watchlist,
    })
    const filteredHoppers = useFilter(
        [getHoppersOnWatchlistFilter(watchlist), getHoppersMarketFilter(watchlistFilter.market)],
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

    return (
        <Container>
            {watchlist.length > 0 && (
                <Content css={{ marginBottom: "2rem" }}>
                    <div />

                    <Filter>
                        <ConfigureWatchlistFilter
                            filter={watchlistFilter}
                            onChange={setWatchlistFilter}
                        />
                    </Filter>
                </Content>
            )}

            <Content>
                <WatchlistList>
                    <InputContainer
                        onSubmit={handleAddHopperIdSubmit}
                        css={{ marginBottom: "1rem" }}>
                        <Fieldset css={{ flex: 1 }}>
                            <Label htmlFor="add-hopper-id">Add Hopper-ID</Label>
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
                    <EmptyText>You have no Hoppers on your Watchlist yet</EmptyText>
                )}
                {watchlist.length > 0 && (
                    <>
                        {filteredHoppers.length === 0 && (
                            <EmptyText>No Hoppers on watchlist match the given filters</EmptyText>
                        )}
                        {filteredHoppers.length > 0 && (
                            <HoppersGrid>
                                {filteredHoppers.map(hopper => (
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
    maxWidth: 1280,
    margin: "0 auto",
})
const Filter = styled("div", {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
})
const Content = styled("div", {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    columnGap: "2rem",
    alignItems: "start",
})
const HoppersGrid = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    alignItems: "start",
})
const WatchlistList = styled("div", {
    display: "grid",
    rowGap: "0.5rem",
})
const InputContainer = styled("form", {
    display: "flex",
    alignItems: "flex-end",
    columnGap: "1rem",
})

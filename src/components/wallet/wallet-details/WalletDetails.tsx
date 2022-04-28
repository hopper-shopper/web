import { WalletAddress } from "models/User"
import { Screens, styled } from "theme"
import * as Section from "components/layout/section/Section"
import { SoldFilter } from "api/filters/market"
import { TransferDirection } from "api/filters/transfers"
import useHoppersListings from "api/hooks/useHoppersListings"
import useTransfers from "api/hooks/useTransfers"
import useWalletHoppers from "api/hooks/useWalletHoppers"
import Flex from "components/layout/flex/Flex"
import TransfersBreakdown from "components/transfers/transfers-breakdown/TransfersBreakdown"
import TransfersByDaySelect from "components/transfers/transfers-by-day-select/TransfersByDaySelect"
import TransfersTable from "components/transfers/transfers-table/TransfersTable"
import EmptyText from "components/typography/empty-text/EmptyText"
import FlyCap from "components/user/fly-cap/FlyCap"
import UserEarnings from "components/user/user-earnings/UserEarnings"
import NotIdealAdventuresNotice from "../not-ideal-adventures-notice/NotIdealAdventuresNotice"
import WalletHopperCard from "../wallet-hopper-card/WalletHopperCard"
import Grid from "components/layout/grid/Grid"
import { useMemo, useState } from "react"
import { hopperAdventureToAdventure } from "utils/hopper"
import { Adventure } from "utils/adventures"
import useSort from "hooks/useSort"
import { SortAdventureBy, sortAdventures } from "sorters/adventures"
import { SortDirection } from "sorters/_common"
import { Transfer } from "models/Transfer"

type WalletDetailsProps = {
    wallet: WalletAddress
}

export default function WalletDetails(props: WalletDetailsProps) {
    const { wallet } = props

    const [selectedTransfers, setSelectedTransfers] = useState<Transfer[]>([])
    const { hoppers } = useWalletHoppers(wallet)
    const {
        transfers: inTransfers,
        loading: inTransfersLoading,
        dataSignature: inTransfersSignature,
    } = useTransfers({
        user: wallet,
        direction: TransferDirection.IN,
    })
    const {
        transfers: outTransfers,
        loading: outTransfersLoading,
        dataSignature: outTransfersSignature,
    } = useTransfers({
        user: wallet,
        direction: TransferDirection.OUT,
    })
    const { listings: hopperListings } = useHoppersListings({
        tokenIds: hoppers.map(hopper => hopper.tokenId),
        sold: SoldFilter.SOLD,
    })

    const combinedTransfers = [...inTransfers, ...outTransfers]

    const adventuresOfStakedHoppers = useMemo(() => {
        return Array.from(
            new Set(hoppers.map(hopperAdventureToAdventure).filter(Boolean) as Adventure[]),
        )
    }, [hoppers])

    const { sorted: sortedAdventuresOfStakedHoppers } = useSort({
        collection: adventuresOfStakedHoppers,
        sorter: sortAdventures,
        initial: {
            by: SortAdventureBy.RANK,
            direction: SortDirection.ASC,
        },
    })

    return (
        <Container>
            {sortedAdventuresOfStakedHoppers.length > 0 && wallet && (
                <>
                    <Section.Root>
                        <Section.Title>FLY cap</Section.Title>
                        <Grid gap="md">
                            {sortedAdventuresOfStakedHoppers.map(adventure => (
                                <FlyCap key={adventure} user={wallet} adventure={adventure} />
                            ))}
                        </Grid>
                    </Section.Root>

                    <Section.Root>
                        <Section.Title>Estimated earnings / Day</Section.Title>
                        <EarningsGrid>
                            {sortedAdventuresOfStakedHoppers.map(adventure => (
                                <UserEarnings key={adventure} user={wallet} adventure={adventure} />
                            ))}
                        </EarningsGrid>
                    </Section.Root>
                </>
            )}

            <Section.Root>
                <Section.Title>FLY Transfers</Section.Title>

                <TransfersBreakdown transfers={combinedTransfers} />

                <Flex gap="md" direction="column" y="start">
                    <div>
                        <TransfersByDaySelect
                            key={`${wallet}-${inTransfersSignature}-${outTransfersSignature}`}
                            ready={!inTransfersLoading && !outTransfersLoading}
                            transfers={combinedTransfers}
                            onSelect={setSelectedTransfers}
                        />
                    </div>

                    <TransfersTable transfers={selectedTransfers} />
                </Flex>
            </Section.Root>

            <Section.Root>
                <Section.Title>Hoppers</Section.Title>
                {hoppers.length === 0 && (
                    <EmptyText>This wallet does not have any hoppers</EmptyText>
                )}
                {hoppers.length > 0 && (
                    <>
                        <NotIdealAdventuresNotice hoppers={hoppers} />
                        <HoppersGrid>
                            {hoppers.map(hopper => (
                                <WalletHopperCard
                                    key={hopper.tokenId}
                                    hopper={hopper}
                                    listings={hopperListings}
                                />
                            ))}
                        </HoppersGrid>
                    </>
                )}
            </Section.Root>
        </Container>
    )
}

const PrevWalletTitle = styled("h3", {
    fontSize: "1rem",
    color: "$gray12",
    fontWeight: 400,
})
const PrevWalletItem = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
})
const PrevWalletAddress = styled("span", {
    color: "$gray11",
    fontSize: "0.875rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "$md",
    cursor: "default",
    "&:hover": {
        backgroundColor: "$gray3",
    },
})
const Container = styled("div", {
    maxWidth: Screens.lg,
    margin: "3rem auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})
const EarningsGrid = styled("div", {
    display: "grid",
    gap: "1rem",
    "@md": {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
})
const HoppersGrid = styled("div", {
    display: "grid",
    gap: "1rem",
    "@md": {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@lg": {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
})

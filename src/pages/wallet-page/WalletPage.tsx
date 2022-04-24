import { IconX } from "@tabler/icons"
import { SoldFilter } from "api/filters/market"
import { TransferDirection } from "api/filters/transfers"
import useHoppersListings from "api/hooks/useHoppersListings"
import useTransfers from "api/hooks/useTransfers"
import useWalletHoppers from "api/hooks/useWalletHoppers"
import Button from "components/inputs/buttons/button/Button"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import Fieldset from "components/inputs/fieldset/Fieldset"
import InputForm from "components/inputs/input-form/InputForm"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import Flex from "components/layout/flex/Flex"
import Grid from "components/layout/grid/Grid"
import * as Section from "components/layout/section/Section"
import TransfersBreakdown from "components/transfers/transfers-breakdown/TransfersBreakdown"
import TransfersByDaySelect from "components/transfers/transfers-by-day-select/TransfersByDaySelect"
import TransfersTable from "components/transfers/transfers-table/TransfersTable"
import EmptyText from "components/typography/empty-text/EmptyText"
import FlyCap from "components/user/fly-cap/FlyCap"
import UserEarnings from "components/user/user-earnings/UserEarnings"
import NotIdealAdventuresNotice from "components/wallet/not-ideal-adventures-notice/NotIdealAdventuresNotice"
import WalletHopperCard from "components/wallet/wallet-hopper-card/WalletHopperCard"
import { formatWalletAddress } from "formatters/wallet"
import useSort from "hooks/useSort"
import { useAtomValue, useSetAtom } from "jotai"
import { Transfer } from "models/Transfer"
import { WalletAddress } from "models/User"
import { useMemo, useState } from "react"
import { SortAdventureBy, sortAdventures } from "sorters/adventures"
import { SortDirection } from "sorters/_common"
import {
    addWalletToHistoryAtom,
    removeWalletFromHistoryAtom,
    walletsHistoryAtom,
} from "stores/wallet"
import { Screens, styled } from "theme"
import { Adventure } from "utils/adventures"
import { hopperAdventureToAdventure } from "utils/hopper"
import { isValidWalletAddress } from "utils/user"
import useWalletPageState from "./useWalletPageState"

export default function WalletPage() {
    const [state, setState] = useWalletPageState()
    const [selectedTransfers, setSelectedTransfers] = useState<Transfer[]>([])

    const walletsHistory = useAtomValue(walletsHistoryAtom)
    const addWalletToHistory = useSetAtom(addWalletToHistoryAtom)
    const removeWalletFromHistory = useSetAtom(removeWalletFromHistoryAtom)

    const { hoppers } = useWalletHoppers(state.wallet)
    const {
        transfers: inTransfers,
        loading: inTransfersLoading,
        dataSignature: inTransfersSignature,
    } = useTransfers({
        user: state.wallet || "",
        direction: TransferDirection.IN,
    })
    const {
        transfers: outTransfers,
        loading: outTransfersLoading,
        dataSignature: outTransfersSignature,
    } = useTransfers({
        user: state.wallet || "",
        direction: TransferDirection.OUT,
    })
    const { listings: hopperListings } = useHoppersListings({
        tokenIds: hoppers.map(hopper => hopper.tokenId),
        sold: SoldFilter.SOLD,
    })

    const handleWalletSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const walletAddress = formData.get("wallet")

        if (!walletAddress) {
            setState({ wallet: "" })
            return
        }

        if (!isValidWalletAddress(walletAddress.toString())) {
            setState({ wallet: "" })
            return
        }

        setWallet(walletAddress.toString())
        addWalletToHistory(walletAddress.toString())
    }
    const setWallet = (wallet: WalletAddress) => {
        setState({ wallet })
        setSelectedTransfers([])
    }

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
        <>
            <InputForm onSubmit={handleWalletSubmit} css={{ maxWidth: Screens.sm }}>
                <Fieldset css={{ flex: 1 }}>
                    <Label htmlFor="wallet-address">Your Wallet address</Label>
                    <Input
                        id="wallet-address"
                        name="wallet"
                        type="text"
                        placeholder="Wallet address"
                        defaultValue={state.wallet}
                    />
                </Fieldset>

                <Button type="submit">Load</Button>
            </InputForm>

            {walletsHistory.length > 0 && !state.wallet && (
                <Flex
                    direction="column"
                    y="stretch"
                    css={{ maxWidth: Screens.sm, mx: "auto", mt: "2rem" }}>
                    <PrevWalletTitle>Previous searches</PrevWalletTitle>
                    {walletsHistory.slice(0, 3).map(prevWallet => (
                        <PrevWalletItem key={prevWallet}>
                            <PrevWalletAddress onClick={() => setWallet(prevWallet)}>
                                {formatWalletAddress(prevWallet)}
                            </PrevWalletAddress>
                            <IconButton
                                size="sm"
                                onClick={() => removeWalletFromHistory(prevWallet)}>
                                <IconX />
                            </IconButton>
                        </PrevWalletItem>
                    ))}
                </Flex>
            )}

            {!state.wallet && (
                <EmptyText align="center" padding="md">
                    Enter your Wallet address to view game analytics and transfers
                </EmptyText>
            )}
            {state.wallet && (
                <Container>
                    {sortedAdventuresOfStakedHoppers.length > 0 && state.wallet && (
                        <>
                            <Section.Root>
                                <Section.Title>FLY cap</Section.Title>
                                <Grid gap="md">
                                    {sortedAdventuresOfStakedHoppers.map(adventure => (
                                        <FlyCap
                                            key={adventure}
                                            user={state.wallet}
                                            adventure={adventure}
                                        />
                                    ))}
                                </Grid>
                            </Section.Root>

                            <Section.Root>
                                <Section.Title>Estimated earnings / Day</Section.Title>
                                <EarningsGrid>
                                    {sortedAdventuresOfStakedHoppers.map(adventure => (
                                        <UserEarnings
                                            key={adventure}
                                            user={state.wallet}
                                            adventure={adventure}
                                        />
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
                                    key={`${state.wallet}-${inTransfersSignature}-${outTransfersSignature}`}
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
            )}
        </>
    )
}

// Components
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
    margin: "5rem auto",
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

import { SoldFilter } from "api/filters/market"
import { TransferDirection } from "api/filters/transfers"
import useHoppersListings from "api/hooks/useHoppersListings"
import useTransfers from "api/hooks/useTransfers"
import { fetchHoppers } from "api/hoppers"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import * as Section from "components/layout/section/Section"
import TransfersBreakdown from "components/transfers/transfers-breakdown/TransfersBreakdown"
import TransfersByDaySelect from "components/transfers/transfers-by-day-select/TransfersByDaySelect"
import TransfersTable from "components/transfers/transfers-table/TransfersTable"
import FlyCap from "components/user/fly-cap/FlyCap"
import UserEarnings from "components/user/user-earnings/UserEarnings"
import WalletHopperCard from "components/wallet/wallet-hopper-card/WalletHopperCard"
import { Hopper } from "models/Hopper"
import { Transfer } from "models/Transfer"
import { useRef, useState } from "react"
import { useMount } from "react-use"
import { styled } from "theme"
import { Adventure } from "utils/adventures"
import { hopperAdventureToAdventure } from "utils/hopper"
import isEthereumAddress from "validator/es/lib/isEthereumAddress"
import useWalletPageState from "./useWalletPageState"

export default function WalletPage() {
    const hoppersLoadedForAddress = useRef<string | null>(null)
    const [state, setState] = useWalletPageState()
    const [walletHoppers, setWalletHoppers] = useState<Hopper[]>([])
    const [selectedTransfers, setSelectedTransfers] = useState<Transfer[]>([])

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
        tokenIds: walletHoppers.map(hopper => hopper.tokenId),
        sold: SoldFilter.SOLD,
    })

    const loadHoppers = async () => {
        if (
            !state.wallet ||
            !isEthereumAddress(state.wallet) ||
            hoppersLoadedForAddress.current === state.wallet
        ) {
            return
        }

        try {
            const hoppers = await fetchHoppers({
                owner: state.wallet,
            })
            setSelectedTransfers([])
            setWalletHoppers(hoppers)
            hoppersLoadedForAddress.current = state.wallet
        } catch (error) {
            console.error(error)
        }
    }
    useMount(loadHoppers)

    const combinedTransfers = [...inTransfers, ...outTransfers]

    const adventuresOfStakedHoppers = new Set(
        walletHoppers.map(hopperAdventureToAdventure).filter(Boolean) as Adventure[],
    )

    return (
        <>
            <InputContainer
                onSubmit={event => {
                    event.preventDefault()
                    loadHoppers()
                }}>
                <Fieldset css={{ flex: 1 }}>
                    <Label htmlFor="wallet-address">Your Wallet address</Label>
                    <Input
                        id="wallet-address"
                        type="text"
                        placeholder="Wallet address"
                        defaultValue={state.wallet}
                        onBlur={value => setState({ wallet: value.target.value })}
                    />
                </Fieldset>

                <Button>Load</Button>
            </InputContainer>

            {!state.wallet && (
                <EmptyText>
                    Enter your Wallet address to view game analytics and transfers
                </EmptyText>
            )}
            {state.wallet && (
                <Container>
                    {adventuresOfStakedHoppers.size > 0 && state.wallet && (
                        <>
                            <Section.Root>
                                <Section.Title>FLY cap</Section.Title>
                                <UserCapList>
                                    {Array.from(adventuresOfStakedHoppers).map(adventure => (
                                        <FlyCap
                                            key={adventure}
                                            user={state.wallet}
                                            adventure={adventure}
                                        />
                                    ))}
                                </UserCapList>
                            </Section.Root>

                            <Section.Root>
                                <Section.Title>Estimated earnings / Day</Section.Title>
                                <UserEarningsGrid>
                                    {Array.from(adventuresOfStakedHoppers).map(adventure => (
                                        <UserEarnings
                                            key={adventure}
                                            user={state.wallet}
                                            adventure={adventure}
                                        />
                                    ))}
                                </UserEarningsGrid>
                            </Section.Root>
                        </>
                    )}

                    <Section.Root>
                        <Section.Title>Hoppers</Section.Title>
                        <HoppersList>
                            {walletHoppers.map(hopper => (
                                <WalletHopperCard
                                    key={hopper.tokenId}
                                    hopper={hopper}
                                    listings={hopperListings}
                                />
                            ))}
                        </HoppersList>
                    </Section.Root>

                    <Section.Root>
                        <Section.Title>FLY Transfers</Section.Title>

                        <TransfersBreakdown transfers={combinedTransfers} />

                        <TransfersGrid>
                            <div>
                                <TransfersByDaySelect
                                    key={`${state.wallet}-${inTransfersSignature}-${outTransfersSignature}`}
                                    ready={!inTransfersLoading && !outTransfersLoading}
                                    transfers={combinedTransfers}
                                    onSelect={setSelectedTransfers}
                                />
                            </div>

                            <TransfersTable transfers={selectedTransfers} />
                        </TransfersGrid>
                    </Section.Root>
                </Container>
            )}
        </>
    )
}

// Components
const InputContainer = styled("form", {
    maxWidth: 640,
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    columnGap: "1rem",
})
const Container = styled("div", {
    maxWidth: 1024,
    margin: "5rem auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})
const EmptyText = styled("p", {
    color: "$gray11",
    fontSize: "1rem",
    lineHeight: 1.25,
    textAlign: "center",
    padding: "2rem",
})
const UserCapList = styled("div", {
    display: "grid",
    rowGap: "1rem",
})
const UserEarningsGrid = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
})
const HoppersList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    alignItems: "start",
})
const TransfersGrid = styled("div", {
    display: "grid",
    alignItems: "start",
    rowGap: "1rem",
})

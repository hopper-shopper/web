import { SoldFilter } from "api/filters/market"
import { TransferDirection } from "api/filters/transfers"
import useHoppersListings from "api/hooks/useHoppersListings"
import useTransfers from "api/hooks/useTransfers"
import useWalletHoppers from "api/hooks/useWalletHoppers"
import Button from "components/inputs/buttons/button/Button"
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
import WalletHopperCard from "components/wallet/wallet-hopper-card/WalletHopperCard"
import { Transfer } from "models/Transfer"
import { useState } from "react"
import { Screens, styled } from "theme"
import { Adventure } from "utils/adventures"
import { hopperAdventureToAdventure } from "utils/hopper"
import { isValidWalletAddress } from "utils/user"
import useWalletPageState from "./useWalletPageState"

export default function WalletPage() {
    const [state, setState] = useWalletPageState()
    const [selectedTransfers, setSelectedTransfers] = useState<Transfer[]>([])

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

        setState({ wallet: walletAddress.toString() })
        setSelectedTransfers([])
    }

    const combinedTransfers = [...inTransfers, ...outTransfers]

    const adventuresOfStakedHoppers = new Set(
        hoppers.map(hopperAdventureToAdventure).filter(Boolean) as Adventure[],
    )

    return (
        <>
            <InputForm css={{ maxWidth: Screens.sm }} onSubmit={handleWalletSubmit}>
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

            {!state.wallet && (
                <EmptyText align="center" padding="md">
                    Enter your Wallet address to view game analytics and transfers
                </EmptyText>
            )}
            {state.wallet && (
                <Container>
                    {adventuresOfStakedHoppers.size > 0 && state.wallet && (
                        <>
                            <Section.Root>
                                <Section.Title>FLY cap</Section.Title>
                                <Grid gap="md">
                                    {Array.from(adventuresOfStakedHoppers).map(adventure => (
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
                                    {Array.from(adventuresOfStakedHoppers).map(adventure => (
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
                            <HoppersGrid>
                                {hoppers.map(hopper => (
                                    <WalletHopperCard
                                        key={hopper.tokenId}
                                        hopper={hopper}
                                        listings={hopperListings}
                                    />
                                ))}
                            </HoppersGrid>
                        )}
                    </Section.Root>
                </Container>
            )}
        </>
    )
}

// Components
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

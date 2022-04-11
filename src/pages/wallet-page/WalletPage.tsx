import { SoldFilter } from "api/filters/market"
import { TransferDirection } from "api/filters/transfers"
import useHoppersListings from "api/hooks/useHoppersListings"
import useTransfers from "api/hooks/useTransfers"
import { fetchHoppers } from "api/hoppers"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import TransfersBreakdown from "components/transfers/transfers-breakdown/TransfersBreakdown"
import TransfersByDaySelect from "components/transfers/transfers-by-day-select/TransfersByDaySelect"
import TransfersTable from "components/transfers/transfers-table/TransfersTable"
import FlyCap from "components/user/fly-cap/FlyCap"
import WalletHopperCard from "components/wallet/wallet-hopper-card/WalletHopperCard"
import { Hopper } from "models/Hopper"
import { Transfer } from "models/Transfer"
import { useRef, useState } from "react"
import { useLocalStorage, useMount } from "react-use"
import { styled } from "theme"
import { Adventure } from "utils/adventures"
import { hopperAdventureToAdventure } from "utils/hopper"
import isEthereumAddress from "validator/es/lib/isEthereumAddress"
import * as Section from "components/layout/section/Section"

export default function WalletPage() {
    const hoppersLoadedForAddress = useRef<string | null>(null)
    const [walletAddress, setWalletAddress] = useLocalStorage(WALLET_ADDRESS_LS, "")
    const [walletHoppers, setWalletHoppers] = useState<Hopper[]>([])
    const [selectedTransfers, setSelectedTransfers] = useState<Transfer[]>([])

    const {
        transfers: inTransfers,
        loading: inTransfersLoading,
        dataSignature: inTransfersSignature,
    } = useTransfers({
        user: walletAddress || "",
        direction: TransferDirection.IN,
    })
    const {
        transfers: outTransfers,
        loading: outTransfersLoading,
        dataSignature: outTransfersSignature,
    } = useTransfers({
        user: walletAddress || "",
        direction: TransferDirection.OUT,
    })
    const { listings: hopperListings } = useHoppersListings({
        tokenIds: walletHoppers.map(hopper => hopper.tokenId),
        sold: SoldFilter.SOLD,
    })

    const loadHoppers = async () => {
        if (
            !walletAddress ||
            !isEthereumAddress(walletAddress) ||
            hoppersLoadedForAddress.current === walletAddress
        ) {
            return
        }

        try {
            const hoppers = await fetchHoppers({
                owner: walletAddress,
            })
            setSelectedTransfers([])
            setWalletHoppers(hoppers)
            hoppersLoadedForAddress.current = walletAddress
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
                        defaultValue={walletAddress || ""}
                        onBlur={value => setWalletAddress(value.target.value)}
                    />
                </Fieldset>

                <Button>Load</Button>
            </InputContainer>

            <Container>
                {adventuresOfStakedHoppers.size > 0 && walletAddress && (
                    <Section.Root>
                        <Section.Title>FLY cap</Section.Title>
                        <UserCapList>
                            {Array.from(adventuresOfStakedHoppers).map(adventure => (
                                <FlyCap
                                    key={adventure}
                                    user={walletAddress}
                                    adventure={adventure}
                                />
                            ))}
                        </UserCapList>
                    </Section.Root>
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
                                key={`${walletAddress}-${inTransfersSignature}-${outTransfersSignature}`}
                                ready={!inTransfersLoading && !outTransfersLoading}
                                transfers={combinedTransfers}
                                onSelect={setSelectedTransfers}
                            />
                        </div>

                        <TransfersTable transfers={selectedTransfers} />
                    </TransfersGrid>
                </Section.Root>
            </Container>
        </>
    )
}

// Constants
const WALLET_ADDRESS_LS = "hoppershopper.wallet.address"

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
const UserCapList = styled("div", {
    display: "grid",
    rowGap: "1rem",
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

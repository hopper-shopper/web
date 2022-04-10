import { SoldFilter } from "api/filters/market"
import { TransferDirection } from "api/filters/transfers"
import useHoppersListings from "api/hooks/useHoppersListings"
import useTransfers from "api/hooks/useTransfers"
import { fetchHoppers } from "api/hoppers"
import HopperCard from "components/hoppers/hopper-card/HopperCard"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import TransfersBreakdown from "components/transfers/transfers-breakdown/TransfersBreakdown"
import TransfersByDaySelect from "components/transfers/transfers-by-day-select/TransfersByDaySelect"
import TransfersTable from "components/transfers/transfers-table/TransfersTable"
import { Hopper } from "models/Hopper"
import { Transfer } from "models/Transfer"
import { useRef, useState } from "react"
import { useLocalStorage, useMount } from "react-use"
import { styled } from "theme"
import isEthereumAddress from "validator/es/lib/isEthereumAddress"

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

    useMount(() => {
        loadHoppers()
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

    const combinedTransfers = [...inTransfers, ...outTransfers]

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
                <Section>
                    <SectionTitle>Hoppers</SectionTitle>
                    <HoppersList>
                        {walletHoppers.map(hopper => (
                            <HopperCard
                                key={hopper.tokenId}
                                hopper={hopper}
                                listings={hopperListings}
                            />
                        ))}
                    </HoppersList>
                </Section>

                <Section>
                    <SectionTitle>FLY Transfers</SectionTitle>

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
                </Section>
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
const Section = styled("section", {
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
})
const SectionTitle = styled("h2", {
    color: "$gray12",
    fontSize: "1.25rem",
    lineHeight: 1.5,
    paddingLeft: "2rem",
    position: "relative",
    "&::before": {
        content: '" "',
        position: "absolute",
        left: 0,
        width: "1.5rem",
        height: 1,
        backgroundColor: "$gray12",
        top: "50%",
    },
})
const HoppersList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "1rem",
    alignItems: "start",
})
const TransfersGrid = styled("div", {
    display: "grid",
    alignItems: "start",
    rowGap: "1rem",
})

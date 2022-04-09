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
import { Hopper } from "models/Hopper"
import { useRef, useState } from "react"
import { useLocalStorage, useMount } from "react-use"
import { styled } from "theme"
import isEthereumAddress from "validator/es/lib/isEthereumAddress"

export default function WalletPage() {
    const hoppersLoadedForAddress = useRef<string | null>(null)
    const [walletAddress, setWalletAddress] = useLocalStorage(WALLET_ADDRESS_LS, "")
    const [walletHoppers, setWalletHoppers] = useState<Hopper[]>([])

    const { transfers: inTransfers } = useTransfers({
        user: walletAddress || "",
        direction: TransferDirection.IN,
    })
    const { transfers: outTransfers } = useTransfers({
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
            setWalletHoppers(hoppers)
            hoppersLoadedForAddress.current = walletAddress
        } catch (error) {
            console.error(error)
        }
    }

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
                <HoppersList>
                    {walletHoppers.map(hopper => (
                        <HopperCard
                            key={hopper.tokenId}
                            hopper={hopper}
                            listings={hopperListings}
                        />
                    ))}
                </HoppersList>

                {/* <TransfersTable transfers={inTransfers} />
                <TransfersTable transfers={outTransfers} /> */}
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
    margin: "0 auto",
    marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
    rowGap: "3rem",
})
const HoppersList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "1rem",
    alignItems: "start",
})

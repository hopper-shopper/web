import { fetchHoppers } from "api/hoppers"
import HoppersTableCompact from "components/hoppers/hoppers-table-compact/HoppersTableCompact"
import Button from "components/inputs/buttons/button/Button"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import { useLocalStorage, useMount } from "react-use"
import { styled } from "theme"
import isEthereumAddress from "validator/es/lib/isEthereumAddress"

export default function WalletPage() {
    const [walletAddress, setWalletAddress] = useLocalStorage(WALLET_ADDRESS_LS, "")

    const [walletHoppers, setWalletHoppers] = useState<Hopper[]>([])

    useMount(() => {
        loadHoppers()
    })

    const loadHoppers = async () => {
        if (!walletAddress || !isEthereumAddress(walletAddress)) {
            return
        }

        try {
            const hoppers = await fetchHoppers({
                owner: walletAddress,
            })
            setWalletHoppers(hoppers)
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

            <List>
                <HoppersTableCompact hoppers={walletHoppers} />
            </List>
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
const List = styled("div", {
    maxWidth: 1024,
    margin: "0 auto",
    marginTop: "5rem",
})

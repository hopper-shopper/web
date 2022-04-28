import { IconX } from "@tabler/icons"
import Button from "components/inputs/buttons/button/Button"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import Fieldset from "components/inputs/fieldset/Fieldset"
import InputForm from "components/inputs/input-form/InputForm"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import Flex from "components/layout/flex/Flex"
import { formatWalletAddress } from "formatters/wallet"
import { useAtomValue, useSetAtom } from "jotai"
import { WalletAddress } from "models/User"
import {
    walletsHistoryAtom,
    addWalletToHistoryAtom,
    removeWalletFromHistoryAtom,
} from "stores/wallet"
import { Screens, styled } from "theme"
import { isValidWalletAddress } from "utils/user"

type EnterWalletContentProps = {
    initialWallet?: WalletAddress
    onChange: (wallet: WalletAddress) => void
}

export default function EnterWalletContent(props: EnterWalletContentProps) {
    const { initialWallet, onChange } = props

    const walletsHistory = useAtomValue(walletsHistoryAtom)
    const addWalletToHistory = useSetAtom(addWalletToHistoryAtom)
    const removeWalletFromHistory = useSetAtom(removeWalletFromHistoryAtom)

    const handleWalletSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const walletAddress = formData.get("wallet")

        if (!walletAddress) {
            onChange("")
            return
        }

        if (!isValidWalletAddress(walletAddress.toString())) {
            onChange("")
            return
        }

        onChange(walletAddress.toString())
        addWalletToHistory(walletAddress.toString())
    }

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
                        defaultValue={initialWallet || ""}
                    />
                </Fieldset>

                <Button type="submit">Load</Button>
            </InputForm>

            {walletsHistory.length > 0 && (
                <Flex
                    direction="column"
                    y="stretch"
                    css={{ maxWidth: Screens.sm, mx: "auto", mt: "2rem" }}>
                    <PrevWalletTitle>Previous searches</PrevWalletTitle>
                    {walletsHistory.slice(0, 3).map(prevWallet => (
                        <PrevWalletItem key={prevWallet}>
                            <PrevWalletAddress onClick={() => onChange(prevWallet)}>
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
        </>
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

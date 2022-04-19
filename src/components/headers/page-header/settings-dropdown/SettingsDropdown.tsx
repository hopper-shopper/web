import { IconChevronRight, IconCurrencyDollar, IconCurrencyEuro, IconSettings } from "@tabler/icons"
import * as Dropdown from "components/dropdown/Dropdown"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import RightSlot from "components/layout/flex/RightSlot"
import { Currency } from "formatters/currency"
import { useAtom } from "jotai"
import { currencyAtom } from "stores/settings"

export default function SettingsDropdown() {
    const [currency, setCurrency] = useAtom(currencyAtom)

    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <IconButton css={{ marginLeft: "2rem" }}>
                    <IconSettings />
                </IconButton>
            </Dropdown.Trigger>

            <Dropdown.Content sideOffset={8}>
                <Dropdown.Label>Currency</Dropdown.Label>
                <Dropdown.RadioGroup
                    value={currency}
                    onValueChange={value => setCurrency(value as Currency)}>
                    <Dropdown.RadioItem value={Currency.EUR}>
                        <Dropdown.ItemIndicator>
                            <IconChevronRight />
                        </Dropdown.ItemIndicator>
                        EUR
                        <RightSlot>
                            <Dropdown.ItemIcon>
                                <IconCurrencyEuro />
                            </Dropdown.ItemIcon>
                        </RightSlot>
                    </Dropdown.RadioItem>
                    <Dropdown.RadioItem value={Currency.USD}>
                        <Dropdown.ItemIndicator>
                            <IconChevronRight />
                        </Dropdown.ItemIndicator>
                        USD
                        <RightSlot>
                            <Dropdown.ItemIcon>
                                <IconCurrencyDollar />
                            </Dropdown.ItemIcon>
                        </RightSlot>
                    </Dropdown.RadioItem>
                </Dropdown.RadioGroup>
            </Dropdown.Content>
        </Dropdown.Root>
    )
}

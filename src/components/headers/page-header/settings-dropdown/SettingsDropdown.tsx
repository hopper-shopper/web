import { IconCurrencyDollar, IconCurrencyEuro, IconSettings } from "@tabler/icons"
import * as Dropdown from "components/dropdown/Dropdown"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import IconDotFilled from "components/icons/IconDotFilled"
import { styled } from "theme"
import useSettingsStore from "stores/settings"
import { Currency } from "formatters/currency"
import RightSlot from "components/layout/flex/RightSlot"

export default function SettingsDropdown() {
    const [currency, setCurrency] = useSettingsStore(store => [store.currency, store.setCurrency])

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
                            <RadioItemIndicatorIcon />
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
                            <RadioItemIndicatorIcon />
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

const RadioItemIndicatorIcon = styled(IconDotFilled, {
    fill: "$blue9",
})

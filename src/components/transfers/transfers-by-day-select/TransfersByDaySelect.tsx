import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons"
import * as Select from "components/inputs/select/Select"
import { getMonth, isToday, isYesterday } from "date-fns"
import { formatDateTime, formatMonth } from "formatters/date"
import { groupTransferByDate } from "grouping/transfers"
import useGroups from "hooks/useGroups"
import useSort from "hooks/useSort"
import { Transfer } from "models/Transfer"
import React from "react"
import { useState } from "react"
import { SortTransferBy, sortTransfers } from "sorters/transfers"
import { SortDirection } from "sorters/_common"

type TransfersByDaySelectProps = {
    transfers: Transfer[]
    onSelect?: (transfers: Transfer[]) => void
}

export default function TransfersByDaySelect(props: TransfersByDaySelectProps) {
    const { transfers, onSelect } = props

    const [selected, setSelected] = useState<string | null>(null)

    const { sorted: sortedTransfers } = useSort({
        collection: transfers,
        sorter: sortTransfers,
        initial: {
            by: SortTransferBy.TIMESTAMP,
            direction: SortDirection.DESC,
        },
    })

    const dayGroups = useGroups(sortedTransfers, groupTransferByDate)
    const groups = Array.from(dayGroups)

    const selectedKey = selected || groups[0]?.[0]

    const handleValueChange = (value: string) => {
        setSelected(value)

        const groupedTransfers = dayGroups.get(value)
        onSelect?.(groupedTransfers ?? [])
    }

    return (
        <Select.Root value={selectedKey} onValueChange={handleValueChange}>
            <Select.Trigger>
                <Select.Value />
                <Select.Icon>
                    <IconChevronDown />
                </Select.Icon>
            </Select.Trigger>

            <Select.Content>
                <Select.ScrollUpButton>
                    <IconChevronUp />
                </Select.ScrollUpButton>

                <Select.Viewport>
                    {groups.map(([key], index, groups) => (
                        <React.Fragment key={key}>
                            {renderMonthSeparator(key, index >= 1 ? groups[index - 1][0] : null)}

                            <Select.Item value={key}>
                                <Select.ItemText>{renderValueForKey(key)}</Select.ItemText>
                                <Select.ItemIndicator>
                                    <IconCheck />
                                </Select.ItemIndicator>
                            </Select.Item>
                        </React.Fragment>
                    ))}
                </Select.Viewport>

                <Select.ScrollDownButton>
                    <IconChevronDown />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Root>
    )
}

function renderValueForKey(key: string): React.ReactNode {
    const date = Date.parse(key)

    if (isToday(date)) {
        return "Today"
    } else if (isYesterday(date)) {
        return "Yesterday"
    }

    return formatDateTime(date, { dateStyle: "long", timeStyle: undefined })
}

function renderMonthSeparator(current: string, previous: string | null): React.ReactNode {
    if (!previous) {
        return null
    }

    const currentDate = Date.parse(current)
    const previousDate = Date.parse(previous)

    const currentMonth = getMonth(currentDate)
    const previousMonth = getMonth(previousDate)

    if (currentMonth === previousMonth) {
        return null
    }

    return (
        <Select.Group>
            <Select.Separator />
            <Select.Label>{formatMonth(currentDate)}</Select.Label>
        </Select.Group>
    )
}

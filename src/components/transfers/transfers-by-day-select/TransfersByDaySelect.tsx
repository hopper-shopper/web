import { IconCheck, IconChevronDown, IconChevronUp, IconDirection } from "@tabler/icons"
import * as Select from "components/inputs/select/Select"
import { getMonth, isToday, isYesterday } from "date-fns"
import { formatDateTime, formatMonth } from "formatters/date"
import { groupTransferByDate } from "grouping/transfers"
import useGroups from "hooks/useGroups"
import useSort from "hooks/useSort"
import { Transfer } from "models/Transfer"
import React, { useEffect, useRef, useState } from "react"
import { useLatest } from "react-use"
import { SortTransferBy, sortTransfers } from "sorters/transfers"
import { SortDirection } from "sorters/_common"

type TransfersByDaySelectProps = {
    transfers: Transfer[]
    ready: boolean
    onSelect?: (transfers: Transfer[]) => void
}

export default function TransfersByDaySelect(props: TransfersByDaySelectProps) {
    const { transfers, ready, onSelect } = props

    const [selected, setSelected] = useState<string | null>(null)
    const initialSet = useRef(false)
    const latestOnSelect = useLatest(onSelect)

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

    useEffect(() => {
        if (ready && !initialSet.current) {
            const first = Array.from(dayGroups)[0] ?? []

            const initialKey = first[0] ?? null
            const initialTransfers = first[1] ?? []

            if (initialKey) {
                setSelected(initialKey)
                latestOnSelect.current?.(initialTransfers)
                initialSet.current = true
            }
        }
    }, [ready, dayGroups])

    const handleValueChange = (value: string) => {
        setSelected(value)

        const groupedTransfers = dayGroups.get(value)
        onSelect?.(groupedTransfers ?? [])
    }

    return (
        <Select.Root value={selected || undefined} onValueChange={handleValueChange}>
            <Select.Trigger>
                <Select.Value />
                <Select.Icon>
                    <IconDirection />
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

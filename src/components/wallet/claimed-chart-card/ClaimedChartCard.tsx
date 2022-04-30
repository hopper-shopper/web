import { ParentSizeModern } from "@visx/responsive"
import { TransferDirection } from "api/filters/transfers"
import useTransfers from "api/hooks/useTransfers"
import * as Stepper from "components/inputs/stepper/Stepper"
import * as ChartContainer from "components/layout/chart-container/ChartContainer"
import * as Tag from "components/tag/Tag"
import { formatAdventure } from "formatters/adventure"
import { getSPFormatter } from "formatters/text"
import useScreenSize from "hooks/useScreenSize"
import { WalletAddress } from "models/User"
import { useEffect, useState } from "react"
import { SortAdventureBy, sortAdventures } from "sorters/adventures"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { Adventure, ALL_ADVENTURES } from "utils/adventures"
import { getAdventureForTransfer } from "utils/transfer"
import ClaimedChart, { CLAIMED_CHARTS_COLORS } from "./claimed-chart/ClaimedChart"
import useClaimedChartData from "./claimed-chart/useClaimedChartData"

type ClaimedChartCardProps = {
    wallet: WalletAddress
}

export default function ClaimedChartCard(props: ClaimedChartCardProps) {
    const { wallet } = props

    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const [visible, setVisible] = useState(new Set<Adventure>())
    const [days, setDays] = useState(10)

    const { transfers, dataSignature, loading } = useTransfers({
        user: wallet,
        direction: TransferDirection.IN,
        type: "claim",
    })

    useEffect(() => {
        const adventures = new Set<Adventure>()

        for (const transfer of transfers) {
            const adventure = getAdventureForTransfer(transfer)
            if (adventure) {
                adventures.add(adventure)
            }
        }

        setVisible(adventures)
    }, [transfers])

    const chartData = useClaimedChartData(transfers, { days })

    const toggleVisible = (adventure: Adventure) => {
        setVisible(prev => {
            const next = new Set(prev)
            if (next.has(adventure)) {
                next.delete(adventure)
            } else {
                next.add(adventure)
            }
            return next
        })
    }

    const chartHeight = ((): number => {
        if (isLaptopUp) {
            return 700
        } else if (isTabletUp) {
            return 500
        }

        return 300
    })()

    return (
        <ChartContainer.Root>
            <ChartContainer.Header>
                <ChartContainer.Title>Claimed FLY</ChartContainer.Title>

                <ChartContainer.Actions>
                    <Stepper.Root
                        min={1}
                        value={days}
                        onValueChange={setDays}
                        css={{ marginRight: "1rem" }}>
                        <Stepper.Decrement />
                        <Stepper.Value>
                            {days} {daySPFormatter(days)}
                        </Stepper.Value>
                        <Stepper.Increment />
                    </Stepper.Root>

                    <TagsList>
                        {sortedAdventures.map((adventure, index) => (
                            <Tag.Root
                                key={adventure}
                                disabled={!visible.has(adventure)}
                                onClick={() => toggleVisible(adventure)}>
                                <Tag.Marker
                                    css={{ backgroundColor: CLAIMED_CHARTS_COLORS[index] }}
                                />
                                <Tag.Text>{formatAdventure(adventure)}</Tag.Text>
                            </Tag.Root>
                        ))}
                    </TagsList>
                </ChartContainer.Actions>
            </ChartContainer.Header>

            <ChartContainer.Content css={{ height: chartHeight }}>
                <ParentSizeModern>
                    {({ width, height }) => (
                        <>
                            {!loading && (
                                <ClaimedChart
                                    key={dataSignature}
                                    width={width}
                                    height={height}
                                    visible={Array.from(visible)}
                                    data={chartData}
                                />
                            )}
                        </>
                    )}
                </ParentSizeModern>
            </ChartContainer.Content>
        </ChartContainer.Root>
    )
}

const sortedAdventures = sortAdventures(ALL_ADVENTURES, {
    by: SortAdventureBy.RANK,
    direction: SortDirection.ASC,
})

const daySPFormatter = getSPFormatter("Day", "Days")

const TagsList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.5rem",
    "@md": {
        display: "flex",
    },
})

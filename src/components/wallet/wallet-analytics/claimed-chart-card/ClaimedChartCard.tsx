import { ParentSizeModern } from "@visx/responsive"
import { TransferDirection } from "api/filters/transfers"
import useTransfers from "api/hooks/useTransfers"
import * as Stepper from "components/inputs/stepper/Stepper"
import * as Section from "components/layout/section/Section"
import * as Tag from "components/tag/Tag"
import { formatAdventure } from "formatters/adventure"
import { getSPFormatter } from "formatters/text"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import useUniqueToggleList from "hooks/useUniqueToggleList"
import { WalletAddress } from "models/User"
import { useEffect, useState } from "react"
import { SortAdventureBy, sortAdventures } from "sorters/adventures"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { Adventure, ALL_ADVENTURES } from "utils/adventures"
import { getAdventureForTransfer } from "utils/transfer"
import ClaimedChart, {
    CLAIMED_CHARTS_COLORS_DARK,
    CLAIMED_CHARTS_COLORS_LIGHT,
} from "./claimed-chart/ClaimedChart"
import useClaimedChartData from "./claimed-chart/useClaimedChartData"

type ClaimedChartCardProps = {
    wallet: WalletAddress
}

export default function ClaimedChartCard(props: ClaimedChartCardProps) {
    const { wallet } = props

    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const {
        state: visible,
        setState: setVisible,
        toggle: toggleVisibility,
    } = useUniqueToggleList<Adventure>([])
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
    const tagColors = useThemeValue(CLAIMED_CHARTS_COLORS_LIGHT, CLAIMED_CHARTS_COLORS_DARK)

    const chartHeight = ((): number => {
        if (isLaptopUp) {
            return 600
        } else if (isTabletUp) {
            return 500
        }
        return 300
    })()

    return (
        <Section.Root>
            <Section.Header>
                <Section.Title>Claimed FLY</Section.Title>
            </Section.Header>

            <Actions>
                <Stepper.Root min={1} value={days} onValueChange={setDays}>
                    <Stepper.Decrement />
                    <Stepper.Value css={{ minWidth: 70 }}>
                        {days} {daySPFormatter(days)}
                    </Stepper.Value>
                    <Stepper.Increment />
                </Stepper.Root>

                <TagsList>
                    {sortedAdventures.map((adventure, index) => (
                        <Tag.Root
                            key={adventure}
                            disabled={!visible.has(adventure)}
                            onClick={() => toggleVisibility(adventure)}>
                            <Tag.Marker css={{ backgroundColor: tagColors[index] }} />
                            <Tag.Text>{formatAdventure(adventure)}</Tag.Text>
                        </Tag.Root>
                    ))}
                </TagsList>
            </Actions>

            <Bg css={{ height: chartHeight }}>
                <ParentSizeModern>
                    {({ width, height }) => (
                        <>
                            {!loading && (
                                <ClaimedChart
                                    key={dataSignature}
                                    width={width}
                                    height={height}
                                    visible={visible}
                                    data={chartData}
                                />
                            )}
                        </>
                    )}
                </ParentSizeModern>
            </Bg>
        </Section.Root>
    )
}

const sortedAdventures = sortAdventures(ALL_ADVENTURES, {
    by: SortAdventureBy.RANK,
    direction: SortDirection.ASC,
})

const daySPFormatter = getSPFormatter("Day", "Days")

const Bg = styled("div", {
    backgroundColor: "$gray2",
    padding: "0.5rem",
    borderRadius: "$md",
    "@md": {
        padding: "1rem",
    },
})
const Actions = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    marginTop: "1rem",
    "@md": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})
const TagsList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.5rem",
    "@md": {
        display: "flex",
    },
})

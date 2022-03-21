import { fetchHoppers, HoppersFilter } from "api/hoppers"
import { Hopper } from "models/Hopper"
import { forwardRef, useEffect, useState } from "react"
import { ListProps, ScrollerProps, Virtuoso } from "react-virtuoso"
import { styled } from "theme"
import HopperCard from "../hopper-card/HopperCard"

type HoppersTableProps = {
    filter: HoppersFilter
}

export default function HoppersTable(props: HoppersTableProps) {
    const {
        filter: { adventure, market },
    } = props

    const [hoppers, setHoppers] = useState<Hopper[]>([])

    useEffect(() => {
        const load = async () => {
            try {
                const hoppers = await fetchHoppers({
                    adventure,
                    market,
                })
                setHoppers(hoppers)
            } catch (error) {
                console.error(error)
            }
        }
        load()
    }, [adventure, market])

    return (
        <Virtuoso
            style={{ height: 600 }}
            useWindowScroll
            data={hoppers}
            totalCount={hoppers.length}
            itemContent={index => <HopperCard hopper={hoppers[index]} />}
            components={{
                List,
            }}
        />
    )
}

const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
    return <StyledList {...props} ref={ref} />
})

const StyledList = styled("div", {
    display: "grid",
    rowGap: "1rem",
})

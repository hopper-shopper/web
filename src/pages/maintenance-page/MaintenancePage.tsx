import useApplyTheme from "hooks/useApplyTheme"
import { useCallback, useEffect, useState } from "react"
import { globalStyles, styled } from "theme"
import { random } from "utils/numbers"

export default function MaintenancePage() {
    globalStyles()
    useApplyTheme()

    const [rect, setRect] = useState(new DOMRect())
    const [flyPositions, setFlyPositions] = useState<FlyPosition[]>([])

    const [caught, setCaught] = useState(0)

    const onMainRefChange = useCallback((element: HTMLDivElement | null) => {
        if (element) {
            setRect(element.getBoundingClientRect())
        }
    }, [])

    useEffect(() => {
        if (caught % 5 !== 0) {
            return
        }

        const { width, height } = rect

        const minX = 40
        const maxX = width - 40
        const minY = 40
        const maxY = height - 40

        const nextFlies: FlyPosition[] = []
        for (let i = 0; i < 5; i++) {
            nextFlies.push({
                id: i,
                caught: false,
                x: random(minX, maxX),
                y: random(minY, maxY),
            })
        }

        setFlyPositions(nextFlies)
    }, [rect, caught])

    const catchFly = (id: number) => {
        setCaught(prev => prev + 1)
        setFlyPositions(prev => {
            return prev.map(pos => {
                if (pos.id === id) {
                    return { ...pos, caught: true }
                }
                return pos
            })
        })
    }

    return (
        <Main ref={onMainRefChange}>
            <Title>Hoppershopper is currently down for a short maintenance</Title>
            <Description>In the meantime try catching some FLY manually!</Description>

            <CaughtFly>{caught} FLY caught</CaughtFly>

            {flyPositions.map(pos => (
                <Fly
                    key={pos.id}
                    css={{
                        display: pos.caught ? "none" : "block",
                        top: 0,
                        left: 0,
                        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                    }}
                    src="/fly.webp"
                    onClick={() => catchFly(pos.id)}
                />
            ))}
        </Main>
    )
}

// Types
type FlyPosition = {
    id: number
    caught: boolean
    x: number
    y: number
}

// Components
const Main = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    width: "100vw",
    height: "100vh",
    backgroundColor: "$gray1",
    position: "relative",
})
const Title = styled("h1", {
    textAlign: "center",
    fontSize: "2rem",
    color: "$gray12",
    lineHeight: 1.5,
})
const Description = styled("p", {
    color: "$gray11",
    fontSize: "1.25rem",
    lineHeight: 1.5,
    textAlign: "center",
})
const CaughtFly = styled("p", {
    color: "$blue11",
    fontSize: "1.25rem",
    marginTop: "2rem",
    lineHeight: 1.5,
    textAlign: "center",
})
const Fly = styled("img", {
    display: "block",
    size: 40,
    position: "absolute",
    cursor: "pointer",
})

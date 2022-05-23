import * as ProgressPrimitives from "@radix-ui/react-progress"
import { ComponentProps } from "@stitches/react"
import { createContext, CSSProperties, useContext, useEffect, useRef } from "react"
import { styled } from "theme"
import useResizeObserver from "use-resize-observer"
import { OmitOwnProps } from "utils/types"

type ProgressContextProps = {
    railWidth: number
}
const ProgressContext = createContext<ProgressContextProps>({
    railWidth: 0,
})
function useProgressContext() {
    return useContext(ProgressContext)
}

const StyledIndicatorContainer = styled("div", {
    position: "absolute",
    inset: -1,
    borderRadius: "$md",
    overflow: "hidden",
    border: "1px solid transparent",
    zIndex: 10,
})
const StyledIndicator = styled(ProgressPrimitives.Indicator, {
    height: "100%",
    transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    rr: "$sm",
    paddingRight: "0.5rem",
    variants: {
        align: {
            left: {
                justifyContent: "flex-start",
            },
            right: {
                justifyContent: "flex-end",
            },
        },
    },
    defaultVariants: {
        align: "right",
    },
})

const StyledStep = styled("div", {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    zIndex: 100,
})
const StyledStepChildren = styled("div", {
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "center",
    color: "$gray11",
    fontSize: "0.75rem",
})

const StyledRoot = styled(ProgressPrimitives.Root, {
    position: "relative",
    backgroundColor: "$gray3",
    borderRadius: "$md",
    border: "1px solid $gray6",
    variants: {
        color: {
            normal: {
                backgroundColor: "$blue2",
                borderColor: "$blue6",
                [`& ${StyledIndicator}`]: {
                    backgroundColor: "$blue9",
                    color: "$blue12",
                },
                [`& ${StyledStep}`]: {
                    backgroundColor: "$blue7",
                },
                [`& ${StyledStepChildren}`]: {
                    color: "$blue11",
                },
            },
            danger: {
                backgroundColor: "$red2",
                borderColor: "$red6",
                [`& ${StyledIndicator}`]: {
                    backgroundColor: "$red9",
                    color: "$red12",
                },
                [`& ${StyledStep}`]: {
                    backgroundColor: "$red7",
                },
                [`& ${StyledStepChildren}`]: {
                    color: "$red11",
                },
            },
        },
        size: {
            md: {
                height: "1.5rem",
            },
            lg: {
                height: "2.5rem",
            },
        },
    },
    defaultVariants: {
        color: "normal",
        size: "md",
    },
})

type RootProps = ComponentProps<typeof StyledRoot>
function WrappedRoot(props: RootProps) {
    const { ref, width = 0 } = useResizeObserver({
        box: "border-box",
    })

    return (
        <ProgressContext.Provider value={{ railWidth: width }}>
            <StyledRoot {...props} ref={ref} />
        </ProgressContext.Provider>
    )
}

type IndicatorOwnProps = {
    /**
     * Width of the indicator in percent (0 - 1)
     */
    percent?: number
}
type IndicatorProps = OmitOwnProps<typeof StyledIndicator, IndicatorOwnProps>
function WrappedIndicator(props: IndicatorProps) {
    const { percent, ...restIndicatorProps } = props

    const styles = ((): CSSProperties | undefined => {
        if (percent === undefined) {
            return restIndicatorProps.style
        }
        return {
            ...restIndicatorProps.style,
            width: `${percent * 100}%`,
        }
    })()

    return (
        <StyledIndicatorContainer>
            <StyledIndicator {...restIndicatorProps} style={styles} />
        </StyledIndicatorContainer>
    )
}

type StepOwnProps = {
    /**
     * Value in percent (0 - 1) if the total width
     */
    at: number
    children?: React.ReactNode
}
type StepProps = OmitOwnProps<typeof StyledStep, StepOwnProps>
function WrappedStep(props: StepProps) {
    const { at, children, ...restStepProps } = props

    const { railWidth } = useProgressContext()
    const percentTransformPx = railWidth * at
    const stepTransform = `translateX(${percentTransformPx}px)`
    const contentTransform = `translate3d(calc(-50% + ${percentTransformPx}px), -120%, 0px)`

    return (
        <>
            <StyledStep
                {...restStepProps}
                style={{ ...restStepProps.style, transform: stepTransform }}
            />
            {children && (
                <StyledStepChildren style={{ transform: contentTransform }}>
                    {children}
                </StyledStepChildren>
            )}
        </>
    )
}

export const Root = WrappedRoot
export const Indicator = WrappedIndicator
export const Step = WrappedStep

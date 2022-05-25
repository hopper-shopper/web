import { ComponentProps } from "@stitches/react"
import { IconMinus, IconPlus } from "@tabler/icons"
import useControllableState from "hooks/useControllableState"
import { createContext, useContext, MouseEvent } from "react"
import { styled } from "theme"
import { OmitOwnProps } from "utils/types"

type StepperContextProps = {
    value: number
    increment: () => void
    decrement: () => void
    canIncrement: boolean
    canDecrement: boolean
}

const StepperContext = createContext<StepperContextProps>({
    value: 0,
    increment: () => {},
    decrement: () => {},
    canIncrement: true,
    canDecrement: true,
})
function useStepperContext() {
    return useContext(StepperContext)
}

const StyledRoot = styled("div", {
    display: "flex",
    columnGap: "1rem",
    alignItems: "center",
})

const StyledValue = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
    whiteSpace: "nowrap",
    textAlign: "center",
})

const StyledChange = styled("button", {
    all: "unset",
    boxSizing: "border-box",
    size: "1.5rem",
    borderRadius: "$sm",
    border: "1px solid $gray7",
    backgroundColor: "$gray2",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    color: "$gray11",
    "&:hover": {
        borderColor: "$gray8",
        color: "$gray12",
        backgroundColor: "$gray3",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
    "&:disabled": {
        opacity: 0.5,
        pointerEvents: "none",
    },
    "& > svg": {
        size: "1rem",
    },
})

type RootOwnProps = {
    defaultValue?: number
    value?: number
    onValueChange?: (value: number) => void
    min?: number
    max?: number
}
type RootProps = OmitOwnProps<typeof StyledRoot, RootOwnProps>

function WrappedRoot(props: RootProps) {
    const {
        defaultValue,
        value: controlledValue,
        onValueChange,
        min = -Infinity,
        max = Infinity,
        ...restRootProps
    } = props

    const [value, setValue] = useControllableState({
        value: controlledValue,
        defaultValue,
        onChange: onValueChange,
    })

    const increment = () => {
        setValue(prev => {
            const next = (prev || 0) + 1
            if (next > max) {
                return max
            }
            return next
        })
    }
    const decrement = () => {
        setValue(prev => {
            const next = (prev || 0) - 1
            if (next < min) {
                return min
            }
            return next
        })
    }

    const canIncrement = (value || 0) < max
    const canDecrement = (value || 0) > min

    return (
        <StepperContext.Provider
            value={{ value: value || 0, increment, decrement, canIncrement, canDecrement }}>
            <StyledRoot {...restRootProps} />
        </StepperContext.Provider>
    )
}
function WrappedValue(props: ComponentProps<typeof StyledValue>) {
    const { value } = useStepperContext()

    const children = props.children ?? value

    return <StyledValue {...props}>{children}</StyledValue>
}
function WrappedIncrement(props: ComponentProps<typeof StyledChange>) {
    const { increment, canIncrement } = useStepperContext()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        increment()
        props.onClick?.(event)
    }

    return (
        <StyledChange {...props} disabled={!canIncrement || props.disabled} onClick={handleClick}>
            <IconPlus />
        </StyledChange>
    )
}
function WrappedDecrement(props: ComponentProps<typeof StyledChange>) {
    const { decrement, canDecrement } = useStepperContext()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        decrement()
        props.onClick?.(event)
    }

    return (
        <StyledChange {...props} disabled={!canDecrement || props.disabled} onClick={handleClick}>
            <IconMinus />
        </StyledChange>
    )
}

export const Root = WrappedRoot
export const Value = WrappedValue
export const Increment = WrappedIncrement
export const Decrement = WrappedDecrement

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
}

const StepperContext = createContext<StepperContextProps>({
    value: 0,
    increment: () => {},
    decrement: () => {},
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
})

const StyledChange = styled("button", {
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
    "& > svg": {
        fontSize: "1.25rem",
    },
})

type RootOwnProps = {
    defaultValue?: number
    value?: number
    onValueChange?: (value: number) => void
}
type RootProps = OmitOwnProps<typeof StyledRoot, RootOwnProps>

function WrappedRoot(props: RootProps) {
    const { defaultValue, value: controlledValue, onValueChange, ...restRootProps } = props

    const [value, setValue] = useControllableState({
        value: controlledValue,
        defaultValue,
        onChange: onValueChange,
    })

    const increment = () => setValue(prev => (prev || 0) + 1)
    const decrement = () => setValue(prev => (prev || 0) - 1)

    return (
        <StepperContext.Provider value={{ value: value || 0, increment, decrement }}>
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
    const { increment } = useStepperContext()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        increment()
        props.onClick?.(event)
    }

    return (
        <StyledChange {...props} onClick={handleClick}>
            <IconPlus />
        </StyledChange>
    )
}
function WrappedDecrement(props: ComponentProps<typeof StyledChange>) {
    const { decrement } = useStepperContext()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        decrement()
        props.onClick?.(event)
    }

    return (
        <StyledChange {...props} onClick={handleClick}>
            <IconMinus />
        </StyledChange>
    )
}

export const Root = WrappedRoot
export const Value = WrappedValue
export const Increment = WrappedIncrement
export const Decrement = WrappedDecrement

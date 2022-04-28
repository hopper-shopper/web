import useControllableState from "hooks/useControllableState"
import { createContext, MouseEvent, useContext } from "react"
import { styled } from "theme"
import { OmitOwnProps } from "utils/types"

type TabsContextProps = {
    active?: string
    onChange: (value: string) => void
}
const TabsContext = createContext<TabsContextProps>({
    active: undefined,
    onChange: () => {},
})
function useTabsContext() {
    return useContext(TabsContext)
}

const StyledRoot = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
})

const StyledTab = styled("button", {
    all: "unset",
    display: "inline-block",
    textAlign: "center",
    height: "2rem",
    padding: "0 1rem",
    borderRadius: "$md",
    fontSize: "1rem",
    variants: {
        active: {
            true: {
                backgroundColor: "$blue9",
                color: "$blue12",
            },
            false: {
                color: "$gray11",
                "&:hover": {
                    backgroundColor: "$gray5",
                    color: "$gray12",
                },
            },
        },
    },
    defaultVariants: {
        active: false,
    },
})

type RootOwnProps = {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
}
type RootProps = OmitOwnProps<typeof StyledRoot, RootOwnProps>
function WrappedRoot(props: RootProps) {
    const { defaultValue, value: controlledValue, onValueChange, ...restRootProps } = props

    const [active, setActive] = useControllableState({
        value: controlledValue,
        defaultValue,
        onChange: onValueChange,
    })

    return (
        <TabsContext.Provider value={{ active, onChange: setActive }}>
            <StyledRoot {...restRootProps} />
        </TabsContext.Provider>
    )
}

type TabOwnProps = {
    value: string
}
type TabProps = OmitOwnProps<typeof StyledTab, TabOwnProps>
function WrappedTab(props: TabProps) {
    const { value, ...restTabProps } = props

    const { active, onChange } = useTabsContext()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChange(value)
        restTabProps.onClick?.(event)
    }

    const isActive = active === value

    return <StyledTab {...restTabProps} active={isActive} onClick={handleClick} />
}

export const Root = WrappedRoot
export const Tab = WrappedTab

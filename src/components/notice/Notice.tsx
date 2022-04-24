import { ComponentProps, VariantProps } from "@stitches/react"
import { IconX } from "@tabler/icons"
import useControllableState from "hooks/useControllableState"
import { createContext, useContext } from "react"
import { styled } from "theme"

type NoticeContextProps = {
    color: VariantProps<typeof StyledRoot>["color"]
    hidden: boolean
    onHiddenChange: (hidden: boolean) => void
}
const NoticeContext = createContext<NoticeContextProps>({
    color: "neutral",
    hidden: false,
    onHiddenChange: () => {},
})
function useNoticeContext() {
    return useContext(NoticeContext)
}

const StyledRoot = styled("div", {
    borderRadius: "$md",
    padding: "0.5rem 1rem",
    border: "3px solid transparent",
    display: "flex",
    alignItems: "flex-start",
    columnGap: "1rem",
    variants: {
        color: {
            neutral: {
                backgroundColor: "$gray9",
                borderColor: "$gray6",
            },
            info: {
                backgroundColor: "$blue9",
                borderColor: "$blue6",
            },
            danger: {
                backgroundColor: "$red9",
                borderColor: "$red6",
            },
            success: {
                backgroundColor: "$teal9",
                borderColor: "$teal6",
            },
        },
        hidden: {
            true: {
                display: "none",
            },
        },
    },
    defaultVariants: {
        hidden: false,
    },
})

const StyledText = styled("p", {
    flex: 1,
    fontSize: "1rem",
    lineHeight: 1.5,
    variants: {
        color: {
            neutral: {
                color: "$gray12",
            },
            info: {
                color: "$blue12",
            },
            danger: {
                color: "$red12",
            },
            success: {
                color: "$teal12",
            },
        },
    },
})

const StyledDismiss = styled("button", {
    borderRadius: "50%",
    border: "none",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    size: "1.5rem",
    "> svg": {
        size: "1rem",
    },
    variants: {
        color: {
            neutral: {
                backgroundColor: "$gray9",
                color: "$gray12",
                "&:hover": {
                    backgroundColor: "$gray10",
                },
                "&:focus": {
                    backgroundColor: "$gray11",
                    outline: "2px solid $gray8",
                },
            },
            info: {
                backgroundColor: "$blue9",
                color: "$blue12",
                "&:hover": {
                    backgroundColor: "$blue10",
                },
                "&:focus": {
                    backgroundColor: "$blue11",
                    outline: "2px solid $blue8",
                },
            },
            danger: {
                backgroundColor: "$red9",
                color: "$red12",
                "&:hover": {
                    backgroundColor: "$red10",
                },
                "&:focus": {
                    backgroundColor: "$red11",
                    outline: "2px solid $red8",
                },
            },
            success: {
                backgroundColor: "$teal9",
                color: "$teal12",
                "&:hover": {
                    backgroundColor: "$teal10",
                },
                "&:focus": {
                    backgroundColor: "$teal11",
                    outline: "2px solid $teal8",
                },
            },
        },
    },
})

type RootOwnProps = {
    defaultHidden?: boolean
    hidden?: boolean
    onHiddenChange?: (hidden: boolean) => void
}
type RootProps = Omit<ComponentProps<typeof StyledRoot>, keyof RootOwnProps> & RootOwnProps
function WrappedRoot(props: RootProps) {
    const { defaultHidden, hidden: controlledHidden, onHiddenChange, ...restRootProps } = props

    const [hidden = false, setHidden] = useControllableState({
        value: controlledHidden,
        defaultValue: defaultHidden,
        onChange: onHiddenChange,
    })

    return (
        <NoticeContext.Provider
            value={{ color: restRootProps.color, hidden, onHiddenChange: setHidden }}>
            <StyledRoot {...restRootProps} hidden={hidden} />
        </NoticeContext.Provider>
    )
}

function WrappedText(props: ComponentProps<typeof StyledText>) {
    const { color } = useNoticeContext()

    return <StyledText {...props} color={props.color ?? color} />
}

function WrappedDismiss(props: ComponentProps<typeof StyledDismiss>) {
    const { color, onHiddenChange } = useNoticeContext()

    const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(event)
        onHiddenChange(true)
    }

    return (
        <StyledDismiss {...props} color={props.color ?? color} onClick={handleDismiss}>
            <IconX />
        </StyledDismiss>
    )
}

export const Root = WrappedRoot
export const Text = WrappedText
export const Dismiss = WrappedDismiss

import { ComponentProps } from "@stitches/react"
import { styled } from "theme"
import * as Portal from "@radix-ui/react-portal"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import { IconX } from "@tabler/icons"
import { createContext, useContext, useEffect } from "react"

export type RootProps = {
    open: boolean
    onDismiss: () => void
    children?: React.ReactNode
}
type RootContextProps = {
    open: boolean
    onDismiss: () => void
}
const RootContext = createContext<RootContextProps>({
    open: false,
    onDismiss: () => {},
})
function useRootContext() {
    return useContext(RootContext)
}

function WrappedRoot(props: RootProps) {
    const { open, onDismiss, children } = props

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [open])

    return <RootContext.Provider value={{ open, onDismiss }}>{children}</RootContext.Provider>
}

const StyledRoot = styled("div", {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
})

const StyledOverlay = styled("div", {
    zIndex: 99,
    backgroundColor: "$blackA9",
    position: "fixed",
    inset: 0,
})

const StyledContent = styled("div", {
    zIndex: 100,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "$gray2",
    borderLeft: "1px solid $gray6",
    padding: "2rem",
    width: "100vw",
    maxWidth: "80vw",
    "@sm": {
        maxWidth: 350,
    },
})

function WrappedContent(props: ComponentProps<typeof StyledContent>) {
    const { onDismiss } = useRootContext()

    return (
        <Portal.Root>
            <StyledRoot>
                <StyledOverlay onClick={onDismiss} />
                <StyledContent {...props} />
            </StyledRoot>
        </Portal.Root>
    )
}

const StyledTitle = styled("h2", {
    margin: 0,
    fontWeight: 500,
    fontSize: "1.25rem",
    color: "$gray12",
    marginBottom: "2rem",
})

const StyledCloseIconButton = styled(IconButton, {
    position: "absolute",
    top: "1rem",
    right: "2rem",
})

function CloseButton(props: ComponentProps<typeof StyledCloseIconButton>) {
    const { onDismiss } = useRootContext()

    return (
        <StyledCloseIconButton {...props} onClick={onDismiss} size="md">
            <IconX />
        </StyledCloseIconButton>
    )
}

export const Root = WrappedRoot
export const Content = WrappedContent
export const Title = StyledTitle
export const Close = CloseButton

import { ComponentProps } from "@stitches/react"
import { styled } from "theme"
import * as Portal from "@radix-ui/react-portal"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import { IconX } from "@tabler/icons"
import { createContext, useContext, useEffect } from "react"
import { Slot, SlotProps } from "@radix-ui/react-slot"
import useControllableState from "hooks/useControllableState"

export type RootProps = {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
}
type DialogContextProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}
const DialogContext = createContext<DialogContextProps>({
    open: false,
    onOpenChange: () => {},
})
function useDialogContext() {
    return useContext(DialogContext)
}

function WrappedRoot(props: RootProps) {
    const { defaultOpen, open: controlledOpen, onOpenChange, children } = props

    const [open = false, setOpen] = useControllableState({
        value: controlledOpen,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    })

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [open])

    return (
        <DialogContext.Provider value={{ open, onOpenChange: setOpen }}>
            {children}
        </DialogContext.Provider>
    )
}

const StyledRoot = styled("div", {
    position: "fixed",
    inset: 0,
})

function WrappedTrigger(props: SlotProps) {
    const { open, onOpenChange } = useDialogContext()

    const handleClick = () => {
        onOpenChange(open ? false : true)
    }

    return <Slot {...props} onClick={handleClick} />
}

const StyledOverlay = styled("div", {
    zIndex: 99,
    backgroundColor: "$blackA9",
    position: "fixed",
    inset: 0,
    backdropFilter: "blur(3px)",
})

const StyledContent = styled("div", {
    zIndex: 100,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(0px)",
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
    const { open, onOpenChange } = useDialogContext()

    const handleDismiss = () => {
        onOpenChange(false)
    }

    if (!open) {
        return null
    }

    return (
        <Portal.Root>
            <StyledRoot>
                <StyledOverlay onClick={handleDismiss} />
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
    const { onOpenChange } = useDialogContext()

    const handleDismiss = () => {
        onOpenChange(false)
    }

    return (
        <StyledCloseIconButton {...props} onClick={handleDismiss} size="md">
            <IconX />
        </StyledCloseIconButton>
    )
}

export const Root = WrappedRoot
export const Trigger = WrappedTrigger
export const Content = WrappedContent
export const Title = StyledTitle
export const Close = CloseButton

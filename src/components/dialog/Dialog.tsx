import * as DialogPrimitives from "@radix-ui/react-dialog"
import { ComponentProps } from "@stitches/react"
import { IconX } from "@tabler/icons"
import Button from "components/inputs/buttons/button/Button"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import Screen from "components/layout/screen/Screen"
import useControllableState from "hooks/useControllableState"
import { createContext, useContext } from "react"
import { Screens, styled } from "theme"

// Context
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

// Components

const StyledOverlay = styled(DialogPrimitives.Overlay, {
    zIndex: 99,
    backgroundColor: "$blackA9",
    position: "fixed",
    inset: 0,
    backdropFilter: "blur(3px)",
})

const StyledContent = styled(DialogPrimitives.Content, {
    zIndex: 100,
    backgroundColor: "$gray1",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    maxWidth: Screens.sm,
    height: "100vh",
    padding: "1rem",
    paddingBottom: "4rem",
    display: "flex",
    flexDirection: "column",
    "&:focus": {
        outline: "none",
    },
    "@md": {
        height: "auto",
        maxHeight: "80vh",
        borderRadius: "$md",
        border: "1px solid $gray6",
        paddingBottom: 0,
        padding: "2rem",
    },
})

const StyledFooter = styled("div", {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "$gray3",
    padding: "1rem",
    display: "flex",
})

const StyledTitle = styled(DialogPrimitives.Title, {
    margin: 0,
    fontWeight: 500,
    fontSize: "1.25rem",
    color: "$gray12",
    marginBottom: "1rem",
})

const StyledDescription = styled(DialogPrimitives.Description, {
    marginBottom: "1.5rem",
    color: "$gray11",
    fontSize: "0.875rem",
    lineHeight: 1.5,
})

const StyledCloseIconButton = styled(IconButton, {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
})

// Wrapped components

type RootProps = DialogPrimitives.DialogProps
function WrappedRoot(props: RootProps) {
    const { defaultOpen, open: controlledOpen, onOpenChange, ...restRootProps } = props

    const [open = false, setOpen] = useControllableState({
        defaultValue: defaultOpen,
        value: controlledOpen,
        onChange: onOpenChange,
    })

    return (
        <DialogContext.Provider value={{ open, onOpenChange: setOpen }}>
            <DialogPrimitives.Root {...restRootProps} open={open} onOpenChange={setOpen} />
        </DialogContext.Provider>
    )
}

type ContentProps = ComponentProps<typeof StyledContent>
function WrappedContent(props: ContentProps) {
    const { onOpenChange } = useDialogContext()

    return (
        <DialogPrimitives.Portal>
            <StyledOverlay />
            <StyledContent {...props}>
                {props.children}

                <Screen bp="md" constraint="max">
                    <StyledFooter>
                        <Button
                            color="neutral"
                            size="sm"
                            fullWidth
                            onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </StyledFooter>
                </Screen>
            </StyledContent>
        </DialogPrimitives.Portal>
    )
}

function CloseButton() {
    return (
        <DialogPrimitives.Close asChild>
            <StyledCloseIconButton size="sm">
                <IconX />
            </StyledCloseIconButton>
        </DialogPrimitives.Close>
    )
}

export const Root = WrappedRoot
export const Trigger = DialogPrimitives.Trigger
export const Content = WrappedContent
export const Title = StyledTitle
export const Description = StyledDescription
export const Close = CloseButton

import * as DialogPrimitives from "@radix-ui/react-dialog"
import { ComponentProps } from "@stitches/react"
import { IconX } from "@tabler/icons"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import { Screens, styled } from "theme"

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
    borderRadius: "$md",
    border: "1px solid $gray6",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    maxWidth: Screens.sm,
    maxHeight: "80vh",
    padding: "2rem",
    "&:focus": {
        outline: "none",
    },
})

function WrappedContent(props: ComponentProps<typeof StyledContent>) {
    return (
        <DialogPrimitives.Portal>
            <StyledOverlay />
            <StyledContent {...props} />
        </DialogPrimitives.Portal>
    )
}

const StyledTitle = styled(DialogPrimitives.Title, {
    margin: 0,
    fontWeight: 500,
    fontSize: "1.25rem",
    color: "$gray12",
    marginBottom: "1rem",
})

const StyledDescription = styled(DialogPrimitives.Description, {
    marginBottom: "1.5rem",
    fontSize: "0.875rem",
    lineHeight: 1.5,
})

const StyledCloseIconButton = styled(IconButton, {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
})

function CloseButton() {
    return (
        <DialogPrimitives.Close asChild>
            <StyledCloseIconButton size="sm">
                <IconX />
            </StyledCloseIconButton>
        </DialogPrimitives.Close>
    )
}

export const Root = DialogPrimitives.Root
export const Trigger = DialogPrimitives.Trigger
export const Content = WrappedContent
export const Title = StyledTitle
export const Description = StyledDescription
export const Close = CloseButton

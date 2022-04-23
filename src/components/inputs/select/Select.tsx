import * as SelectPrimitives from "@radix-ui/react-select"
import { ComponentProps } from "@stitches/react"
import { IconCheck, IconChevronDown, IconChevronUp, IconDirection } from "@tabler/icons"
import { styled, ThemeCSS } from "theme"

const StyledTrigger = styled(SelectPrimitives.Trigger, {
    all: "unset",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "$sm",
    border: "1px solid $gray7",
    padding: "0 1rem",
    height: "2.5rem",
    fontSize: "1rem",
    lineHeight: 1,
    columnGap: "1rem",
    backgroundColor: "$gray2",
    color: "$gray11",
    minWidth: 200,
    "&:hover": {
        backgroundColor: "$gray3",
        borderColor: "$gray8",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
})

const StyledIcon = styled(SelectPrimitives.Icon, {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    "& > svg": {
        size: "1rem",
    },
})

const StyledContent = styled(SelectPrimitives.Content, {
    overflow: "hidden",
    backgroundColor: "$gray2",
    borderRadius: "$md",
    border: "1px solid $gray6",
    minWidth: 200,
})

const StyledViewport = styled(SelectPrimitives.Viewport, {
    padding: "0.5rem",
})

const StyledItem = styled(SelectPrimitives.Item, {
    all: "unset",
    fontSize: "1rem",
    lineHeight: 1,
    color: "$gray11",
    borderRadius: "$sm",
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 0.5rem",
    paddingLeft: "1.5rem",
    position: "relative",
    userSelect: "none",
    "&[data-disabled]": {
        color: "$gray9",
        pointerEvents: "none",
    },
    "&:focus": {
        backgroundColor: "$gray5",
        color: "$gray12",
    },
})

const StyledLabel = styled(SelectPrimitives.Label, {
    paddingLeft: "1.5rem",
    fontSize: "0.75rem",
    color: "$gray11",
    lineHeight: 1.5,
    margin: "0.25rem 0",
})

const StyledSeparator = styled(SelectPrimitives.Separator, {
    height: 1,
    backgroundColor: "$gray6",
    margin: "0.5rem -0.5rem",
})

const StyledItemIndicator = styled(SelectPrimitives.ItemIndicator, {
    position: "absolute",
    left: 0,
    width: "1.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    "& > svg": {
        size: "0.75rem",
        color: "$blue9",
    },
})

const scrollButtonStyles: ThemeCSS = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1.5rem",
    backgroundColor: "$gray3",
    color: "$gray11",
    cursor: "default",
}
const StyledScrollUpButton = styled(SelectPrimitives.ScrollUpButton, {
    ...scrollButtonStyles,
})
const StyledScrollDownButton = styled(SelectPrimitives.ScrollDownButton, {
    ...scrollButtonStyles,
})

function WrappedContent(props: ComponentProps<typeof StyledContent>) {
    return (
        <StyledContent {...props}>
            <WrappedScrollUpButton />

            <StyledViewport>{props.children}</StyledViewport>

            <WrappedScrollDownButton />
        </StyledContent>
    )
}

function WrappedIcon(props: ComponentProps<typeof StyledIcon>) {
    return (
        <StyledIcon {...props}>
            <IconDirection />
        </StyledIcon>
    )
}

function WrappedItemIndicator(props: ComponentProps<typeof StyledItemIndicator>) {
    return (
        <StyledItemIndicator>
            <IconCheck />
        </StyledItemIndicator>
    )
}

function WrappedScrollUpButton(props: ComponentProps<typeof StyledScrollUpButton>) {
    return (
        <StyledScrollUpButton {...props}>
            <IconChevronUp />
        </StyledScrollUpButton>
    )
}

function WrappedScrollDownButton(props: ComponentProps<typeof StyledScrollDownButton>) {
    return (
        <StyledScrollDownButton {...props}>
            <IconChevronDown />
        </StyledScrollDownButton>
    )
}

export const Root = SelectPrimitives.Root
export const Trigger = StyledTrigger
export const Value = SelectPrimitives.Value
export const Icon = WrappedIcon
export const Content = WrappedContent
export const Viewport = StyledViewport
export const Group = SelectPrimitives.Group
export const Label = StyledLabel
export const Item = StyledItem
export const ItemText = SelectPrimitives.ItemText
export const ItemIndicator = WrappedItemIndicator
export const Separator = StyledSeparator
export const ScrollUpButton = WrappedScrollUpButton
export const ScrollDownButton = WrappedScrollDownButton

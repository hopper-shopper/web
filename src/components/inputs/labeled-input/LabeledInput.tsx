import { ComponentProps } from "@stitches/react"
import React from "react"
import { styled } from "theme"

const StyledInput = styled("input", {
    all: "unset",
    display: "block",
    flex: 1,
    outline: "none",
    height: "2.5rem",
    minWidth: 0,
    "&::placeholder": {
        color: "$gray7",
    },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
    },
})

const StyledHint = styled("span", {
    color: "$gray11",
    fontSize: "0.875rem",
    pointerEvents: "none",
})

const StyledContainer = styled("div", {
    display: "flex",
    alignItems: "center",
    backgroundColor: "$gray2",
    padding: "0 1rem",
    borderRadius: "$sm",
    border: "1px solid $gray7",
    color: "$gray11",
    columnGap: "0.5rem",
    minWidth: 150,
    "&:hover": {
        backgroundColor: "$gray3",
        borderColor: "$gray8",
    },
    "&:focus-within": {
        outline: "2px solid $blue8",
        [`& ${StyledHint}`]: {
            color: "$blue11",
        },
    },
})

function Container(props: ComponentProps<typeof StyledContainer>) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.querySelector("input")?.focus()
        props.onClick?.(event)
    }

    return <StyledContainer {...props} onClick={handleClick} />
}

export const Root = Container
export const Input = StyledInput
export const Hint = StyledHint

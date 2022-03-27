import { styled } from "theme"

const Input = styled("input", {
    display: "block",
    width: "100%",
    backgroundColor: "$gray2",
    height: "2.5rem",
    padding: "0 1rem",
    borderRadius: "0.25rem",
    border: "1px solid $gray7",
    color: "$gray11",
    minWidth: 0,
    "&:hover": {
        backgroundColor: "$gray3",
        borderColor: "$gray8",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
    "&::placeholder": {
        color: "$gray7",
    },
})

export default Input

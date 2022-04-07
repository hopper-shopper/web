import { styled } from "theme"

const IconButton = styled("button", {
    size: "2.5rem",
    backgroundColor: "$gray3",
    color: "$gray11",
    borderRadius: "50%",
    border: "none",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    "> svg": {
        size: "1.25rem",
    },
    "&:hover": {
        backgroundColor: "$gray4",
    },
    "&:focus": {
        backgroundColor: "$gray5",
        outline: "2px solid $blue8",
    },
})

export default IconButton

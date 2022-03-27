import { styled } from "theme"
import Label from "../label/Label"

const Fieldset = styled("fieldset", {
    border: "none",
    padding: 0,
    margin: 0,
    [`& ${Label}`]: {
        marginBottom: "0.25rem",
    },
})

export default Fieldset

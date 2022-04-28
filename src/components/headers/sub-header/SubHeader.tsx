import { styled } from "theme"

const SubHeader = styled("div", {
    marginTop: "-1rem",
    mx: "-1rem",
    padding: "1rem",
    backgroundColor: "$gray3",
    borderBottom: "1px solid $gray6",
    "@md": {
        marginTop: "-2rem",
        mx: "-2rem",
        padding: "1rem 2rem",
    },
    "@lg": {
        padding: "2rem",
    },
})

export default SubHeader

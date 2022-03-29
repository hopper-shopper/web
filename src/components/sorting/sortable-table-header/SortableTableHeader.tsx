import { ComponentProps } from "@stitches/react"
import { useSortContext } from "hooks/useSort"
import { styled } from "theme"
import SortArrow from "../sort-arrow/SortArrow"

type SortableTableHeaderProps<SortBy> = ComponentProps<typeof StyledTableHeader> & {
    sortBy: SortBy
    children?: React.ReactNode
}

export default function SortableTableHeader<SortBy>(props: SortableTableHeaderProps<SortBy>) {
    const { active, direction, update } = useSortContext<SortBy>()
    const { sortBy, children, ...tableHeaderProps } = props

    const handleClick = () => {
        update(sortBy)
    }

    return (
        <StyledTableHeader {...tableHeaderProps} onClick={handleClick}>
            <HeaderInner>
                <SortArrow active={active === sortBy} direction={direction} />
                {children}
            </HeaderInner>
        </StyledTableHeader>
    )
}

export const StyledTableHeader = styled("th", {
    color: "$gray11",
    fontWeight: 500,
    backgroundColor: "$gray3",
    padding: "0.5rem 1rem",
    cursor: "default",
    whiteSpace: "nowrap",
    variants: {
        align: {
            left: {
                "> *": {
                    justifyContent: "flex-start",
                    textAlign: "left",
                },
            },
            center: {
                "> *": {
                    justifyContent: "center",
                    textAlign: "center",
                },
            },
            right: {
                "> *": {
                    justifyContent: "flex-end",
                    textAlign: "right",
                },
            },
        },
    },
    defaultVariants: {
        align: "center",
    },
})
const HeaderInner = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
})

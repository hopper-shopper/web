import { useSortContext } from "hooks/useSort"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import SortArrow from "../sort-arrow/SortArrow"

type SortableTableHeaderProps<SortBy> = {
    sortBy: SortBy
    children?: React.ReactNode
}

export default function SortableTableHeader<SortBy>(props: SortableTableHeaderProps<SortBy>) {
    const { active, direction, update } = useSortContext<SortBy>()
    const { sortBy, children } = props

    const handleClick = () => {
        update(sortBy)
    }

    return (
        <StyledTableHeader onClick={handleClick}>
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
    padding: "1rem 0",
    cursor: "default",
})
const HeaderInner = styled("span", {
    display: "inline-flex",
    alignItems: "center",
    columnGap: "0.5rem",
})

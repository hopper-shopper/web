import { ComponentProps, VariantProps } from "@stitches/react"
import SortArrow from "components/sorting/sort-arrow/SortArrow"
import { useSortContext } from "hooks/useSort"
import { styled } from "theme"

const StyledTable = styled("table", {
    width: "100%",
    borderSpacing: 0,
    color: "$gray12",
    tableLayout: "fixed",
    variants: {
        border: {
            true: {
                "& thead tr th:first-child": {
                    borderLeft: "1px solid $gray6",
                },
                "& thead tr th:last-child": {
                    borderRight: "1px solid $gray6",
                },
                "& thead tr th": {
                    borderTop: "1px solid $gray6",
                    borderBottom: "1px solid $gray6",
                },
                "& tbody tr td:first-child": {
                    borderLeft: "1px solid $gray6",
                },
                "& tbody tr td:last-child": {
                    borderRight: "1px solid $gray6",
                },
                "& tbody tr:last-child td": {
                    borderBottom: "1px solid $gray6",
                },
            },
        },
        rounded: {
            true: {
                "& thead tr th:first-child": {
                    borderTopLeftRadius: "$md",
                },
                "& thead tr th:last-child": {
                    borderTopRightRadius: "$md",
                },
                "& tbody tr:last-child td": {
                    "&:first-child": {
                        borderBottomLeftRadius: "$md",
                    },
                    "&:last-child": {
                        borderBottomRightRadius: "$md",
                    },
                },
            },
        },
    },
    defaultVariants: {
        border: true,
        rounded: true,
    },
})

const StyledTableHead = styled("thead", {
    variants: {
        sticky: {
            true: {
                position: "sticky",
                insetBlockStart: 0,
            },
        },
    },
})

const StyledTableFoot = styled("tfoot", {
    variants: {
        sticky: {
            true: {
                position: "sticky",
                insetBlockEnd: 0,
            },
        },
    },
})

const StyledTableRow = styled("tr", {
    variants: {
        striped: {
            true: {
                backgroundColor: "$gray2",
            },
            false: {
                backgroundColor: "$gray1",
            },
        },
    },
})

const StyledTableHeaderCell = styled("th", {
    color: "$gray11",
    fontWeight: 500,
    backgroundColor: "$gray3",
    cursor: "default",
    whiteSpace: "nowrap",
    padding: "0.25rem 0.5rem",
    "@md": {
        padding: "0.5rem 1rem",
    },
})

const StyledTableCell = styled("td", {
    color: "$gray12",
    whiteSpace: "nowrap",
    padding: "0.25rem 0.5rem",
    "@md": {
        padding: "0.5rem 1rem",
    },
})

const StyledSummaryCell = styled(StyledTableCell, {
    backgroundColor: "$gray3",
    fontWeight: 500,
    borderTop: "1px solid $gray6",
})

export const Root = StyledTable
export const Head = StyledTableHead
export const Foot = StyledTableFoot
export const Row = StyledTableRow
export const HeaderCell = StyledTableHeaderCell
export const Cell = StyledTableCell
export const SummaryCell = StyledSummaryCell

type SortableHeaderCellProps<SortBy> = ComponentProps<typeof HeaderCell> & {
    sortBy: SortBy
    children?: React.ReactNode
}

export function SortableHeaderCell<SortBy>(props: SortableHeaderCellProps<SortBy>) {
    const { active, direction, update } = useSortContext<SortBy>()
    const { sortBy, children, ...tableHeaderProps } = props

    const handleClick = () => {
        update(sortBy)
    }

    const align = ((): VariantProps<typeof HeaderInner>["align"] => {
        if (!tableHeaderProps.align) {
            return
        }

        if (["left", "center", "right"].includes(tableHeaderProps.align)) {
            return tableHeaderProps.align as VariantProps<typeof HeaderInner>["align"]
        }
    })()

    return (
        <HeaderCell {...tableHeaderProps} onClick={handleClick}>
            <HeaderInner align={align}>
                <SortArrow active={active === sortBy} direction={direction} />
                {children}
            </HeaderInner>
        </HeaderCell>
    )
}
const HeaderInner = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    variants: {
        align: {
            left: {
                justifyContent: "flex-start",
                textAlign: "left",
            },
            center: {
                justifyContent: "center",
                textAlign: "center",
            },
            right: {
                justifyContent: "flex-end",
                textAlign: "right",
            },
        },
    },
    defaultVariants: {
        align: "center",
    },
})

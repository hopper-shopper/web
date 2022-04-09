import { ComponentProps, VariantProps } from "@stitches/react"
import { useSortContext } from "hooks/useSort"
import { styled } from "theme"
import SortArrow from "../sort-arrow/SortArrow"
import { HeaderCell } from "components/table/Table"

type SortableTableHeaderProps<SortBy> = ComponentProps<typeof HeaderCell> & {
    sortBy: SortBy
    children?: React.ReactNode
}

export default function SortableTableHeader<SortBy>(props: SortableTableHeaderProps<SortBy>) {
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

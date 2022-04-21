import Screen from "components/layout/screen/Screen"
import { Hopper } from "models/Hopper"
import HoppersTableDesktop from "./hoppers-table-desktop/HoppersTableDesktop"
import { HoppersTableAnyFilter } from "./hoppers-table-filter/HoppersTableFilter"
import HoppersTableMobile from "./hoppers-table-mobile/HoppersTableMobile"

export type HoppersTableProps = {
    filter: HoppersTableAnyFilter
    hoppers: Hopper[]
}

export default function HoppersTable(props: HoppersTableProps) {
    return (
        <>
            <Screen bp="xl" constraint="max">
                <HoppersTableMobile {...props} />
            </Screen>

            <Screen bp="xl" constraint="min">
                <HoppersTableDesktop {...props} />
            </Screen>
        </>
    )
}

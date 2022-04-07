import { HoppersFilter, AdventureFilter, PermitFilter, MarketFilter } from "api/filters/hoopers"
import HoppersTable from "components/hoppers/hoppers-table/HoppersTable"
import { useState } from "react"

export default function StorePage() {
    const [hoppersFilter, setHoppersFilter] = useState<HoppersFilter>({
        adventure: AdventureFilter.ANY,
        permit: PermitFilter.ANY,
        market: MarketFilter.ON,
    })

    return <HoppersTable filter={hoppersFilter} />
}

import useUrlState from "@ahooksjs/use-url-state"
import { HoppersTableConfiguration } from "./ConfigureHoppersTable"

export default function useHoppersTableConfiguration(initial: HoppersTableConfiguration) {
    return useUrlState(initial, {
        navigateMode: "replace",
    })
}

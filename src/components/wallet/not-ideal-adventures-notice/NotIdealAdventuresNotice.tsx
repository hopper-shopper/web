import * as Notice from "components/notice/Notice"
import { getHoppersNotWithinIdealAdventure } from "filters/hoppers"
import { getSPFormatter } from "formatters/text"
import useFilter from "hooks/useFilter"
import { Hopper } from "models/Hopper"

type NotIdealAdventuresNoticeProps = {
    hoppers: Hopper[]
}

export default function NotIdealAdventuresNotice(props: NotIdealAdventuresNoticeProps) {
    const { hoppers } = props

    const hoppersNotWithinIdealAdventure = useFilter([getHoppersNotWithinIdealAdventure()], hoppers)
    const length = hoppersNotWithinIdealAdventure.length

    if (length === 0) {
        return null
    }

    const formatter = getSPFormatter(
        `${length} Hopper is not in it's ideal adventure`,
        `${length} Hoppers are not in their ideal adventure`,
    )

    return (
        <Notice.Root color="danger">
            <Notice.Text>{formatter(length)}</Notice.Text>
            <Notice.Dismiss />
        </Notice.Root>
    )
}

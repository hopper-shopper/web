import { LocaleFormatter } from "formatters/_common"
import { CSSProperties } from "react"
import { styled } from "theme"
import { fromDateLike } from "utils/date"
import { DateLike } from "utils/types"

type DateTooltipProps = {
    date: DateLike
    formatter?: LocaleFormatter<Date>

    style?: CSSProperties
}

export default function DateTooltip(props: DateTooltipProps) {
    const { date: dateLike, formatter = formatDateLong, style } = props

    const date = fromDateLike(dateLike)

    return (
        <Container style={style}>
            <DateText>{date === null ? "Unknown Date" : formatter(date)}</DateText>
        </Container>
    )
}

const Container = styled("div", {
    position: "relative",
    left: "50%",
})
const DateText = styled("span", {
    position: "absolute",
    whiteSpace: "nowrap",
    display: "inline-block",
    textAlign: "center",
    padding: "0.125rem 0.5rem",
    border: "1px solid $blue6",
    borderRadius: "$sm",
    backgroundColor: "$blue9",
    color: "#ffffff",
    fontSize: "0.875rem",
    transform: "translateX(-50%)",
})

function formatDateLong(dateLike: DateLike): string {
    const date = fromDateLike(dateLike)
    if (date === null) {
        return "Unknown Date"
    }

    const formatter = new Intl.DateTimeFormat([], {
        dateStyle: "long",
    })

    return formatter.format(date)
}

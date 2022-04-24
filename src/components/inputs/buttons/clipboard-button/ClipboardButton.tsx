import { ComponentProps } from "@stitches/react"
import { useEffect, useRef, useState } from "react"
import { useCopyToClipboard } from "react-use"
import Button from "../button/Button"

type ClipboardButtonProps = ComponentProps<typeof Button> & {
    content: string
    /**
     * @default "Copied"
     */
    text?: string
}

export default function ClipboardButton(props: ClipboardButtonProps) {
    const { content, text = "Copied", children, ...restButtonProps } = props

    const [, copy] = useCopyToClipboard()
    const [showCopied, setShowCopied] = useState(false)
    const copiedTimeout = useRef<number | null>(null)

    useEffect(() => {
        if (showCopied) {
            copiedTimeout.current = setTimeout(() => {
                setShowCopied(false)
            }, 3000) as unknown as number
        }

        return () => {
            if (typeof copiedTimeout === "number") {
                clearTimeout(copiedTimeout)
            }
        }
    }, [showCopied])

    const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
        copy(content)
        setShowCopied(true)
        restButtonProps.onClick?.(event)
    }

    return (
        <Button {...restButtonProps} onClick={copyToClipboard}>
            {showCopied && text}
            {!showCopied && children}
        </Button>
    )
}

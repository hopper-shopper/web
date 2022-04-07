import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type RedirectProps = {
    to: string
}

export default function Redirect(props: RedirectProps) {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(props.to)
    }, [])

    return null
}

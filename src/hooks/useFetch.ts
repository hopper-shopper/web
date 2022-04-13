import { useEffect, useState } from "react"
import { useLatest, usePromise } from "react-use"

type Fetcher<T> = () => Promise<T>

export type UseFetchReturn<T> = {
    data: T | null
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useFetch<T>(fetcher: Fetcher<T>, signature: string): UseFetchReturn<T> {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [dataSignature, setDataSignature] = useState<string | null>(null)
    const [data, setData] = useState<T | null>(null)

    const latestFetcher = useLatest(fetcher)
    const resolve = usePromise()

    useEffect(() => {
        ;(async () => {
            try {
                const data = await resolve(latestFetcher.current())
                setData(data)
                setDataSignature(signature)
            } catch (error) {
                console.error(error)
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        })()
    }, [signature])

    return {
        data,
        dataSignature,
        loading,
        error,
    }
}

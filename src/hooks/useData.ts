import { useEffect, useState } from 'react'
import useFetch from './useFetch'

interface IRequest {
    headers?: {}
    method: string
    endPoint: string
    requestBody?: object
}

const useData = (request: IRequest) => {
    const [data, setData] = useState<any>()

    const [response, isFetching, setRequest] = useFetch({} as any)
    const [isUpdate, setIsUpdate] = useState(true)

    useEffect(() => {
        if (isUpdate) {
            setRequest(request)
            setIsUpdate(false)
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data)
        }
    }, [response])

    const refetch = () => {
        setIsUpdate(true)
    }

    return [data, refetch];
}

export default useData

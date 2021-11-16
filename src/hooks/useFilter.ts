import { useEffect, useState } from 'react'
import RemoveAccents from '../utils/RemoveAccents'

const useFilter = (fullData: any[], key: string): [string, (e: any) => void, any[]] => {
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState(fullData)

    const onChangeSearch = (e: any) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        setFilterData(fullData.filter((data) => RemoveAccents(data[key]).toLowerCase().includes(RemoveAccents(search).toLowerCase())))
    }, [search, fullData, key])

    return [search, onChangeSearch, filterData]
}

export default useFilter

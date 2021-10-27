import { useState } from "react"

const useFilter = (dataSource: any, key: string) => {
  const [search, setSearch] = useState("");
  const updateDataSource = dataSource.filter((data: any) => data[key] === search)
  return [search, setSearch, updateDataSource]
}
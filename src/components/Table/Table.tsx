import { Table as AntdTable } from 'antd'
const Table = ({ columns, ...props }: any) => {
    const sortableColumns = columns.map((column: any) => {
        const { dataIndex, sorter, ...restColumnProps } = column
        if (sorter) {
            const { compare, ...restSorterProps } = sorter
            return {
                ...restColumnProps,
                dataIndex,
                sorter: {
                    compare: (rowA: any, rowB: any) => compare(rowA[dataIndex], rowB[dataIndex]),
                    ...restSorterProps,
                },
            }
        }
        return column
    })

    return <AntdTable columns={sortableColumns} {...props} />
}

export default Table

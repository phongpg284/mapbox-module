import { Sorter } from "../../../utils/sorter"

export const fixedData = {
    id: '',
    name: '',
    model: '',
    description: '',
}

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        render: (value: any, item: any, index: number) => index,
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Kiểu xe',
        dataIndex: 'model',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
        sorter: {
            compare: Sorter.DATE,
        },
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'update_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
        sorter: {
            compare: Sorter.DATE,
        },
    },
]

export default columns

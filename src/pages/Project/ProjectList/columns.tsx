import { Sorter } from "../../../utils/sorter"

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        width: 50,
        render: (value: any, item:any, index: number) => index,
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Mã dự án',
        dataIndex: 'code',
        key: 'code',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Mô tả tổng quan',
        dataIndex: 'description',
        key: 'description',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },

    {
        title: 'Thời gian bắt đầu',
        dataIndex: 'start_time',
        key: 'start_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
        sorter: {
            compare: Sorter.DATE,
        },
    },
    {
        title: 'Thời gian kết thúc',
        dataIndex: 'end_time',
        key: 'end_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
        sorter: {
            compare: Sorter.DATE,
        },
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        key: 'create_time',
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
        key: 'update_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
        sorter: {
            compare: Sorter.DATE,
        },
    },
]

export default columns

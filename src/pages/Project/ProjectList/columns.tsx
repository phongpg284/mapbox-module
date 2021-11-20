export const fixedData = {
    code: "",
    name: "",
    description: "",
}

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        render: (value: any, item:any, index: number) => index,
        // sorter: (a: any, b: any) => a.index - b.index,
    },
    {
        title: 'Mã dự án',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Mô tả tổng quan',
        dataIndex: 'description',
        key: 'description',
    },

    {
        title: 'Thời gian bắt đầu',
        dataIndex: 'start_time',
        key: 'start_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
    {
        title: 'Thời gian kết thúc',
        dataIndex: 'end_time',
        key: 'end_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'update_time',
        key: 'update_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
]

export default columns

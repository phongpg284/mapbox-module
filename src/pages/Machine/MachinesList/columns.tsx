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
        // sorter: (a: any, b: any) => a.index - b.index,
    },
    // {
    //     title: 'ID',
    //     dataIndex: 'id',
    // },
    {
        title: 'Kiểu xe',
        dataIndex: 'model',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'update_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
]

export default columns

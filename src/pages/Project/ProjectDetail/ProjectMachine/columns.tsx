const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
    },
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

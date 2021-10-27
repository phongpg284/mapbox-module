const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (text: any, record: any, index: number) => <div>{index}</div>,
    },
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'role',
        key: 'role',
    },
]

export default columns

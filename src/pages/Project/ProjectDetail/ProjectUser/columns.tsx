const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        render: (value: any, item:any, index: number) => index,
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },

    {
        title: 'Chức vụ',
        dataIndex: 'role',
        key: 'role',
    },

    {
        title: 'Đơn vị công tác',
        dataIndex: 'project',
        key: 'project',
    },
]

export default columns

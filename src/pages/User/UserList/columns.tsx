import { Sorter } from "../../../utils/sorter"

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        render: (value: any, item:any, index: number) => index,
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },

    {
        title: 'Chức vụ',
        dataIndex: 'role',
        key: 'role',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },

    {
        title: 'Đơn vị công tác',
        dataIndex: 'project',
        key: 'project',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
]

export default columns

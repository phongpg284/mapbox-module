const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Model',
        dataIndex: 'model',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    // {
    //     title: 'NTRIP Username',
    //     dataIndex: 'ntrip_username',
    // },
    // {
    //     title: 'NTRIP Passwword',
    //     dataIndex: 'ntrip_password',
    // },
    // {
    //     title: 'Mount Point',
    //     dataIndex: 'mount_point',
    // },
    {
        title: 'Create Time',
        dataIndex: 'create_time',
        render: (text: any, record: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
    {
        title: 'Update Time',
        dataIndex: 'update_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
]

export default columns

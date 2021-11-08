const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Sim Imei',
        dataIndex: 'sim_imei',
    },
    {
        title: 'Caster Ip',
        dataIndex: 'caster_ip',
    },
    {
        title: 'NTRIP Username',
        dataIndex: 'ntrip_username',
    },
    {
        title: 'NTRIP Passwword',
        dataIndex: 'ntrip_password',
    },
    {
        title: 'Mount Point',
        dataIndex: 'mount_point',
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'status',
        render: (text: any) => {
            return <div>{text ? 'Có' : 'Không'}</div>
        },
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        render: (text: any) => {
            if (text) return <div>{new Date(text).toLocaleString()}</div>
        },
    },
    // {
    //     title: 'Update Time',
    //     dataIndex: 'update_time',
    //     render: (text: any) => {
    //         return <div>{new Date(text).toLocaleString()}</div>
    //     },
    // },
]

export default columns

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Sim Imei',
        dataIndex: 'sim_imei',
        key: 'sim_imei',
    },
    {
        title: 'Caster Ip',
        dataIndex: 'caster_ip',
        key: 'caster_ip',
    },
    {
        title: 'NTRIP Username',
        dataIndex: 'ntrip_username',
        key: 'ntrip_username',
    },
    {
        title: 'NTRIP Passwword',
        dataIndex: 'ntrip_password',
        key: 'ntrip_password',
    },
    {
        title: 'Mount Point',
        dataIndex: 'mount_point',
        key: 'mount_point',
    },
    {
        title: 'Lái máy',
        dataIndex: 'driver',
        key: 'driver',
    },
    {
        title: 'Tình trạng sử dụng',
        dataIndex: 'status',
        key: 'status',
        render: (text: any, record: any) => (
          <div>{record.status ? "Có" : "Không"}</div>
        )
    },
]

export default columns

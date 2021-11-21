import dayjs from "dayjs";
import StatusTag from '../../../../components/StatusTag'


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
        render: (text: any, record: any) => <StatusTag status={text} />,
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        render: (text: any) => {
            if (text) return <div>{dayjs(text).format('DD/MM/YYYY HH:mm:ss')}</div>
        },
        sorter: (a: any, b: any) => dayjs(a.create_time).diff(dayjs(b.create_time)),
    },
]

export default columns

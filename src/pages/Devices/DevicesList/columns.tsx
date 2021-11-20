import StatusTag from '../../../components/StatusTag'
import dayjs from 'dayjs'

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        render: (value: any, item:any, index: number) => index,
        // sorter: (a: any, b: any) => a.index - b.index,
    },
    {
        title: 'Sim Imei',
        dataIndex: 'sim_imei',
        sorter: (a: any, b: any) => a.sim_imei - b.sim_imei,
    },
    {
        title: 'Caster Ip',
        dataIndex: 'caster_ip',
        sorter: (a: any, b: any) => a.caster_ip - b.caster_ip,
    },
    {
        title: 'NTRIP Username',
        dataIndex: 'ntrip_username',
        sorter: (a: any, b: any) => a.ntrip_username - b.ntrip_username,
    },
    {
        title: 'NTRIP Passwword',
        dataIndex: 'ntrip_password',
        sorter: (a: any, b: any) => a.ntrip_password - b.ntrip_password,
    },
    {
        title: 'Mount Point',
        dataIndex: 'mount_point',
        sorter: (a: any, b: any) => a.mount_point - b.mount_point,
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'status',
        render: (text: any) => {
            return <StatusTag status={text} />
        },
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        render: (text: any) => {
            if (text) return <div>{dayjs(text).format('DD/MM/YYYY HH:mm:ss')}</div>
        },
        sorter: (a: any, b: any) => dayjs(a.create_time).diff(dayjs(b.create_time)),
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

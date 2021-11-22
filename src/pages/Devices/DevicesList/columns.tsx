import StatusTag from '../../../components/StatusTag'
import dayjs from 'dayjs'
import { Sorter } from '../../../utils/sorter'

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        render: (value: any, item: any, index: number) => index,
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Sim Imei',
        dataIndex: 'sim_imei',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Caster Ip',
        dataIndex: 'caster_ip',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'NTRIP Username',
        dataIndex: 'ntrip_username',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'NTRIP Passwword',
        dataIndex: 'ntrip_password',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Mount Point',
        dataIndex: 'mount_point',
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'status',
        render: (text: any) => {
            return <StatusTag status={text} />
        },
        sorter: {
            compare: Sorter.DEFAULT,
        },
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'create_time',
        render: (text: any) => {
            if (text) return <div>{dayjs(text).format('DD/MM/YYYY HH:mm:ss')}</div>
        },
        sorter: {
            compare: Sorter.DATE,
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

import style from './index.module.scss'
import { Table } from 'antd'

const column = [
    {
        key: 'ckey',
        dataIndex: 'ckey',
        render: (text: string) => (
            <h6 style={{ fontWeight: 'bold' }}>{text}</h6>
        ),
    },
    {
        key: 'value',
        dataIndex: 'value',
    },
]

const dataSource = [
    {
        key: '1',
        ckey: 'Tên thiết bị',
        value: 'Máy xúc lật abc',
    },
    {
        key: '2',
        ckey: 'Loại thiết bị',
        value: 'MÁY XÚC ĐÀO, XÚC LẬT',
    },
    {
        key: '3',
        ckey: 'Lái máy chính',
        value: 'Nguyễn Văn A',
    },
    {
        key: '4',
        ckey: 'Lái máy phụ',
        value: 'Nguyễn Văn B',
    },
    {
        key: '5',
        ckey: 'Quản lí máy',
        value: 'Trần Văn A',
    },
]

const DeviceProjectModal = () => {
    return (
        <div className={style.project_summary_container}>
            <Table
                className={style.project_table_content}
                columns={column}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
            />
        </div>
    )
}

export default DeviceProjectModal

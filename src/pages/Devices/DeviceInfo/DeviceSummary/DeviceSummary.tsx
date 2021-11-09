import style from './index.module.scss'
import { Table } from 'antd'
import { useEffect, useState } from 'react'

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

const IKeyCode = {
    name: {
        brand: 'Tên thiết bị',
        type: 'string',
    },
    sim_imei: {
        brand: 'Sim Imei',
        type: 'string',
    },
    sim_model: {
        brand: 'Sim Model',
        type: 'string',
    },
    sim_manufacturer: {
        brand: 'Sim Manufacturer',
        type: 'string',
    },
    sim_signal_strength: {
        brand: 'Sim Signal Strength',
        type: 'string',
    },
    sim_status: {
        brand: 'Sim Status',
        type: 'string',
    },
    description: {
        brand: 'Mô tả',
        type: 'string',
    },
    caster_ip: {
        brand: 'Caster Ip',
        type: 'string',
    },
    caster_port: {
        brand: 'Caster Port',
        type: 'string',
    },
    ntrip_username: {
        brand: 'NTRIP Username',
        type: 'string',
    },
    ntrip_password: {
        brand: 'NTRIP Password',
        type: 'string',
    },
    mount_point: {
        brand: 'Mount Point',
        type: 'string',
    },
    create_time: {
        brand: 'Thời gian tạo',
        type: 'date',
    },
    update_time: {
        brand: 'Thời gian cập nhật',
        type: 'date',
    },
}

interface ISummaryDevice {
    data: any
}

const DeviceSummary: React.FC<ISummaryDevice> = ({ data }) => {
    const [dataSource, setDataSource] = useState<any>()

    useEffect(() => {
        const convertDataSource = []
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                if ((IKeyCode as any)[key]) {
                    const { brand, type } = (IKeyCode as any)[key]
                    const pushData = {
                        ckey: brand,
                        value: value,
                    }
                    if (type === 'date')
                        pushData.value = new Date(value as any).toLocaleString()
                    convertDataSource.push(pushData)
                }
            }
        }
        setDataSource(convertDataSource)
    }, [data])

    return (
        <div className={style.device_summary_container}>
            <div className={style.device_summary_content}>
                <Table
                    className={style.device_table_content}
                    columns={column}
                    dataSource={dataSource?.slice(0,7)}
                    showHeader={false}
                    pagination={false}
                />
                <Table
                    className={style.device_table_content}
                    columns={column}
                    dataSource={dataSource?.slice(7)}
                    showHeader={false}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default DeviceSummary

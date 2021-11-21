import style from './index.module.scss'
import { Badge, Descriptions, Table } from 'antd'
import { useEffect, useState } from 'react'

const column = [
    {
        key: 'ckey',
        dataIndex: 'ckey',
        render: (text: string) => <h6 style={{ fontWeight: 'bold' }}>{text}</h6>,
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
                    if (type === 'date') pushData.value = new Date(value as any).toLocaleString()
                    convertDataSource.push(pushData)
                }
            }
        }
        setDataSource(convertDataSource)
    }, [data])

    return (
        <div className={style.device_summary_container}>
            <div className={style.device_summary_content}>
                {/* <Table className={style.device_table_content} columns={column} dataSource={dataSource?.slice(0, 7)} showHeader={false} pagination={false} />
                <Table className={style.device_table_content} columns={column} dataSource={dataSource?.slice(7)} showHeader={false} pagination={false} /> */}

                <Descriptions>
                    <Descriptions.Item label="Tên thiết bị" labelStyle={{ fontWeight: 500 }}>
                        {data?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả" labelStyle={{ fontWeight: 500 }}>
                        {data?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sim IMEI" labelStyle={{ fontWeight: 500 }}>
                        {data?.sim_imei}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sim Manufacturer" labelStyle={{ fontWeight: 500 }}>
                        {data?.sim_manufacturer}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sim Model" labelStyle={{ fontWeight: 500 }}>
                        {data?.sim_model}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sim Status" labelStyle={{ fontWeight: 500 }}>
                        {data?.sim_status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sim Signal Strength" labelStyle={{ fontWeight: 500 }}>
                        {data?.sim_signal}
                    </Descriptions.Item>
                    <Descriptions.Item label="Caster IP" labelStyle={{ fontWeight: 500 }}>
                        {data?.caster_ip}
                    </Descriptions.Item>
                    <Descriptions.Item label="Caster Port" labelStyle={{ fontWeight: 500 }}>
                        {data?.caster_port}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mount Point" labelStyle={{ fontWeight: 500 }}>
                        {data?.mount_point}
                    </Descriptions.Item>
                    <Descriptions.Item label="NTRIP Username" labelStyle={{ fontWeight: 500 }}>
                        {data?.ntrip_username}
                    </Descriptions.Item>
                    <Descriptions.Item label="NTRIP Password" labelStyle={{ fontWeight: 500 }}>
                        {data?.ntrip_password}
                    </Descriptions.Item>
                    <Descriptions.Item label="Digital In 1" labelStyle={{ fontWeight: 500 }}>
                        {data?.digital_in_1}
                    </Descriptions.Item>
                    <Descriptions.Item label="Digital In 2" labelStyle={{ fontWeight: 500 }}>
                        {data?.digital_in_2}
                    </Descriptions.Item>
                    <Descriptions.Item label="Digital Out 1" labelStyle={{ fontWeight: 500 }}>
                        {data?.digital_out_1}
                    </Descriptions.Item>
                    <Descriptions.Item label="Digital Out 2" labelStyle={{ fontWeight: 500 }}>
                        {data?.digital_out_2}
                    </Descriptions.Item>
                    <Descriptions.Item label="GPS Signal" labelStyle={{ fontWeight: 500 }}>
                        {data?.gps_signal}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default DeviceSummary

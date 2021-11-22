import style from './index.module.scss'
import { Descriptions, Table } from 'antd'
import { useEffect, useState } from 'react'
import dayjs from "dayjs"

// const column = [
//     {
//         key: 'ckey',
//         dataIndex: 'ckey',
//         render: (text: string) => <h6 style={{ fontWeight: 'bold' }}>{text}</h6>,
//     },
//     {
//         key: 'value',
//         dataIndex: 'value',
//     },
// ]

const IKeyCode = {
    name: {
        brand: 'Tên máy',
        type: 'string',
    },
    model: {
        brand: 'Kiểu xe',
        type: 'string',
    },
    description: {
        brand: 'Mô tả',
        type: 'string',
    },
    project: {
        brand: 'Dự án',
        type: 'string',
    },
    driver: {
        brand: 'Lái máy',
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

interface ISummaryMachine {
    data: any
}

const MachineSummary: React.FC<ISummaryMachine> = ({ data }) => {
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
        <div className={style.machine_summary_container}>
            <div className={style.machine_summary_content}>
                {/* <Table
                    className={style.machine_table_content}
                    columns={column}
                    dataSource={dataSource}
                    showHeader={false}
                    pagination={false}
                /> */}
                <Descriptions>
                    <Descriptions.Item label="Tên máy" labelStyle={{ fontWeight: 500 }}>
                        {data?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Kiểu máy" labelStyle={{ fontWeight: 500 }}>
                        {data?.model}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả" labelStyle={{ fontWeight: 500 }}>
                        {data?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Lái máy" labelStyle={{ fontWeight: 500 }}>
                        {data?.driver}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thiết bị sử dụng" labelStyle={{ fontWeight: 500 }}>
                        {data?.device}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dự án" labelStyle={{ fontWeight: 500 }}>
                        {data?.project}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian khởi tạo" labelStyle={{ fontWeight: 500 }}>
                        {dayjs(data?.create_time)?.format('DD/MM/YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian cập nhật" labelStyle={{ fontWeight: 500 }}>
                        {dayjs(data?.update_time)?.format('DD/MM/YYYY HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default MachineSummary

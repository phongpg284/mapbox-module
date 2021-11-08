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
        brand: 'Tên dự án',
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
                    if (type === 'date')
                        pushData.value = new Date(value as any).toLocaleString()
                    convertDataSource.push(pushData)
                }
            }
        }
        setDataSource(convertDataSource)
    }, [data])

    return (
        <div className={style.machine_summary_container}>
            <div className={style.machine_summary_content}>
                <Table
                    className={style.machine_table_content}
                    columns={column}
                    dataSource={dataSource}
                    showHeader={false}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default MachineSummary

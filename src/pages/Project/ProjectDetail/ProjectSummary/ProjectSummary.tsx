import style from './index.module.scss'
import { useEffect, useState } from 'react'
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

const IKeyCode = {
    code: {
        brand: 'Mã dự án',
        type: 'string',
    },
    name: {
        brand: 'Tên dự án',
        type: 'string',
    },
    description: {
        brand: 'Mô tả tổng quan',
        type: 'string',
    },
    manager: {
        brand: 'Quản lí',
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
    start_time: {
        brand: 'Thời gian bắt đầu',
        type: 'date',
    },
    end_time: {
        brand: 'Thời gian kết thúc',
        type: 'date',
    },
}

interface IProjectResponse {
    id: number
    name: string
    longitude?: number
    latitude?: number
    description?: string
    start_time: string
    end_time: string
    create_time: string
    update_time: string
    is_deleted: boolean
}

interface ISummaryProject {
    data: IProjectResponse
}

const ProjectSummary: React.FC<ISummaryProject> = ({ data }) => {
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
        <div className={style.project_summary_container}>
            <div className={style.project_summary_content}>
                <Table
                    className={style.project_table_content}
                    columns={column}
                    dataSource={dataSource}
                    showHeader={false}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default ProjectSummary

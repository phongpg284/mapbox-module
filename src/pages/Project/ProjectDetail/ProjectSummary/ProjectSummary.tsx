import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Descriptions } from 'antd'
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
    code: string
    description?: string
    longitude?: number
    latitude?: number
    start_time: string
    end_time: string
    create_time: string
    update_time: string
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
                    if (type === 'date') pushData.value = new Date(value as any).toLocaleString()
                    convertDataSource.push(pushData)
                }
            }
        }
        setDataSource(convertDataSource)
    }, [data])

    return (
        <div className={style.project_summary_container}>
            <div className={style.project_summary_content}>
                {/* <Table
                    className={style.project_table_content}
                    columns={column}
                    dataSource={dataSource}
                    showHeader={false}
                    pagination={false}
                /> */}
                <Descriptions>
                    <Descriptions.Item label="Mã dự án" labelStyle={{ fontWeight: 500 }}>
                        {data?.code}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên dự án" labelStyle={{ fontWeight: 500 }}>
                        {data?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả" labelStyle={{ fontWeight: 500 }}>
                        {data?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian bắt đầu" labelStyle={{ fontWeight: 500 }}>
                        {data?.start_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian kết thúc" labelStyle={{ fontWeight: 500 }}>
                        {data?.end_time}
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

export default ProjectSummary

import style from './index.module.scss'
import { Descriptions } from 'antd'
import dayjs from 'dayjs'

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
    return (
        <div className={style.project_summary_container}>
            <div className={style.project_summary_content}>
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

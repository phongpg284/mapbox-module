import style from './index.module.scss'
import { Descriptions } from 'antd'
import dayjs from 'dayjs'

interface ISummaryMachine {
    data: any
}

const MachineSummary: React.FC<ISummaryMachine> = ({ data }) => {
    return (
        <div className={style.machine_summary_container}>
            <div className={style.machine_summary_content}>
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

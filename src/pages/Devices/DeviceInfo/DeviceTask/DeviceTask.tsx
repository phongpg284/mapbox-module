import './index.scss'
import dayjs from 'dayjs'

import { Descriptions, Spin } from 'antd'
import { useHistory } from 'react-router'

import { LoadingOutlined } from '@ant-design/icons'

import SecondFormat from '../../../../utils/SecondFormat'

const DeviceTask = ({ data, isFetching }: any) => {
    const history = useHistory()
    const handleClickTaskItem = (id: number) => {
        history.push(`/tasks/${id}`)
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

    return (
        <div className="device-task">
            <div>
                {isFetching && <Spin indicator={antIcon} />}
                {data &&
                    data.map((task: any) => (
                        <div className="device-task-item" key={task.id} onClick={() => handleClickTaskItem(task?.id)}>
                            <Descriptions title={`Lộ trình hoạt động #${task?.id}`}>
                                <Descriptions.Item label="Quãng đường">{`${task?.distance?.toFixed(2) ?? ''} km`}</Descriptions.Item>
                                <Descriptions.Item label="Độ chính xác">{`${task?.accuracy?.toFixed(2) ?? ''} cm`}</Descriptions.Item>
                                <Descriptions.Item label="Tốc độ">{`${task?.speed?.toFixed(2) ?? ''} km/h`}</Descriptions.Item>
                                <Descriptions.Item label="Tổng thời gian">{`${SecondFormat(task?.time)}`}</Descriptions.Item>
                                <Descriptions.Item label="Thời gian bắt đầu">{dayjs(task?.create_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                                <Descriptions.Item label="Thời gian kết thúc">{dayjs(task?.update_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default DeviceTask

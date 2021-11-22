import './index.scss'

import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import { Descriptions, Empty } from 'antd'

import useData from '../../../hooks/useData'
import { ENDPOINT_URL } from '../../../app/config'

const ActiveDeviceList = () => {
    const [tasks, refetchTasks] = useData({
        endPoint: ENDPOINT_URL + '/task-online/',
        method: 'GET',
    })
    const history = useHistory()

    const handleClickTaskItem = (deviceId: number, taskId: number) => {
        history.push(`/active-tasks/${deviceId}/${taskId}`)
    }

    return (
        <div className="active-device-list-container">
            <div className="active-device-list-title">Danh sách thiết bị đang hoạt động</div>
            <div className="active-device-list-content">
                {tasks &&
                    tasks.map((task: any) => (
                        <div className="active-device-task-item" key={task.device_id} onClick={() => handleClickTaskItem(task?.device_id, task?.task_id)}>
                            <Descriptions title={`Thiết bị ${task?.device_name}`}>
                                <Descriptions.Item label={`Lộ trình hoạt động`}>{task?.task_id}</Descriptions.Item>
                                <Descriptions.Item label="Thời gian bắt đầu">{dayjs(task?.task_create_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                                <Descriptions.Item label="Quãng đường">{`${task?.distance?.toFixed(2) ?? '0'} km`}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    ))}
                {(!tasks || tasks?.length === 0) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có thiết bị đang hoạt động" />}
            </div>
        </div>
    )
}

export default ActiveDeviceList

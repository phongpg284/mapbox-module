import './index.scss'
import useData from '../../../hooks/useData'
import { Link, useHistory } from 'react-router-dom'
import { ENDPOINT_URL } from '../../../app/config'
import { Descriptions, Empty } from 'antd'

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
                            {/* <Link to={`/tasks/${task?.id}`} className="device-task-item-info">Xem lộ trình</Link> */}
                            <Descriptions title={`Lộ trình hoạt động #${task?.task_id}`}></Descriptions>
                            <Descriptions title={`Thiết bị #${task?.device_id}`}>
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

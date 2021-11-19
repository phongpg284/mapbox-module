import './index.scss'
import useData from '../../../hooks/useData'
import { Link, useHistory } from 'react-router-dom'
import { ENDPOINT_URL } from '../../../app/config'
import { Descriptions } from 'antd'

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
                                {/* <Descriptions.Item label="Độ chính xác">{`${task?.accuracy?.toFixed(2) ?? ''} cm`}</Descriptions.Item>
                            <Descriptions.Item label="Tốc độ">{`${task?.speed?.toFixed(2) ?? ''} km/h`}</Descriptions.Item>
                            <Descriptions.Item label="Tổng thời gian">{`${SecondFormat(task?.time)}`}</Descriptions.Item>
                            <Descriptions.Item label="Thời gian bắt đầu">{dayjs(task?.create_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item> */}
                                {/* <Descriptions.Item label="Thời gian kết thúc">{dayjs(task?.update_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item> */}
                            </Descriptions>
                        </div>
                    ))}
            </div>

            {/* {devices &&
                devices.map((device: any) => (
                    <div className="active-device-item" key={device.device_id}>
                        <div>
                            <div className="active-device-info">Thiết bị ID: {device.device_id}</div>
                            <div className="active-device-info">Task ID: {device.task_id}</div>
                        </div>
                        <div className="active-device-detail-link">
                            <Link to={`/active-tasks/${device.device_id}/${device.task_id}`}>Chi tiết</Link>
                        </div>
                    </div>
                ))} */}
        </div>
    )
}

export default ActiveDeviceList

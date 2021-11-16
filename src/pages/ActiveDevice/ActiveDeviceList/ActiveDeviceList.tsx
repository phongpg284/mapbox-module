import './index.scss'
import useData from '../../../hooks/useData'
import { Link } from 'react-router-dom'
import { ENDPOINT_URL } from '../../../app/config'

const ActiveDeviceList = () => {
    const [devices, refetchDevices] = useData({
        endPoint: ENDPOINT_URL + '/task-online/',
        method: 'GET',
    })

    return (
        <div className="active-device-list-conntainer">
            <div className="active-device-list-title">Danh sách thiết bị đang hoạt động</div>
            {devices &&
                devices.map((device: any) => (
                    <div className="active-device-item" key={device.device_id}>
                        <div>
                            <div className="active-device-info">
                                Thiết bị ID: {device.device_id}
                            </div>
                            <div className="active-device-info">
                                Task ID: {device.task_id}
                            </div>
                        </div>
                        <div className="active-device-detail-link">
                            <Link to={`/active-tasks/${device.device_id}/${device.task_id}`}>Chi tiết</Link>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ActiveDeviceList

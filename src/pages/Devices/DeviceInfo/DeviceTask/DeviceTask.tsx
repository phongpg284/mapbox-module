import { Descriptions } from 'antd'
import { useHistory } from 'react-router'
import TaskMap from '../../../../components/Map/TaskMap'
import SecondFormat from '../../../../utils/SecondFormat'
import dayjs from 'dayjs'
import './index.scss'
import { Link } from 'react-router-dom'
const DeviceTask = ({ id, data }: any) => {
    const history = useHistory()
    const handleClickTaskItem = (id: number) => {
        history.push(`/tasks/${id}`)
    }
    return (
        <div className="device-task">
            <div>
                {data &&
                    data.map((task: any) => (
                        <div className="device-task-item" key={task.id} onClick={() => handleClickTaskItem(task?.id)}>
                            {/* <Link to={`/tasks/${task?.id}`} className="device-task-item-info">Xem lộ trình</Link> */}
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
            {/* <TaskMap id={id} /> */}
        </div>
    )
}

export default DeviceTask

import './index.scss'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import useData from '../../../hooks/useData'
import { ENDPOINT_URL } from '../../../app/config'

import DeviceDetail from './DeviceDetail'
import DeviceSummary from './DeviceSummary'
import DeviceTask from './DeviceTask'

import { AiFillCalendar } from 'react-icons/ai'

const DeviceInfo = ({ match }: any) => {
    const id = match.params.id
    const [currentTab, setCurrentTab] = useState('summary')

    const handleSelectTab = (key: string) => {
        setCurrentTab(key)
    }
    const [isDeviceActive, setIsDeviceActive] = useState(false)

    const [data, refetch, isFetching] = useData({
        endPoint: ENDPOINT_URL + '/device/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            pk: id,
        },
    })

    const [deviceDetailData, refetchDeviceDetail, isFetchingDeviceDetail] = useData({
        endPoint: ENDPOINT_URL + '/task-info/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            device_id: id,
        },
    })

    const [tasks, refetchTasks, isFetchingTasks] = useData({
        endPoint: ENDPOINT_URL + '/task/',
        method: 'GET',
    })

    useEffect(() => {
        if (data && data.update_time) {
            setIsDeviceActive(Math.abs(new Date(data.update_time).getTime() - Date.now()) < 120000)
        }
    }, [data])

    return (
        <div className="device-detail-container">
            <div className="device-detail-title">
                Thiết bị {data?.name ?? ''}
                {isDeviceActive && <span className="device-tag-active">Đang hoạt động</span>}
                {!isDeviceActive && <span className="device-tag-no-active">Không hoạt động</span>}
            </div>
            <div className="device-detail-date">
                <div className="device-detail-date-icon">
                    <AiFillCalendar />
                </div>
                {`Ngày khởi tạo:  
                ${dayjs(data?.create_time).format('DD/MM/YYYY HH:mm:ss') ?? ''}`}
            </div>
            <div className="device-detail-wrapper">
                <div className="device-detail-navigate">
                    <div className={currentTab === 'summary' ? 'device-detail-navigate-select' : ''} onClick={() => handleSelectTab('summary')}>
                        Thông tin chi tiết
                    </div>
                    <div className={currentTab === 'tasks' ? 'device-detail-navigate-select' : ''} onClick={() => handleSelectTab('tasks')}>
                        Lịch trình hoạt động theo ngày
                    </div>
                    <div className={currentTab === 'all-tasks' ? 'device-detail-navigate-select' : ''} onClick={() => handleSelectTab('all-tasks')}>
                        Lịch sử hoạt động
                    </div>
                </div>

                <div className="device-detail-content">
                    {currentTab === 'summary' && <DeviceSummary data={data} isFetching={isFetching}/>}
                    {currentTab === 'tasks' && <DeviceDetail id={id} currentDateData={deviceDetailData} isFetching={isFetchingDeviceDetail}/>}
                    {currentTab === 'all-tasks' && <DeviceTask id={id} data={tasks} isFetching={isFetchingTasks}/>}
                </div>
            </div>
        </div>
    )
}
export default DeviceInfo

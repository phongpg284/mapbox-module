import './index.scss'

import dayjs from 'dayjs'
import { useState } from 'react'

import MachineDevice from '../MachineDetail/MachineDevice'
import MachineUser from '../MachineDetail/MachineUser'
import MachineSummary from '../MachineDetail/MachineSummary'

import { ENDPOINT_URL } from '../../../app/config'
import useData from '../../../hooks/useData'
import { AiFillCalendar } from 'react-icons/ai'
import BackButton from '../../../components/BackButton'

const MachineDetail = ({ match }: any) => {
    const id = match?.params?.id
    const [currentTab, setCurrentTab] = useState('summary')

    const handleSelectTab = (key: string) => {
        setCurrentTab(key)
    }

    const [data] = useData({
        endPoint: ENDPOINT_URL + '/machine/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            pk: id,
        },
    })

    const [machineUserData, refetchMachineUser, isFetchingMachineUser] = useData({
        endPoint: ENDPOINT_URL + '/machine-user/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            machine_id: id,
        },
    })

    const [machineDeviceData, refetchMachineDevice, isFetchingMachineDevice] = useData({
        endPoint: ENDPOINT_URL + '/machine-device/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            machine_id: id,
        },
    })

    return (
        <div className="machine-detail-container">
            <div className="device-detail-header">
                <div className="machine-detail-title">
                    Máy {data?.name ?? ''}
                    {/* {isDeviceActive && <span className="device-tag-active">Đang hoạt động</span>}
                {!isDeviceActive && <span className="device-tag-no-active">Không hoạt động</span>} */}
                </div>
                <div className="device-detail-back-button">
                    <BackButton route="list" />
                </div>
            </div>
            <div className="machine-detail-date">
                <div className="machine-detail-date-icon">
                    <AiFillCalendar />
                </div>
                {`Ngày khởi tạo:  
                ${dayjs(data?.create_time).format('DD/MM/YYYY HH:mm:ss') ?? ''}`}
            </div>
            <div className="machine-detail-wrapper">
                <div className="machine-detail-navigate">
                    <div className={currentTab === 'summary' ? 'machine-detail-navigate-select' : ''} onClick={() => handleSelectTab('summary')}>
                        Thông tin chi tiết
                    </div>
                    <div className={currentTab === 'device' ? 'machine-detail-navigate-select' : ''} onClick={() => handleSelectTab('device')}>
                        Danh mục thiết bị
                    </div>
                    <div className={currentTab === 'user' ? 'machine-detail-navigate-select' : ''} onClick={() => handleSelectTab('user')}>
                        Danh mục người dùng
                    </div>
                </div>

                <div className="machine-detail-content">
                    {currentTab === 'summary' && <MachineSummary data={data} />}
                    {currentTab === 'user' && <MachineUser id={id} data={machineUserData} refetch={refetchMachineUser} isFetching={isFetchingMachineUser} />}
                    {currentTab === 'device' && <MachineDevice id={id} data={machineDeviceData} refetch={refetchMachineDevice} isFetching={isFetchingMachineDevice} />}
                    {/* {currentTab === 'moderator' && <MachineModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default MachineDetail

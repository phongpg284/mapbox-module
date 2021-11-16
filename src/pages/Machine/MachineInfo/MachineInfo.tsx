import './index.scss'
import { Menu } from 'antd'
import { useState } from 'react'
import MachineDevice from '../MachineDetail/MachineDevice'
import MachineUser from '../MachineDetail/MachineUser'
import MachineSummary from '../MachineDetail/MachineSummary'
import useData from '../../../hooks/useData'
import { ENDPOINT_URL } from '../../../app/config'

const MachineDetail = ({match}: any) => {
    const id = match?.params?.id;
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
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

    const [machineUserData, refetchMachineUser] = useData({
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

    const [machineDeviceData, refetchMachineDevice] = useData({
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

    const centerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }
    return (
        <div className="machine-detail-container">
            <div className="machine-detail-wrapper">
                <Menu
                    style={centerStyle}
                    onClick={handleClick}
                    selectedKeys={[currentTab]}
                    mode="inline"
                >
                    <Menu.Item key="summary" style={{ fontWeight: 'bold' }}>
                        Thông tin chung
                    </Menu.Item>
                    <Menu.Item key="user" style={{ fontWeight: 'bold' }}>
                        Danh sách lái máy
                    </Menu.Item>
                    <Menu.Item key="device" style={{ fontWeight: 'bold' }}>
                        Danh sách thiết bị
                    </Menu.Item>
                    <Menu.Item key="category" style={{ fontWeight: 'bold' }}>
                        Danh sách hạng mục
                    </Menu.Item>
                    <Menu.Item key="fuel" style={{ fontWeight: 'bold' }}>
                        Nhiên liệu
                    </Menu.Item>
                </Menu>

                <div className="machine-detail-content">
                    {currentTab === 'summary' && <MachineSummary data={data} />}
                    {currentTab === 'user' && (
                        <MachineUser
                            id={id}
                            data={machineUserData}
                            refetch={refetchMachineUser}
                        />
                    )}
                    {currentTab === 'device' && (
                        <MachineDevice
                            id={id}
                            data={machineDeviceData}
                            refetch={refetchMachineDevice}
                        />
                    )}
                    {/* {currentTab === 'moderator' && <MachineModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default MachineDetail

import './index.css'
import { Menu } from 'antd'
import { useState } from 'react'
import useData from '../../../hooks/useData'
import DeviceDetail from './DeviceDetail'
import DeviceSummary from './DeviceSummary'
import DeviceTask from './DeviceTask'

const DeviceInfo = ({ id }: any) => {
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
    }

    const [data] = useData({
        endPoint: 'https://dinhvichinhxac.online/api/device/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            pk: id,
        },
    })

    const centerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    return (
        <div className="device-detail-container">
            <div className="device-detail-wrapper">
                <Menu
                    style={centerStyle}
                    onClick={handleClick}
                    selectedKeys={[currentTab]}
                    mode="inline"
                >
                    <Menu.Item key="summary" style={{ fontWeight: 'bold' }}>
                        Thông tin chung
                    </Menu.Item>
                    <Menu.Item key="tasks" style={{ fontWeight: 'bold' }}>
                        Lịch trình hoạt động
                    </Menu.Item>
                    <Menu.Item key="all-tasks" style={{ fontWeight: 'bold' }}>
                        Lịch sử hành trình
                    </Menu.Item>
                </Menu>

                <div className="device-detail-content">
                    {currentTab === 'summary' && <DeviceSummary data={data} />}
                    {currentTab === 'tasks' && <DeviceDetail id={id} />}
                    {currentTab === 'all-tasks' && <DeviceTask id={id} />}
                </div>
            </div>
        </div>
    )
}
export default DeviceInfo

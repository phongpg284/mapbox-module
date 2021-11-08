import './index.scss'
import { Menu } from 'antd'
import { useState } from 'react'
import MachineDevice from '../MachineDetail/MachineDevice'
import MachineUser from '../MachineDetail/MachineUser'

const MachineDetail = ({ id }: any) => {
    console.log(typeof(id))
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
    }

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
                    mode="horizontal"
                >
                    <Menu.Item key="summary">Thông tin chung</Menu.Item>
                    <Menu.Item key="user">Danh sách người dùng</Menu.Item>
                    <Menu.Item key="device">Danh sách thiết bị</Menu.Item>
                    <Menu.Item key="category">Danh sách hạng mục</Menu.Item>
                    <Menu.Item key="fuel">Nhiên liệu</Menu.Item>
                </Menu>

                <div className="machine-detail-content">
                    {/* {currentTab === 'summary' && <MachineSummary id={id}/>} */}
                    {currentTab === 'user' && <MachineUser id={id} />}
                    {currentTab === 'device' && <MachineDevice id={id} />}
                    {/* {currentTab === 'moderator' && <MachineModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default MachineDetail

import './index.css'
import { Menu } from 'antd'
import { useState } from 'react'
import ProjectSummary from '../ProjectSummary'
import ProjectUser from './ProjectUser'
import ProjectDevice from './ProjectDevice'
import ProjectModerator from './ProjectModerator'

const ProjectDetail = () => {
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
    }

    const centerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }
    return (
        <div className="project-detail-container">
            <div className="project-detail-wrapper">
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
                    <Menu.Item key="moderator">
                        Danh sách quản trị viên
                    </Menu.Item>
                </Menu>

                <div className="project-detail-content">
                    {currentTab === 'summary' && <ProjectSummary />}
                    {currentTab === 'user' && <ProjectUser />}
                    {currentTab === 'device' && <ProjectDevice />}
                    {currentTab === 'moderator' && <ProjectModerator />}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail

import './index.css'
import { Menu } from 'antd'
import { useState } from 'react'
import ProjectSummary from '../ProjectSummary'
import ProjectUser from './ProjectUser'

const ProjectDetail = () => {
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
    }
    return (
        <div className="project-detail-container">
            <div className="project-detail-wrapper">
                <Menu
                    onClick={handleClick}
                    selectedKeys={[currentTab]}
                    mode="horizontal"
                >
                    <Menu.Item key="summary">Thông tin chung</Menu.Item>
                    <Menu.Item key="user">Danh sách người dùng</Menu.Item>
                    <Menu.Item key="device">Danh sách thiết bị</Menu.Item>
                    <Menu.Item key="category">Danh sách hạng mục</Menu.Item>
                    <Menu.Item key="fuel">Nhiên liệu</Menu.Item>
                    <Menu.Item key="moderator">Danh sách quản trị viên</Menu.Item>
                </Menu>

                <div className="project-detail-content">
                    {currentTab === "summary" && (
                        <ProjectSummary />
                    )}
                    {currentTab === "user" && (
                        <ProjectUser />
                    )}

                </div>
            </div>
        </div>
    )
}

export default ProjectDetail

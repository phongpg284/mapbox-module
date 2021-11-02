import './index.css'
import { Menu } from 'antd'
import { useState } from 'react'
import ProjectUser from './ProjectUser'
import ProjectDevice from './ProjectDevice'
import ProjectModerator from './ProjectModerator'
import ProjectSummaryModal from '../ProjectSummaryModal'

const ProjectDetail = ({ id }: any) => {
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
                    {/* {currentTab === 'summary' && <ProjectSummaryModal />} */}
                    {currentTab === 'user' && <ProjectUser id={id} />}
                    {currentTab === 'device' && <ProjectDevice id={id} />}
                    {/* {currentTab === 'moderator' && <ProjectModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail

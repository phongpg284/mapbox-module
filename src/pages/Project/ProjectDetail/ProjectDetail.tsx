import './index.css'
import { useState } from 'react'
import { Menu } from 'antd'

import ProjectUser from './ProjectUser'
import ProjectDevice from './ProjectDevice'
import ProjectSummary from './ProjectSummary'

import useData from '../../../hooks/useData'

const ProjectDetail = ({ id }: any) => {
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
    }

    const [data] = useData({
        endPoint: 'https://dinhvichinhxac.online/api/project/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            pk: id,
        },
    })

    const [projectUserData, refetchProjectUser] = useData({
        endPoint: 'https://dinhvichinhxac.online/api/project-user/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            project_id: id,
        },
    })

    const [projectDeviceData, refetchProjectDevice] = useData({
        endPoint: 'https://dinhvichinhxac.online/api/project-machine/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            project_id: id,
        },
    })

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
                    mode="inline"
                >
                    <Menu.Item key="summary" style={{ fontWeight: 'bold' }}>
                        Thông tin chung
                    </Menu.Item>
                    <Menu.Item key="user" style={{ fontWeight: 'bold' }}>
                        Danh sách người dùng
                    </Menu.Item>
                    <Menu.Item key="device" style={{ fontWeight: 'bold' }}>
                        Danh sách máy móc
                    </Menu.Item>
                    <Menu.Item key="category" style={{ fontWeight: 'bold' }}>
                        Danh sách hạng mục
                    </Menu.Item>
                    <Menu.Item key="fuel" style={{ fontWeight: 'bold' }}>
                        Nhiên liệu
                    </Menu.Item>
                    {/* <Menu.Item key="moderator" style={{ fontWeight: 'bold' }}>
                        Danh sách quản trị viên
                    </Menu.Item> */}
                </Menu>

                <div className="project-detail-content">
                    {currentTab === 'summary' && <ProjectSummary data={data} />}
                    {currentTab === 'user' && (
                        <ProjectUser
                            id={id}
                            data={projectUserData}
                            refetch={refetchProjectUser}
                        />
                    )}
                    {currentTab === 'device' && (
                        <ProjectDevice
                            id={id}
                            data={projectDeviceData}
                            refetch={refetchProjectDevice}
                        />
                    )}
                    {/* {currentTab === 'moderator' && <ProjectModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail

import './index.css'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import ProjectUser from './ProjectUser'
import ProjectDevice from './ProjectDevice'
import ProjectModerator from './ProjectModerator'
import ProjectSummaryModal from '../ProjectSummaryModal'
import ProjectSummary from './ProjectSummary'
import useFetch from '../../../hooks/useFetch'

const ProjectDetail = ({ id }: any) => {
    const [currentTab, setCurrentTab] = useState('summary')
    const handleClick = (e: any) => {
        setCurrentTab(e.key)
    }

    const [data, setData] = useState<any>()
    const [projectUserData, setProjectUserData] = useState<any>()
    const [projectDeviceData, setProjectDeviceData] = useState<any>()

    const [response, isFetching, setRequest] = useFetch({} as any)
    const [responseProjectUser, isFetchingProjectUser, setRequestProjectUser] = useFetch({} as any)
    const [isUpdateProjectUser, setIsUpdateProjectUser] = useState(true)
    const [responseProjectDevice,isFetchingProjectDevice,setRequestProjectDevice] = useFetch({} as any)
    const [isUpdateProjectDevice, setIsUpdateProjectDevice] = useState(true)

    useEffect(() => {
        setRequest({
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
    }, [])

    useEffect(() => {
        if (isUpdateProjectUser) {
            setRequestProjectUser({
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
            setIsUpdateProjectUser(false)
        }
    }, [isUpdateProjectUser])

    useEffect(() => {
        if (isUpdateProjectDevice) {
            setRequestProjectDevice({
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
            setIsUpdateProjectDevice(false)
        }
    }, [isUpdateProjectDevice])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data)
        }
    }, [response])

    useEffect(() => {
        if (
            !isFetchingProjectUser &&
            responseProjectUser &&
            responseProjectUser.data &&
            !responseProjectUser.hasError
        ) {
            console.log(responseProjectUser.data)

            setProjectUserData(responseProjectUser.data)
        }
    }, [responseProjectUser])

    useEffect(() => {
        if (
            !isFetchingProjectDevice &&
            responseProjectDevice &&
            responseProjectDevice.data &&
            !responseProjectDevice.hasError
        ) {
            console.log(responseProjectDevice.data);
            
            setProjectDeviceData(responseProjectDevice.data)
        }
    }, [responseProjectDevice])

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
                    {currentTab === 'summary' && (
                        <ProjectSummary data={data} />
                    )}
                    {currentTab === 'user' && (
                        <ProjectUser
                            id={id}
                            data={projectUserData}
                            refetch={setIsUpdateProjectUser}
                        />
                    )}
                    {currentTab === 'device' && (
                        <ProjectDevice
                            id={id}
                            data={projectDeviceData}
                            refetch={setIsUpdateProjectDevice}
                        />
                    )}
                    {/* {currentTab === 'moderator' && <ProjectModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail

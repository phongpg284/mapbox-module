import './index.scss'
import dayjs from 'dayjs'

import { useState } from 'react'

import ProjectUser from './ProjectUser'
import ProjectMachine from './ProjectMachine'
import ProjectSummary from './ProjectSummary'

import useData from '../../../hooks/useData'
import { ENDPOINT_URL } from '../../../app/config'

import { AiFillCalendar } from 'react-icons/ai'

const ProjectDetail = ({ match }: any) => {
    const id = match?.params?.id
    const [currentTab, setCurrentTab] = useState('summary')

    const handleSelectTab = (key: string) => {
        setCurrentTab(key)
    }

    const [data] = useData({
        endPoint: ENDPOINT_URL + '/project/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            pk: id,
        },
    })

    const [projectUserData, refetchProjectUser, isFetchingProjectUser] = useData({
        endPoint: ENDPOINT_URL + '/project-user/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            project_id: id,
        },
    })

    const [projectMachineData, refetchProjectMachine, isFetchingProjectMachine] = useData({
        endPoint: ENDPOINT_URL + '/project-machine/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            project_id: id,
        },
    })

    return (
        <div className="project-detail-container">
            <div className="project-detail-title">Dự án {data?.name ?? ''}</div>
            <div className="project-detail-date">
                <div className="project-detail-date-icon">
                    <AiFillCalendar />
                </div>
                {`Ngày khởi tạo:  
                ${dayjs(data?.create_time).format('DD/MM/YYYY HH:mm:ss') ?? ''}`}
            </div>
            <div className="project-detail-wrapper">
                <div className="project-detail-navigate">
                    <div className={currentTab === 'summary' ? 'project-detail-navigate-select' : ''} onClick={() => handleSelectTab('summary')}>
                        Thông tin chi tiết
                    </div>
                    <div className={currentTab === 'user' ? 'project-detail-navigate-select' : ''} onClick={() => handleSelectTab('user')}>
                        Danh sách người dùng
                    </div>
                    <div className={currentTab === 'device' ? 'project-detail-navigate-select' : ''} onClick={() => handleSelectTab('device')}>
                        Danh sách máy móc
                    </div>
                </div>

                <div className="project-detail-content">
                    {currentTab === 'summary' && <ProjectSummary data={data} />}
                    {currentTab === 'user' && <ProjectUser id={id} data={projectUserData} refetch={refetchProjectUser} isFetching={isFetchingProjectUser} />}
                    {currentTab === 'device' && <ProjectMachine id={id} data={projectMachineData} refetch={refetchProjectMachine} isFetching={isFetchingProjectMachine} />}
                    {/* {currentTab === 'moderator' && <ProjectModerator id={id} />} */}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail

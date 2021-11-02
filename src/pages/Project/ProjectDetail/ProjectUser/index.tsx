import './style.css'
import columns from './columns'
import { Button, Space, Table } from 'antd'
import faker from 'faker'
import { Link } from 'react-router-dom'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import ProjectUserAddModal from './ProjectUserAddModal'
const ProjectUser = ({ id }: any) => {
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/users/${record.key}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button>SMS</button>
                    <button>Thoát dự án</button>
                </Space>
            ),
        },
    ]

    const [response, isFetching, setRequest] = useFetch({
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

    const [userList, setUserList] = useState<any>([])
    useEffect(() => {
        if (!isFetching && response?.data && !response?.hasError) {
            const convertUserList = []
            for (const { user } of response.data) {
                const newUser = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    phone: user.phone,
                    role: user.role,
                }
                convertUserList.push(newUser)
            }
            console.log(convertUserList)

            setUserList(convertUserList)
        }
    }, [response])

    const [isShowProjectUserAddModal, setIsShowProjectUserAddModal] =
        useState(false)

    const handleShowProjectUserAddModal = () => {
        setIsShowProjectUserAddModal(true)
    }

    const handleHideProjectUserAddModal = () => {
        setIsShowProjectUserAddModal(false)
    }

    return (
        <div className="project-users-container">
            <div className="project-users-control">
                <div className="project-list-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="project-list-control-add">
                    <Button onClick={handleShowProjectUserAddModal}>
                        Thêm người dùng vào dự án
                    </Button>
                </div>
            </div>
            <div className="project-list-table">
                <Table columns={tableColumns} dataSource={userList} bordered />
            </div>
            <ProjectUserAddModal
                id={id}
                centered
                width={800}
                visible={isShowProjectUserAddModal}
                onClose={handleHideProjectUserAddModal}
            />
        </div>
    )
}

export default ProjectUser

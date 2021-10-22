import './style.css'
import columns from './columns'
import { Button, Modal, Space, Table } from 'antd'
import faker from 'faker'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ModeratorProjectModal from '../../../../components/Modal/ModeratorProjectModal'
const ProjectModerator = () => {
    let data = []
    for (let i = 0; i < 50; i++) {
        data.push({
            code: i,
            name: faker.name.findName(),
            username: faker.internet.userName(),
            phone: faker.phone.phoneNumber(),
            role: faker.name.jobTitle(),
        })
    }

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <a onClick={handleClick}>{text}</a>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button>Thoát dự án</button>
                </Space>
            ),
        },
    ]

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleClick = () => {
        showModal()
    }

    return (
        <div className="project-moderators-container">
            <div className="project-moderators-control">
                {/* <div className="project-moderators-control-report">
                    <Button>Phân công thiết bị</Button>
                    <Button>Xuất báo cáo</Button>
                </div> */}
                <div className="project-moderators-control-add">
                    <Button>Thêm quản trị viên vào dự án</Button>
                </div>
            </div>
            <div className="project-moderators-table">
                <Table columns={tableColumns} dataSource={data} bordered />
            </div>
            <Modal
                centered
                width={1000}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                title="Thông tin quản trị viên"
            >
                <ModeratorProjectModal />
            </Modal>
        </div>
    )
}

export default ProjectModerator
